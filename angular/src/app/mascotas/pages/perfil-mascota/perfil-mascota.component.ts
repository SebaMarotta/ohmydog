import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MascotaService } from 'src/app/services/mascota.service';
import { Mascota } from '../../interfaces/interfaces';
import { TurnoService } from 'src/app/services/turno.service';
import { AuthService } from 'src/app/services/auth.service';
import { BehaviorSubject, mergeMap, switchMap } from 'rxjs';
import { User } from 'src/app/clientes/interfaces/interfaces';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Motivos } from 'src/app/libreta-sanitaria/interfaces/interfaces';

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
    imagen: '',
    duenio: 0,
    cruza: false,
    castrada: false,
    fechaDeNacimiento: '01/01/2000',
    fechaCelo: ''
  };
  protected libretaSanitaria: any = {};
  protected planillaModal: Boolean = false;
  protected solicitudModal: Boolean = false;
  protected user$: BehaviorSubject<User> = this.authService.userSession;
  protected rolSession = '';
  protected motivos: String[] = [];

  protected idUser: number;
  protected idPlanilla: number;
  protected observaciones: string[];
  protected fechaNacimientoDate: Date = new Date();
  protected imagenPath: string = environment.imagenPath;
  protected imagenUrl: SafeUrl;

  constructor(
    private activatedRoute: ActivatedRoute,
    private mascotaService: MascotaService,
    private turnoService: TurnoService,
    private router: Router,
    private authService: AuthService,
    protected DomSanitizer: DomSanitizer
  ) {}
  ngOnInit(): void {
    this.user$.subscribe((resp) => {
      if (this.user$.value != null) {
        this.rolSession = resp.role;
        this.idUser = resp.id;
      }
    });
    this.activatedRoute.params.subscribe((resp) => {
      const id = resp['idMascota'];
      this.mascotaService
        .findById(id)
        .pipe(
          switchMap((resp) => {
            this.mascota = resp;
            return this.mascotaService.getImage(this.mascota.imagen);
          })
        )
        .subscribe((imagenBlob: Blob) => {
          let aux = URL.createObjectURL(imagenBlob);
          this.imagenUrl = this.DomSanitizer.bypassSecurityTrustUrl(aux);
        });


      this.turnoService.getPlanillaByMascota(id).subscribe((resp) => {
        this.libretaSanitaria = resp;
      });

      this.turnoService.getMotivosTurno().subscribe((resp) => {
        resp.forEach((resp) => {
          this.motivos.push(resp);
        });
      });
    });
  }
  redireccionar(mascota: Number) {
    // this.router.navigateByUrl(`/clientes/${this.user.id}/${mascota}`);
  }
  togglePlanilla(idPlanilla) {
    if (this.planillaModal == false) this.idPlanilla = idPlanilla;
    this.planillaModal = !this.planillaModal;
  }
  toggleSolicitud() {
    this.solicitudModal = !this.solicitudModal;
  }

  espaciarObservacion() {}
}
