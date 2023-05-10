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

@NgModule({
  declarations: [PerfilMascotaComponent],
  imports: [
    CommonModule,
    MascotasRoutingModule,
    DividerModule,
    TableModule,
    ButtonModule,
  ],
  exports: [PerfilMascotaComponent],
})
export class MascotasModule {}
