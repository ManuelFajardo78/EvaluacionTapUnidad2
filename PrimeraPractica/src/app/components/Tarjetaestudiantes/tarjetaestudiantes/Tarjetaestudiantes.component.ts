import { Component, OnInit, Input } from '@angular/core';
import { Estudiante } from '../../modelo/Estudiante.component';

@Component({
  selector: 'app-tarjetaestudiantes',
  templateUrl: './tarjetaestudiantes.component.html',
  styles: []
})
export class TarjetaestudiantesComponent implements OnInit {

  @Input() estudiantes: Estudiante;
  constructor() { }
  ngOnInit(): void {
  }

}
