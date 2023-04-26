import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { IndexRoutingModule } from './index-routing.module';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    IndexRoutingModule,
    CommonModule,
    StyleClassModule,
    ButtonModule,
    ToolbarModule,
  ],
})
export class IndexModule {}
