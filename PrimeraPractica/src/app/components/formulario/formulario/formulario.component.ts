import { Component, OnInit } from '@angular/core';
import { Estudiante } from '../../modelo/Estudiante.component';
import { Routes, Router } from '@angular/router';
import { EstudianteService } from '../../../services/estudiante.service';
declare const navigator: any;
declare const MediaRecorder: any;

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styles: []
})
export class FormularioComponent implements OnInit {
  model: Estudiante = {id: '', cedula: '', nombre: '', apellido: '', direccion: '', telefono: '', corre_electronico: ''};
  public isRecording: boolean = false;
  private chunks: any = [];
  private mediaRecorder: any;

  constructor(private routes: Router, private servicio: EstudianteService) { 
    const onSuccess = stream => {
      this.mediaRecorder = new MediaRecorder(stream);
      this.mediaRecorder.onstop = e => {
        const audio = new Audio();
        const blob = new Blob(this.chunks, { 'type': 'audio/ogg; codecs=opus' });
        this.chunks.length = 0;
        audio.src = window.URL.createObjectURL(blob);
        audio.load();
        audio.play();
      };

      this.mediaRecorder.ondataavailable = e => this.chunks.push(e.data);
    };

    navigator.getUserMedia = (navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia);

    navigator.getUserMedia({ audio: true }, onSuccess, e => console.log(e));
  }

  ngOnInit(): void {
  }
  onSubmit() {
    this.guardar(this.model);
  }
  guardar(estudiante: Estudiante) {
    this.servicio.crearEstudiante(estudiante).subscribe(data => {
      alert('Se guardo el estudiante');
      this.routes.navigate(['estudiantes']);
    });
  }
  public record() {
    this.isRecording = true;
    this.mediaRecorder.start();
  }
  public stop() {
    this.isRecording = false;
    this.mediaRecorder.stop();
  }
}


