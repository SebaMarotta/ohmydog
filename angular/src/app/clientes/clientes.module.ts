import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './pages/home/home.component';

import { ClientesRoutingModule } from './clientes-routing.module';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    ToolbarModule,
    TableModule,
    RatingModule,
    TagModule,
    DropdownModule,
    ButtonModule,
  ],
})
export class ClientesModule {}
