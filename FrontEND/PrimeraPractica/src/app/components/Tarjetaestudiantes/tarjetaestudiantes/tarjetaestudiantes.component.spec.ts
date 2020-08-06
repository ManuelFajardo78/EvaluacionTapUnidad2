import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaestudiantesComponent } from './Tarjetaestudiantes.component';

describe('TarjetaempleadosComponent', () => {
  let component: TarjetaestudiantesComponent;
  let fixture: ComponentFixture<TarjetaestudiantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarjetaestudiantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarjetaestudiantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
