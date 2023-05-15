import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MascotaService } from 'src/app/services/mascota.service';
import { Mascota } from '../../interfaces/interfaces';
import { TurnoService } from 'src/app/services/turno.service';

@Component({
  selector: 'app-perfil-mascota',
  templateUrl: './perfil-mascota.component.html',
  styleUrls: ['./perfil-mascota.component.css'],
})
export class PerfilMascotaComponent {
  protected mascota: Mascota = {
    id: 0,
    nombre: '',
    raza: '',
    color: '',
    observaciones: '',
    sexo: '',
    fechaDeNacimiento: null,
    imagen: '',
    duenio: 0,
    cruza: false,
  };
  protected libretaSanitaria: any;
  protected planillaModal: Boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private mascotaService: MascotaService,
    private turnoService: TurnoService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((resp) => {
      const id = resp['idMascota'];
      this.mascotaService.findById(id).subscribe((resp) => {
        this.mascota = resp;
      });
      this.turnoService.getPlanilla(id).subscribe((resp) => {
        this.libretaSanitaria = resp;
      });
    });
  }
  redireccionar(mascota: Number) {
    // this.router.navigateByUrl(`/clientes/${this.user.id}/${mascota}`);
  }
  togglePlanilla() {
    this.planillaModal = !this.planillaModal;
  }
}
