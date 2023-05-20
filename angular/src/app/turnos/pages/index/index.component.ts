import { Component, DoCheck, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  ngOnInit(): void {
    console.log();
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
