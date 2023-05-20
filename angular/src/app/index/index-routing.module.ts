import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class IndexRoutingModule {}
