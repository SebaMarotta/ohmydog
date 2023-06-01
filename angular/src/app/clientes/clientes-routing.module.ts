import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackgroundComponent } from '../shared/background/background.component';
import { HomeComponent } from './pages/home/home.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { PerfilMascotaComponent } from '../mascotas/pages/perfil-mascota/perfil-mascota.component';
import { isAdminGuard } from '../auth/guards/is-admin.guard';
import { isPerfilDelClienteGuard } from '../auth/guards/is-perfil-del-cliente.guard';
import { isMascotaDelClienteGuard } from '../auth/guards/is-mascota-del-cliente.guard';

const routes: Routes = [
  {
    path: 'clientes',
    component: BackgroundComponent,
    children: [{ path: '', component: HomeComponent }],
    canActivate: [isAdminGuard],
  },
  {
    path: 'clientes/:id',
    component: BackgroundComponent,
    children: [{ path: '', component: PerfilComponent }],
    canActivate: [isPerfilDelClienteGuard],
  },
  {
    path: 'clientes/:id/:idMascota',
    component: BackgroundComponent,
    children: [{ path: '', component: PerfilMascotaComponent }],
    canActivate: [isMascotaDelClienteGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientesRoutingModule {}
