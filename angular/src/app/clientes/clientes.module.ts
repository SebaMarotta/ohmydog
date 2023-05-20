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
import { DialogModule } from 'primeng/dialog';
import { RegistroComponent } from './pages/registro/registro.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MascotasModule } from '../mascotas/mascotas.module';
import { EditarComponent } from './pages/editar/editar.component';
import { EditarPasswordComponent } from './pages/editar-password/editar-password.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [
    HomeComponent,
    PerfilComponent,
    RegistroComponent,
    EditarComponent,
    EditarPasswordComponent,
  ],
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
    DialogModule,
    ReactiveFormsModule,
    MascotasModule,
    ProgressSpinnerModule,
  ],
  exports: [PerfilComponent, RegistroComponent],
})
export class ClientesModule {}
