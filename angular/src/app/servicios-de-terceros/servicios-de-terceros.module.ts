import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiciosDeTercerosRoutingModule } from './servicios-de-terceros-routing.module';
import { HomeComponent } from './pages/home/home.component';
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
import { SolicitudComponent } from './pages/solicitud/solicitud.component';
import { CrearComponent } from './pages/crear/crear.component';
import { ToastModule } from 'primeng/toast';
import { LibretaSanitariaModule } from '../libreta-sanitaria/libreta-sanitaria.module';
import { MotivosPipe } from '../turnos/pipes/motivos.pipe';
import { EditarComponent } from './pages/editar/editar.component';
import { InputSwitch, InputSwitchModule } from 'primeng/inputswitch';

@NgModule({
  declarations: [
    HomeComponent,
    SolicitudComponent,
    CrearComponent,
    EditarComponent,
  ],
  exports: [HomeComponent, SolicitudComponent, CrearComponent, MotivosPipe],
  imports: [
    CommonModule,
    ServiciosDeTercerosRoutingModule,
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
    ToastModule,
    InputSwitchModule,
    LibretaSanitariaModule,
  ],
})
export class ServiciosDeTercerosModule {}
