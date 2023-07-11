import { Component, DoCheck, OnInit } from '@angular/core';
import { User } from 'src/app/clientes/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  constructor(private authService: AuthService) {}

  user: User;
  ngOnInit(): void {
    this.user = this.authService.userSession.value;
  }
  public value: string;
  public activeIndex: number = JSON.parse(localStorage.getItem('index'));

  valor(evento) {
    this.value = evento;
  }

  prueba(event) {
    localStorage.setItem('index', event.index);
  }
}
