import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackgroundComponent } from '../shared/background/background.component';
import { HomeComponent } from './pages/home/home.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { PerfilMascotaComponent } from '../mascotas/pages/perfil-mascota/perfil-mascota.component';

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
  {
    path: 'clientes/:id/:idMascota',
    component: BackgroundComponent,
    children: [{ path: '', component: PerfilMascotaComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientesRoutingModule {}
