import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackgroundComponent } from '../shared/background/background.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: 'servicios',
    component: BackgroundComponent,
    children: [{ path: '', component: HomeComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiciosDeTercerosRoutingModule { }
