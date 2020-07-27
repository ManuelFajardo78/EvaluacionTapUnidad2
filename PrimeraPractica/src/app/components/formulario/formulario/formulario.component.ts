import { Component, OnInit } from '@angular/core';
import { Estudiante } from '../../modelo/Estudiante.component';
import { Routes, Router } from '@angular/router';
import { EstudianteService } from '../../../services/estudiante.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styles: []
})
export class FormularioComponent implements OnInit {
  model: Estudiante = {id: '', cedula: '', nombre: '', apellido: '', direccion: '', telefono: '', corre_electronico: ''};
  constructor(private routes: Router, private servicio: EstudianteService) { }

  ngOnInit(): void {
  }
  onSubmit() {
    this.guardar(this.model);
  }
  guardar(estudiante: Estudiante) {
    this.servicio.crearEstudiante(estudiante).subscribe(data => {
      alert('Se guardo el estudiante');
      this.routes.navigate(['empleados']);
    });
  }

}


