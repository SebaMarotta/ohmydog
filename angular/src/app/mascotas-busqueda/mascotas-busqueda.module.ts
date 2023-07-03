import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MascotasBusquedaRoutingModule } from './mascotas-busqueda-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { CrearBusquedaComponent } from './pages/crear-busqueda/crear-busqueda.component';
import { ContactoBusquedaComponent } from './pages/contacto-busqueda/contacto-busqueda.component';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { DataViewModule } from 'primeng/dataview';
import { ToastModule } from 'primeng/toast';
import { LibretaSanitariaModule } from '../libreta-sanitaria/libreta-sanitaria.module';
import { MotivosPipe } from '../turnos/pipes/motivos.pipe';
import { InputSwitch, InputSwitchModule } from 'primeng/inputswitch';
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
  declarations: [
    HomeComponent,
    CrearBusquedaComponent,
    ContactoBusquedaComponent,
  ],
  exports: [HomeComponent, CrearBusquedaComponent, ContactoBusquedaComponent, MotivosPipe],
  imports: [
    CommonModule,
    MascotasBusquedaRoutingModule,
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
    MultiSelectModule,
    FormsModule,
    DialogModule,
  ],
})
export class MascotasBusquedaModule { }
