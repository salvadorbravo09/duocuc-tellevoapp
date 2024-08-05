import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NoAutenticadoGuard } from './guards/no-autenticado.guard';
import { AutenticacionGuard } from './guards/autenticacion.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'autenticacion',
    pathMatch: 'full'
  },
  {
    path: 'autenticacion',
    loadChildren: () => import('./paginas/autenticacion/autenticacion.module').then(m => m.AutenticacionPageModule), canActivate: [NoAutenticadoGuard]
  },
  {
    path: 'main',
    loadChildren: () => import('./paginas/main/main.module').then(m => m.MainPageModule), canActivate: [AutenticacionGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
