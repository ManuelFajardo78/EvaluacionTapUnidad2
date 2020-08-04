import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estudiante } from '../components/modelo/Estudiante.component';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  constructor(private  http: HttpClient) {}
  // Url = 'http://3.81.98.251:80/api/v1/alumno';
  Url = 'http://localhost:80/api/v1/alumno';
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
    return this.http.get<Estudiante>(this.Url + '/' + cedula);
  }
  editarEstudiante(estudiante: Estudiante) {
    return this.http.put<Estudiante>(this.Url + '/editar', estudiante);
  }
  borrarEst(cedula: Estudiante): Observable<any> {
    return this.http.delete<Estudiante>(this.Url + '/eliminar?cedula=' + cedula.cedula);
  }
}
