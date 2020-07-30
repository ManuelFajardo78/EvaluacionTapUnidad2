import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Buffer } from 'buffer';
import { Estudiante } from '../../modelo/Estudiante.component';
import { Router } from '@angular/router';
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
  // audio
  public isRecording: boolean = false;
  private chunks: any = [];
  private mediaRecorder: any;
  gaudio : any;

  // imagen
  @ViewChild('video') video: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  foto: any;
  detector: any;
  image: any;

  constructor(private routes: Router, private servicio: EstudianteService) { 
    const onSuccess = stream => {
      this.mediaRecorder = new MediaRecorder(stream);
      this.mediaRecorder.onstop = e => {
        const audio = new Audio();
        const blob = new Blob(this.chunks, { 'type': 'audio/ogg; codecs=opus' });
        this.chunks.length = 0;
        audio.src = window.URL.createObjectURL(blob);
        this.gaudio = audio;
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

  public ngAfterViewInit() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(screenStream => {
        this.video.nativeElement.srcObject = screenStream;
        this.video.nativeElement.play();
      });
    }
  }

  ngOnInit(): void {
  }

  registrar() {
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

  public capturar() {
    var context = this.canvas.nativeElement.getContext("2d").drawImage(this.video.nativeElement, 0, 0, 600, 440);
    this.foto = this.canvas.nativeElement.toDataURL("image/png");
    this.foto = this.foto.split(",")[1];
    this.image = {
      Image: {
        Bytes: new Buffer(this.foto, 'base64')
      },
    Attributes: ['ALL']
    }
  }
}


