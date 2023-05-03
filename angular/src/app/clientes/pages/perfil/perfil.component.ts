import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Mascota } from 'src/app/mascotas/interfaces/interfaces';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  layout: string = 'list';
  protected mascotas: Mascota[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((resp) => {
      console.log(resp);
    });
  }
}
