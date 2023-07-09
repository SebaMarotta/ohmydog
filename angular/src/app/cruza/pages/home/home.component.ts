import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, filter, map, switchMap } from 'rxjs';
import { User } from 'src/app/clientes/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { ServicioDeTerceroService } from 'src/app/services/servicio-de-tercero.service';
import { MultiSelect } from 'primeng/multiselect';
import { ColumnFilter, Table } from 'primeng/table';
import { BusquedaService } from 'src/app/services/busqueda.service';
import { Mascota } from 'src/app/mascotas/interfaces/interfaces';
import { MascotaService } from 'src/app/services/mascota.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  protected busquedas: Mascota[] = [];
  protected solicitudModal: Boolean = false;
  protected mascotaCliente: Mascota;
  protected mascotaInteres: Mascota = {
    id: 0,
    nombre: '',
    raza: '',
    color: '',
    observaciones: '',
    sexo: '',
    fechaDeNacimiento: undefined,
    imagen: '',
    duenio: 0,
    cruza: false,
    castrada: false,
    fechaCelo: ''
  }
  protected user$: BehaviorSubject<User> = this.authService.userSession;
  protected rolSession: string = '';
  protected idUser: number = 0;

  @ViewChild('RegistroContainer', { read: ViewContainerRef })
  container: ViewContainerRef;

  @ViewChild( 'dt2' ) dt2: Table;


  constructor(
    private mascotaService: MascotaService,
    private router: Router,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.authService.userSession.subscribe(resp => {
      if (this.user$.value != null) {
        this.rolSession = resp.role;
        this.idUser = resp.id;
      }
    });

    this.activatedRoute.params.subscribe((resp) => {
      const id = resp['idMascota'];
      this.mascotaService
        .findById(id)
        .subscribe(resp => {
          this.mascotaCliente = resp;
          this.mascotaService.getMascotasRazaSexo(this.mascotaCliente).subscribe(resp => {
            this.busquedas = resp;
          })
        });

    });

  }

  redireccionar(id: String) {
    this.router.navigateByUrl(`clientes/${id}`);
  }

  toggleSolicitud(mascota) {
    if (!this.solicitudModal) this.mascotaInteres = mascota;
    this.solicitudModal = !this.solicitudModal;
  }


}

