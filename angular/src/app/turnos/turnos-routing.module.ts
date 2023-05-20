import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { BackgroundComponent } from '../shared/background/background.component';

const routes: Routes = [
  {
    path: 'turnos',
    component: BackgroundComponent,
    children: [{ path: '', component: IndexComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TurnosRoutingModule {}
