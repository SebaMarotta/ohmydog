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

@NgModule({
  declarations: [HomeComponent, CarteleraComponent],
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
  ],
})
export class IndexModule {}
