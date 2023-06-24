import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, filter, map, switchMap } from 'rxjs';
import { User } from 'src/app/clientes/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { ServicioTercero } from '../../interfaces/interfaces';
import { ServicioDeTerceroService } from 'src/app/services/servicio-de-tercero.service';
import { MultiSelect } from 'primeng/multiselect';
import { ColumnFilter, Table } from 'primeng/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  protected servicios: ServicioTercero[] = [];
  protected crearModal: Boolean = false;
  protected editarModal: Boolean = false;
  protected solicitudModal: Boolean = false;
  protected servicioIndividual: ServicioTercero = {
    id: 0,
    nombre: '',
    apellido: '',
    telefono: '',
    zona: '',
    email: '',
    tipo: '',
    rangoHorario: '',
    dias: '',
    disponible: false,
  };
  protected user$: BehaviorSubject<User> = this.authService.userSession;
  protected rolSession: string = '';
  protected idUser: number = 0;

  protected tiposTotal : String[];
  protected zonasTotal : String[];
  protected tiposSeleccionados: String[] = [];
  protected zonasSeleccionadas: String[] = [];

  @ViewChild('RegistroContainer', { read: ViewContainerRef })
  container: ViewContainerRef;

  @ViewChild( 'dt2' ) dt2: Table;


  constructor(
    private servicioDeTerceroService: ServicioDeTerceroService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.userSession
      .pipe(
        map((resp) => {
          if (this.user$.value != null) {
            this.rolSession = resp.role;
            this.idUser = resp.id;
          }
        }),
          switchMap(() => this.servicioDeTerceroService.getServicios()),
          map((resp) => {

            if (this.rolSession != 'ADMIN')
              return resp.filter((resp3) => {

                return resp3.disponible == true;
              });
            else return resp;
          })
      )
      .subscribe((resp) => {

        this.servicios = resp;
      });

      this.servicioDeTerceroService.getTipos().subscribe( (resp) => {
        this.tiposTotal = resp;
      })

      this.servicioDeTerceroService.getZonas().subscribe (resp => {
        this.zonasTotal = resp;
      })


  }

  redireccionar(id: String) {
    this.router.navigateByUrl(`clientes/${id}`);
  }

  toggleCrear() {
    this.crearModal = !this.crearModal;
  }

  toggleSolicitud(servicio) {
    if (!this.solicitudModal) this.servicioIndividual = servicio;
    this.solicitudModal = !this.solicitudModal;
  }

  toggleEditar(servicio) {
    if (!this.editarModal) this.servicioIndividual = servicio;
    this.editarModal = !this.editarModal;
  }

  filterNombre(field){
    this.dt2.filter( field, 'nombre', 'contains' );
    this.dt2.filter( field, 'apellido', 'contains' );
  }


}

