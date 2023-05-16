import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isAuthenticatedGuardActivateFn } from './auth/guards/is-authenticated.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./index/index.module').then((m) => m.IndexModule),
  },
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./clientes/clientes.module').then((m) => m.ClientesModule),
    canActivate: [],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
