import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoAceptarComponent } from './turno-aceptar.component';

describe('TurnoAceptarComponent', () => {
  let component: TurnoAceptarComponent;
  let fixture: ComponentFixture<TurnoAceptarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnoAceptarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TurnoAceptarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
