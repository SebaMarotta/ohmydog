import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-informacion-pago',
  templateUrl: './informacion-pago.component.html',
  styleUrls: ['./informacion-pago.component.css'],
})
export class InformacionPagoComponent {
  @Output() balanceModal: EventEmitter<null> = new EventEmitter();
  @Input() balance: any;
}
