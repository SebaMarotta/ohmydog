import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../interfaces/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  protected clientes: User[];
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((resp) => {
      this.clientes = resp;
    });
  }
}
