import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, filter, map, switchMap } from 'rxjs';
import { User } from 'src/app/clientes/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { BusquedaMascota } from '../../interfaces/interfaces';
import { ServicioDeTerceroService } from 'src/app/services/servicio-de-tercero.service';
import { MultiSelect } from 'primeng/multiselect';
import { ColumnFilter, Table } from 'primeng/table';
import { BusquedaService } from 'src/app/services/busqueda.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  protected busquedas: BusquedaMascota[] = [];
  protected crearModal: Boolean = false;
  protected solicitudModal: Boolean = false;
  protected busquedaIndividual: BusquedaMascota = {
    id: 0,
    zona: '',
    imagen: '',
    fecha: undefined,
    sexo: '',
    edad: '',
    observaciones: '',
    estado: '',
    telefono: '',
    email: '',
    disponible: false
  }
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
    private busquedaService: BusquedaService,
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
          switchMap(() => this.busquedaService.getBusquedas()),
          map((resp) => {

            if (this.rolSession != 'ADMIN')
              return resp.filter((resp3) => {

                return resp3.disponible == true;
              });
            else return resp;
          })
      )
      .subscribe((resp) => {

        this.busquedas = resp;
      });

      this.busquedaService.getZonas().subscribe (resp => {
        this.zonasTotal = resp;
      })


  }

  redireccionar(id: String) {
    this.router.navigateByUrl(`clientes/${id}`);
  }

  toggleCrear(event) {
    if (event != null) this.busquedaIndividual = event;
    this.crearModal = !this.crearModal;
  }

  toggleSolicitud(servicio) {
    if (!this.solicitudModal) this.busquedaIndividual = servicio;
    this.solicitudModal = !this.solicitudModal;
  }


}

