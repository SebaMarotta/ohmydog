import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MascotasRoutingModule } from './mascotas-routing.module';
import { PerfilMascotaComponent } from './pages/perfil-mascota/perfil-mascota.component';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { DataViewModule, DataViewLayoutOptions } from 'primeng/dataview';
import { RegistroMascotaComponent } from './pages/registro-mascota/registro-mascota.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';

@NgModule({
  declarations: [PerfilMascotaComponent, RegistroMascotaComponent],
  imports: [
    CommonModule,
    MascotasRoutingModule,
    DividerModule,
    TableModule,
    ButtonModule,
    ReactiveFormsModule,
    ToolbarModule,
    DropdownModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    SkeletonModule,
    DataViewModule,
    DialogModule,
    InputTextareaModule,
    FileUploadModule,
    InputMaskModule,
    InputSwitchModule,
  ],
  exports: [PerfilMascotaComponent, RegistroMascotaComponent],
})
export class MascotasModule {}
