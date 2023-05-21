import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HomeComponent as HomeComponentAdopciones } from '../adopciones/pages/home/home.component';
import { CarteleraComponent } from './pages/cartelera/cartelera.component';
import { BackgroundComponent } from '../shared/background/background.component';

const routes: Routes = [
  {
    path: '',
    children: [{ path: '', component: HomeComponent }],
  },
  {
    path: 'cartelera',
    component: BackgroundComponent,
    children: [{ path: '', component: CarteleraComponent }],
  },
  {
    path: 'adopciones',
    component: BackgroundComponent,
    children: [{ path: '', component: HomeComponentAdopciones }],
  },
  {
    path: 'servicios',
    component: BackgroundComponent,
    children: [{ path: '', component: HomeComponentAdopciones }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class IndexRoutingModule {}
