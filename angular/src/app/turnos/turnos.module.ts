import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { TurnosRoutingModule } from './turnos-routing.module';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';

import { IndexComponent } from './pages/index/index.component';
import { TurnosComponent } from './pages/turnos/turnos.component';
import { TurnosDiaComponent } from './pages/turnos-dia/turnos-dia.component';
import { TurnosPendientesComponent } from './pages/turnos-pendientes/turnos-pendientes.component';
import { BadgeModule } from 'primeng/badge';
import { TurnoPendienteModalComponent } from './pages/turno-pendiente-aceptar/turno-pendiente-aceptar.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { DataViewModule } from 'primeng/dataview';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { CalendarModule } from 'primeng/calendar';
import { TurnoPendienteRechazarComponent } from './pages/turno-pendiente-rechazar/turno-pendiente-rechazar.component';
import { TurnoRechazarComponent } from './pages/turno-rechazar/turno-rechazar.component';
import { TurnoAceptarComponent } from './pages/turno-aceptar/turno-aceptar.component';

@NgModule({
  declarations: [
    IndexComponent,
    TurnosComponent,
    TurnosDiaComponent,
    TurnosPendientesComponent,
    IndexComponent,
    TurnoPendienteModalComponent,
    TurnoPendienteRechazarComponent,
    TurnoRechazarComponent,
    TurnoAceptarComponent,
  ],
  imports: [
    CommonModule,
    TurnosRoutingModule,
    TableModule,
    ButtonModule,
    ReactiveFormsModule,
    ToolbarModule,
    DropdownModule,
    InputTextModule,
    CardModule,
    DataViewModule,
    DialogModule,
    InputTextareaModule,
    FileUploadModule,
    InputMaskModule,
    InputSwitchModule,
    ScrollPanelModule,
    TabMenuModule,
    BadgeModule,
    TabMenuModule,
    TabViewModule,
    CalendarModule,
  ],
})
export class TurnosModule {}
