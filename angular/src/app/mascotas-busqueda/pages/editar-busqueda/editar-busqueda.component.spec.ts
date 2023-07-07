import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarBusquedaComponent } from './editar-busqueda.component';

describe('EditarBusquedaComponent', () => {
  let component: EditarBusquedaComponent;
  let fixture: ComponentFixture<EditarBusquedaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarBusquedaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarBusquedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
