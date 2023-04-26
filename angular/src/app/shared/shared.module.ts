import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [NavbarComponent, ModalComponent],
  exports: [NavbarComponent],
  imports: [CommonModule, ButtonModule, DialogModule],
})
export class SharedModule {}
