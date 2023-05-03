import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackgroundComponent } from '../shared/background/background.component';
import { HomeComponent } from './pages/home/home.component';
import { PerfilComponent } from './pages/perfil/perfil.component';

const routes: Routes = [
  {
    path: 'clientes',
    component: BackgroundComponent,
    children: [{ path: '', component: HomeComponent }],
  },
  {
    path: 'clientes/:id',
    component: BackgroundComponent,
    children: [{ path: '', component: PerfilComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientesRoutingModule {}
