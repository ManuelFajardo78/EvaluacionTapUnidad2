import { Component, OnInit } from '@angular/core';
import { EstudianteService } from '../../../services/estudiante.service';
import { Estudiante } from '../../modelo/Estudiante.component';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styles: []
})
export class EstudiantesComponent implements OnInit {

  estudiantes: Estudiante[];
  constructor(private estudianteService: EstudianteService) {}
  ngOnInit() {
    this.estudianteService.getEstudiante().subscribe(datos => {
      this.estudiantes = datos;
    });
  }
}
