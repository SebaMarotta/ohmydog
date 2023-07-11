import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { MessagesModule } from 'primeng/messages';
import { BackgroundComponent } from './background/background.component';
import { RouterModule } from '@angular/router';
import { MenuRutasComponent } from './menu-rutas/menu-rutas.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@NgModule({
  declarations: [NavbarComponent, BackgroundComponent, MenuRutasComponent],
  exports: [NavbarComponent, BackgroundComponent, MenuRutasComponent],
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule,
    BreadcrumbModule,
    MessagesModule,
    RouterModule,
  ],
})
export class SharedModule {}
