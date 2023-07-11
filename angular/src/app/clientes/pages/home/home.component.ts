import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../interfaces/interfaces';
import { Observable, filter, map, tap } from 'rxjs';
import { Router } from '@angular/router';
import { RegistroComponent } from '../registro/registro.component';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  protected clientes: User[] = [];
  protected registroModal: Boolean = false;

  @ViewChild('RegistroContainer', { read: ViewContainerRef }) container: ViewContainerRef;
  @ViewChild('dt2') dt2: Table | undefined;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.userService
      .getUsers()
      .pipe(map((resp) => resp.filter((resp2) => resp2.role == 'USER')))
      .subscribe((resp) => {
        resp.forEach(resp2 => {
          resp2.nombre = resp2.nombre + " " + resp2.apellido;
        })
        this.clientes = resp;
      });
  }

  redireccionar(id: String) {
    this.router.navigateByUrl(`clientes/${id}`);
  }

  toggleRegistro() {
    this.registroModal = !this.registroModal;
  }

  applyFilterGlobal($event, stringVal) {
    return this.dt2.filterGlobal($event, stringVal);
  }
}
