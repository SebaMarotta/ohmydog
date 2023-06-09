import { Component, Input } from '@angular/core';
import { TurnoService } from 'src/app/services/turno.service';
import { Planilla } from '../../interfaces/interfaces';

@Component({
  selector: 'app-informacion-planilla',
  templateUrl: './informacion-planilla.component.html',
  styleUrls: ['./informacion-planilla.component.css'],
})
export class InformacionPlanillaComponent {
  @Input() idPlanilla: number;

  planilla: Planilla = {
    motivo: undefined,
    fecha: undefined,
    monto: '',
    id: 0,
  };
  constructor(private turnoService: TurnoService) {}

  ngOnInit() {
    console.log(this.idPlanilla);
    this.turnoService.getPlanillaById(this.idPlanilla).subscribe((resp) => {
      this.planilla = resp;
      console.log(resp);
    });
  }
}
