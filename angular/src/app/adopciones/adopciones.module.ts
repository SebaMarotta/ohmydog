import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdopcionesRoutingModule } from './adopciones-routing.module';
import { CrearComponent } from './pages/crear/crear.component';
import { HomeComponent } from './pages/home/home.component';
import { SolicitudComponent } from './pages/solicitud/solicitud.component';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ReactiveFormsModule } from '@angular/forms';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { DataViewModule } from 'primeng/dataview';

@NgModule({
  declarations: [CrearComponent, HomeComponent, SolicitudComponent],
  imports: [
    CommonModule,
    AdopcionesRoutingModule,
    DialogModule,
    TableModule,
    ButtonModule,
    ProgressSpinnerModule,
    ReactiveFormsModule,
    ToolbarModule,
    RatingModule,
    TagModule,
    DropdownModule,
    InputTextModule,
    CardModule,
    DividerModule,
    DataViewModule,
  ],
  exports: [CrearComponent, HomeComponent],
})
export class AdopcionesModule {}
