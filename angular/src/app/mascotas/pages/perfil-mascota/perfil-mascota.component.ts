import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MascotaService } from 'src/app/services/mascota.service';
import { Mascota } from '../../interfaces/interfaces';

@Component({
  selector: 'app-perfil-mascota',
  templateUrl: './perfil-mascota.component.html',
  styleUrls: ['./perfil-mascota.component.css'],
})
export class PerfilMascotaComponent {
  protected mascota: Mascota;
  protected libretaSanitaria: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private mascotaService: MascotaService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((resp) => {
      const id = resp['idMascota'];
      console.log(id);
      this.mascotaService.findById(id).subscribe((resp) => {
        this.mascota = resp;
      });
    });
  }
  redireccionar(mascota: Number) {
    // this.router.navigateByUrl(`/clientes/${this.user.id}/${mascota}`);
  }
}
