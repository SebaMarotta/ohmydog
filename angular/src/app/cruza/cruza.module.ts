import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CruzaRoutingModule } from './cruza-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
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
import { InputMaskModule } from 'primeng/inputmask';
import { ImageModule } from 'primeng/image';


@NgModule({
  declarations: [
    HomeComponent,
    ContactoComponent
  ],
  exports: [HomeComponent, ContactoComponent],
  imports: [
    CommonModule,
    CruzaRoutingModule,
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
    InputMaskModule,
    DropdownModule,
    ImageModule
  ]
})
export class CruzaModule { }
