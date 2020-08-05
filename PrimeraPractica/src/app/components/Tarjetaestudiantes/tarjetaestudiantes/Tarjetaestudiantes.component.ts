import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Estudiante } from '../../modelo/Estudiante.component';
import * as AWS from 'aws-sdk';
import { Router } from '@angular/router';
import { EstudianteService } from 'src/app/services/estudiante.service';

@Component({
  selector: 'app-tarjetaestudiantes',
  templateUrl: './tarjetaestudiantes.component.html',
  styles: []
})
export class TarjetaestudiantesComponent implements OnInit {
  @Input() estudiantes: Estudiante;
  @Input() indice: number;

  @Output() estudianteSleccionado: EventEmitter<number>;

  bucketInstance: any;
  params: any;
  cedula: string;
  alumno: Estudiante;
  constructor(private routes: Router, private servicio: EstudianteService) {
    // Inicializar el proveedor de credenciales de Amazon Cognito
    AWS.config.region = 'us-east-1'; // Región
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:a645b394-edab-4742-bcfc-3f06d65df1d7',
    });
    this.estudianteSleccionado = new EventEmitter();
  }
  ngOnInit(): void {
  }

  verCedula() {
    this.servicio.buscarEst(this.estudiantes.cedula).subscribe(datos => {
      this.estudiantes = datos;
      console.log(datos);
    });
  }

  eliminarBukets() {
    console.log('el selecionado ' + this.estudiantes);
    this.bucketInstance  = new AWS.S3();
    this.params = {
        Bucket: 'bucketimgalumnos',
        Key: this.estudiantes.cedula + '.jpg'
    };
    this.bucketInstance.deleteObject(this.params, (error, data) => {
        if (data) {
            console.log('la imagen se elimino');
        } else {
            console.log('imagen no eliminada ' + error);
        }
    });

    this.bucketInstance = new AWS.S3();
    this.params = {
        Bucket: 'bucketaudioalumnos',
        Key: this.estudiantes.cedula + '.mp3'
    };
    this.bucketInstance.deleteObject(this.params, (err, data) => {
        if (data) {
            console.log('el audio se elimino');
        } else {
            console.log('audio no eliminada' + err);
        }
    });
  }
}
