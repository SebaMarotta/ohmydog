import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { MessagesModule } from 'primeng/messages';
import { BackgroundComponent } from './background/background.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NavbarComponent, BackgroundComponent],
  exports: [NavbarComponent, BackgroundComponent],
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule,
    MessagesModule,
    RouterModule,
  ],
})
export class SharedModule {}
