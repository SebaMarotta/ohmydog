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
import { InputTextModule } from 'primeng/inputtext';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { DividerModule } from 'primeng/divider';
import { DataViewModule, DataViewLayoutOptions } from 'primeng/dataview';

@NgModule({
  declarations: [HomeComponent, PerfilComponent],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    ToolbarModule,
    TableModule,
    RatingModule,
    TagModule,
    DropdownModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    SkeletonModule,
    DividerModule,
    DataViewModule,
  ],
})
export class ClientesModule {}
