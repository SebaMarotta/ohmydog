import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Mascota } from 'src/app/mascotas/interfaces/interfaces';
import { MascotaService } from 'src/app/services/mascota.service';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  protected id: number;
  protected user: User = {};
  protected mascotas: Mascota[] = [];
  protected registroModal: Boolean = false;
  protected sexos: any = ['MACHO', 'HEMBRA'];
  protected user$: BehaviorSubject<User> = this.authService.userSession;
  protected rolSession = '';
  protected editarModalMascota: Boolean = false;
  protected editarModalUser: Boolean = false;
  protected editarModalPassword: Boolean = false;
  protected cardMascotaId: number;
  protected suscriptionLista: Subscription;
  protected imagenUrl: SafeUrl;
  protected arrayImagenes: SafeUrl[] = [];
  imageSize = 20;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private mascotaService: MascotaService,
    private authService: AuthService,
    private router: Router,
    protected DomSanitizer: DomSanitizer
  ) {}
  ngOnInit(): void {
    this.user$.subscribe((resp) => {
      if (this.user$.value != null) this.rolSession = resp.role;
    });

    this.activatedRoute.params.subscribe((resp) => {
      this.id = resp['id'];
      this.userService.findById(this.id).subscribe((resp) => {
        this.user = resp;
        this.rolSession = this.authService.userSession.getValue()['role'];
      });
    });

    this.mascotaService.getMascotasUser(this.id).subscribe((resp) => {
      this.mascotas = resp;
      this.rolSession = this.authService.userSession.getValue()['role'];
      resp.forEach(resp => {
        this.mascotaService.getImage(resp.imagen).subscribe(resp2 => {
          let aux = URL.createObjectURL(resp2);
          this.arrayImagenes[resp.id] = this.DomSanitizer.bypassSecurityTrustUrl(aux);
        })
      })
    });

    this.suscriptionLista = this.mascotaService.refresh.subscribe(() => {
      this.mascotaService.getMascotasUser(this.id).subscribe((resp) => {
        this.mascotas = resp;
        this.rolSession = this.authService.userSession.getValue()['role'];
        resp.forEach(resp => {
          this.mascotaService.getImage(resp.imagen).subscribe(resp2 => {
            let aux = URL.createObjectURL(resp2);
            this.arrayImagenes[resp.id] = this.DomSanitizer.bypassSecurityTrustUrl(aux);
          })
        })
      });

    });


  }
  redireccionar(mascota: Number) {
    this.router.navigateByUrl(`/clientes/${this.user.id}/${mascota}`);
  }

  toggleRegistro() {
    this.registroModal = !this.registroModal;
  }

  toggleEditarUser() {
    this.editarModalUser = !this.editarModalUser;
  }

  toggleEditarMascota() {
    this.editarModalMascota = !this.editarModalMascota;
  }

  toggleEditarPassword() {
    this.editarModalPassword = !this.editarModalPassword;
  }

  cruza(mascota){
    this.router.navigateByUrl(`/clientes/${this.user.id}/${mascota.id}/cruza`);
  }

  cambiarCruza(mascota){
    this.mascotaService.cambiarCruza(mascota).subscribe(resp => {
      const url = this.router.url;
      this.router
        .navigateByUrl('/', { skipLocationChange: true })
        .then(() => {
          this.router.navigateByUrl(url);
        });
    })
  }



  //   mostrarFoto(nombre: string): SafeUrl {
  //     return this.mascotaService
  //       .getImage(nombre)
  //       .subscribe((imagenBlob: Blob) => {
  //         let aux = URL.createObjectURL(imagenBlob);
  //         return this.DomSanitizer.bypassSecurityTrustUrl(aux);
  //       });
  //   }
}
