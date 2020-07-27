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
  Url = 'http://localhost:9898/api/v1/';

  getEstudiante() {
    return this.http.get<Estudiante[]>(this.Url);
  }
  crearEstudiante(estudiante: Estudiante) {
    return this.http.post<Estudiante>(this.Url, estudiante);
  }
}
