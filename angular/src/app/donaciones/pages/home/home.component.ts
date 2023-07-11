
import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, filter, map, switchMap } from 'rxjs';
import { User } from 'src/app/clientes/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { ServicioDeTerceroService } from 'src/app/services/servicio-de-tercero.service';
import { MultiSelect } from 'primeng/multiselect';
import { ColumnFilter, Table } from 'primeng/table';
import { BusquedaService } from 'src/app/services/busqueda.service';
import { Donacion } from '../../interfaces/interface';
import { DonacionesService } from 'src/app/services/donaciones.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  protected donaciones: Donacion[] = [];
  protected crearModal: Boolean = false;
  protected editarModal: Boolean = false;
  protected verModal: Boolean = false;
  protected donacionIndividual: Donacion = {
    id: 0,
    nombre: '',
    descripcion: '',
    objetivo: 0,
    montoAlcanzado: 0,
    activa: false,
    fechaVencimiento: undefined
  }
  protected user$: BehaviorSubject<User> = this.authService.userSession;
  protected rolSession: string = '';
  protected idUser: number = 0;



  @ViewChild('RegistroContainer', { read: ViewContainerRef })
  container: ViewContainerRef;

  @ViewChild( 'dt2' ) dt2: Table;


  constructor(
    private donacionService: DonacionesService,
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
           switchMap(() => this.donacionService.getDonaciones()),
          map((resp) => {

            if (this.rolSession != 'ADMIN')
              return resp.filter((resp3) => {

                return resp3.activa == true;
              });
            else return resp;
          })
          )
          .subscribe((resp) => {
            this.donaciones = resp;
          });


  }

  redireccionar(id: String) {
    this.router.navigateByUrl(`clientes/${id}`);
  }

  toggleCrear(event) {
    this.crearModal = !this.crearModal;
  }

  toggleEditar(event) {
    if (event != null) this.donacionIndividual = event;
    this.editarModal = !this.editarModal;
  }

  toggleVer(servicio) {
    if (!this.verModal) this.donacionIndividual = servicio;
    this.verModal = !this.verModal;
  }


}

