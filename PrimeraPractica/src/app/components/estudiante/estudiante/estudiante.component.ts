import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { Estudiante } from '../../modelo/Estudiante.component';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styles: []
})
export class EstudianteComponent implements OnInit {
  estudiantes: any;
  termino: string;
  constructor(private activateRoute: ActivatedRoute, private servicio: EstudianteService) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params =>{
      this.termino = params['termino'];
      this.estudiantes = this.servicio.buscarEst(this.termino);
      console.log(this.estudiantes);
    });
  }

}
