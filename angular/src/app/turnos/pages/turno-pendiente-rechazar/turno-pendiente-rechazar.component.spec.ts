import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoPendienteRechazarComponent } from './turno-pendiente-rechazar.component';

describe('TurnoPendienteRechazarComponent', () => {
  let component: TurnoPendienteRechazarComponent;
  let fixture: ComponentFixture<TurnoPendienteRechazarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnoPendienteRechazarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TurnoPendienteRechazarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
