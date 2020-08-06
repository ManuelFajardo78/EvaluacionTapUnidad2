import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estudiante } from '../components/modelo/Estudiante.component';
import { stringType } from 'aws-sdk/clients/iam';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  constructor(private  http: HttpClient) {}
  Url = 'http://54.237.108.209:80/api/v1/alumno';
  // Url = 'http://localhost:9094/api/v1/alumno';
  getEstudiante() {
    return this.http.get<Estudiante[]>(this.Url);
  }
  getByEstado() {
    return this.http.get<Estudiante[]>(this.Url + '/estado');
  }
  crearEstudiante(estudiante: Estudiante) {
    return this.http.post<Estudiante>(this.Url, estudiante);
  }
  buscarEst(cedula: string) {
    return this.http.get<Estudiante>(this.Url + '/{cedula}?cedula=' + cedula);
  }
  editarEstudiante(estudiante: Estudiante) {
    return this.http.put<Estudiante>(this.Url + '/editar', estudiante);
  }
  borrarEst(cedula: string): Observable<any> {
    return this.http.delete<Estudiante>('eliminar?cedula=' + cedula);
  }
}
