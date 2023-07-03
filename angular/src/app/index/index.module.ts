import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { HomeComponent as HomeComponentAdopciones } from './pages/home/home.component';
import { IndexRoutingModule } from './index-routing.module';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { CarteleraComponent } from './cartelera/cartelera.component';
import { SharedModule } from '../shared/shared.module';
import { DialogModule } from 'primeng/dialog';
import { AdopcionesModule } from '../adopciones/adopciones.module';
import { ServiciosDeTercerosModule } from '../servicios-de-terceros/servicios-de-terceros.module';
import { EditarPasswordComponent } from './pages/editar-password/editar-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputTextModule } from 'primeng/inputtext';
import { VeterinariasTurnoComponent } from './pages/veterinarias-turno/veterinarias-turno.component';
import { FileUploadModule } from 'primeng/fileupload';
import {PanelModule} from 'primeng/panel';
import { MascotasBusquedaModule } from '../mascotas-busqueda/mascotas-busqueda.module';

@NgModule({
  declarations: [HomeComponent, CarteleraComponent, EditarPasswordComponent, VeterinariasTurnoComponent],
  imports: [
    CommonModule,
    IndexRoutingModule,
    CommonModule,
    StyleClassModule,
    ButtonModule,
    ToolbarModule,
    SharedModule,
    DialogModule,
    AdopcionesModule,
    ServiciosDeTercerosModule,
    ReactiveFormsModule,
    ProgressSpinnerModule,
    InputTextModule,
    FileUploadModule,
    PanelModule,
    MascotasBusquedaModule,
  ],
})
export class IndexModule {}
