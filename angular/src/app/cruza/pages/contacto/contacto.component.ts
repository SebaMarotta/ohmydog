import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/services/user.service';
import {
  RegisterUserRequest,
  User,
} from 'src/app/clientes/interfaces/interfaces';
import { BehaviorSubject, catchError, map, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { AdopcionService } from 'src/app/services/adopcion.service';
import { AuthService } from 'src/app/services/auth.service';
import { ServicioDeTerceroService } from 'src/app/services/servicio-de-tercero.service';
import { BusquedaService } from 'src/app/services/busqueda.service';
import { MascotaService } from 'src/app/services/mascota.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Mascota } from 'src/app/mascotas/interfaces/interfaces';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {

  @Input() contacto: Mascota;

  @Output() cerrarModal: EventEmitter<Boolean> = new EventEmitter();

  @Output() solicitudModal: EventEmitter<Boolean> = new EventEmitter();
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  protected imagenUrl: SafeUrl;
  protected duenio: User;

  constructor(
    private busquedaService: BusquedaService,
    private userService: UserService,
    private mascotaService: MascotaService,
    private DomSanitizer: DomSanitizer,

  ) {}
  ngOnInit(){
    this.mascotaService.getImage(this.contacto.imagen).subscribe(resp => {
      let aux = URL.createObjectURL(resp);
      this.imagenUrl = this.DomSanitizer.bypassSecurityTrustUrl(aux);
    })

  }

  cerrar(): void {
    setTimeout(() => this.formGroupDirective.resetForm(), 200);
    this.solicitudModal.emit(false);
  }
}
