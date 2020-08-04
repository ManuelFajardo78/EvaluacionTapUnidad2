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
  Url = 'http://54.242.57.250:80/api/v1/alumno';

  getEstudiante() {
    return this.http.get<Estudiante[]>(this.Url);
  }
  crearEstudiante(estudiante: Estudiante) {
    return this.http.post<Estudiante>(this.Url, estudiante);
  }
  buscarEst(cedula: string) {
    return this.http.get<Estudiante>(this.Url + '/' + cedula);
  }
}
