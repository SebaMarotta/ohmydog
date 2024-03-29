import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: 'login',
    children: [{ path: '', component: LoginComponent }],
  },
  {
    path: 'logout',
    children: [{ path: '', component: LoginComponent }],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class AuthRoutingModule {}
