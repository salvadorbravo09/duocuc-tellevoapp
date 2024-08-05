import { Component, OnInit, inject } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Viaje } from 'src/app/models/viajes.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddViajeComponent } from 'src/app/shared/components/add-viaje/add-viaje.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  viajes: Viaje[] = [];
  loading: boolean = false;


  ngOnInit() {
  }

  user(): User {
    return this.utilsSvc.getFromLocalStorage('user');
  }

  ionViewWillEnter() {
    this.getViajes();
  }

  doRefresh(event) {
    setTimeout(() => {
      this.getViajes();
      event.target.complete();
    }, 1000);
  }

  // ======== OBTENER VIAJES ========
  getViajes() {
    let path = `users/${this.user().uid}/viajes`;

    this.loading = true;

    // 

    let sub = this.firebaseSvc.getCollectionData(path).subscribe({
      next: (res: any) => {
        console.log(res);
        this.viajes = res;

        this.loading = false;
        sub.unsubscribe();
      }
    })
  }

  // ======== AGREGAR O ACTUALIZAR VIAJE ========
  async addViaje(viaje?: Viaje) {

    let success = await this.utilsSvc.presentModal({
      component: AddViajeComponent,
      cssClass: 'add-update-modal',
      componentProps: { viaje }
    })

    if (success) this.getViajes();
  }

  // ======== CONFIRMAR LA ELIMINACION DE UN VIAJE ========
  async confirmDeleteViaje(viaje: Viaje) {
    this.utilsSvc.presentAlert({
      header: 'Eliminar Viaje',
      message: '¿Quieres eliminar este viaje?',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancelar',
        }, {
          text: 'Si, Eliminar',
          handler: () => {
            this.deleteViaje(viaje);
          }
        }
      ]
    });
  }


  // ======= ELIMINAR PRODUCTO =======

  async deleteViaje(viaje: Viaje) {

    let path = `users/${this.user().uid}/viajes/${viaje.id}`;

    const loading = await this.utilsSvc.loading();
    await loading.present();

    let imagePath = await this.firebaseSvc.getFilePath(viaje.image);
    await this.firebaseSvc.deleteFile(imagePath);

    this.firebaseSvc.deleteDocument(path).then(async res => {

      this.viajes = this.viajes.filter(v => v.id !== viaje.id);

      this.utilsSvc.presentToast({
        message: 'Viaje eliminado exitosamente',
        duration: 1500,
        color: 'success',
        position: 'middle',
        icon: 'checkmark-circle-outline'
      })

    }).catch(error => {
      console.log(error);

      this.utilsSvc.presentToast({
        message: error.message,
        duration: 2500,
        color: 'primary',
        position: 'middle',
        icon: 'alert-circle-outline'
      })

    }).finally(() => {
      loading.dismiss();
    })
  }

}
