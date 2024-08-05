import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResetContrasenaPageRoutingModule } from './reset-contrasena-routing.module';

import { ResetContrasenaPage } from './reset-contrasena.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResetContrasenaPageRoutingModule,
    SharedModule,
  ],
  declarations: [ResetContrasenaPage]
})
export class ResetContrasenaPageModule {}
