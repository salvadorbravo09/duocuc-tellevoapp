import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResetContrasenaPage } from './reset-contrasena.page';

const routes: Routes = [
  {
    path: '',
    component: ResetContrasenaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResetContrasenaPageRoutingModule {}
