import { Component, ViewChild, ElementRef} from '@angular/core';
import { Buffer } from 'buffer';
import { Estudiante } from '../../modelo/Estudiante.component';
import { Router } from '@angular/router';
import { EstudianteService } from '../../../services/estudiante.service';
import * as AWS from 'aws-sdk';
declare const navigator: any;
declare const MediaRecorder: any;

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styles: []
})
export class FormularioComponent {
  model: Estudiante = {cedula: '', nombre: '', apellido: '', corre_electronico: '', direccion: '', telefono: '', institucion: ''};
  // audio
  public isRecording: boolean = false;
  private chunks: any = [];
  private mediaRecorder: any;
  gaudio: any;

  // imagen
  @ViewChild('video') video: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  foto: any;
  detector: any;
  image: any;

  // S3
  albumBucketNameI = 'bucketimgalumnos';
  s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    params: {Bucket: 'bucketimgalumnos'},
  });
  albumBucketNameA = 'bucketaudioalumnos';
  s32 = new AWS.S3({
    apiVersion: '2006-03-01',
    params: {Bucket: 'bucketaudioalumnos'},
  });

  showImagen = false;
  error = false;
  subiendo = false;

  archivo = null;
  urlImagen = null;
  source: any;

  constructor(private routes: Router, private servicio: EstudianteService) {
    // Inicializar el proveedor de credenciales de Amazon Cognito
    AWS.config.region = 'us-east-1'; // Región
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:a645b394-edab-4742-bcfc-3f06d65df1d7',
    });
    const onSuccess = stream => {
      this.mediaRecorder = new MediaRecorder(stream);
      this.mediaRecorder.onstop = e => {
        const audio = new Audio();
        const blob = new Blob(this.chunks, { 'type': 'audio/ogg; codecs=opus' });
        this.chunks.length = 0;
        audio.src = window.URL.createObjectURL(blob);
        this.gaudio = blob;
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

  registrar() {
    //this.registrarBI();
    //this.registrarBA();
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
    };
    this.archivo = this.foto;
  }

  public async registrarBI() {
    if (this.archivo) {
      try {
        this.subiendo = true;
        const data = await new AWS.S3.ManagedUpload({
          params: {
            Bucket: this.albumBucketNameI,
            Key: this.model.cedula + '.png',
            Body: this.archivo,
            ACL: 'public-read',
          },
        }).promise();
        this.urlImagen = data.Location;
        this.subiendo = false;
        this.showImagen = true;
        this.source = this.archivo;
      } catch (error) {
        this.error = true;
        const bucle = setInterval(() => {
          this.error = false;
          alert('Imagen no registardo');
          clearInterval(bucle);
        }, 2000);
      }
    } else {
      alert('Tomese una foto');
    }
  }
  public async registrarBA() {
    if (this.gaudio) {
      try {
        this.subiendo = true;
        const data = await new AWS.S3.ManagedUpload({
          params: {
            Bucket: this.albumBucketNameA,
            Key: this.model.cedula + '.mp3',
            Body: this.gaudio,
            ACL: 'public-read',
          },
        }).promise();
        this.subiendo = false;
        this.showImagen = true;
        this.source = this.gaudio;
      } catch (error) {
        this.error = true;
        const bucle = setInterval(() => {
          this.error = false;
          alert('Audio no registardo');
          clearInterval(bucle);
        }, 2000);
      }
    } else {
      alert('Grabe un audio');
    }
  }
}


