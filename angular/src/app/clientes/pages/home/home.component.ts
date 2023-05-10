import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../interfaces/interfaces';
import { Observable, filter, map, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  protected clientes: User[];
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.userService
      .getUsers()
      .pipe(map((resp) => resp.filter((resp2) => resp2.role == 'USER')))
      .subscribe((resp) => {
        this.clientes = resp;
      });
  }

  redireccionar(id: String) {
    this.router.navigateByUrl(`clientes/${id}`);
  }
}
