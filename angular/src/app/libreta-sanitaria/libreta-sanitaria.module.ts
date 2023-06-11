import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanillaComponent } from './pages/planilla/planilla.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { MotivosPipe } from '../turnos/pipes/motivos.pipe';
import { InformacionPlanillaComponent } from './pages/informacion-planilla/informacion-planilla.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InformacionPagoComponent } from './pages/informacion-pago/informacion-pago.component';

@NgModule({
  declarations: [
    PlanillaComponent,
    MotivosPipe,
    InformacionPlanillaComponent,
    InformacionPagoComponent,
  ],
  imports: [
    CommonModule,
    DividerModule,
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
    ProgressSpinnerModule,
  ],
  exports: [
    PlanillaComponent,
    MotivosPipe,
    InformacionPlanillaComponent,
    InformacionPagoComponent,
  ],
})
export class LibretaSanitariaModule {}
