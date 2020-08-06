import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BodyComponent } from './components/body/body/body.component';
import { FooterComponent } from './components/footer/footer/footer.component';
import { HeaderComponent } from './components/header/header/header.component';
import { FormularioComponent } from './components/formulario/formulario/formulario.component';
import { APPROUTING } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { EstudiantesComponent } from './components/estudiantes/estudiantes/estudiantes.component';
import { TarjetaestudiantesComponent } from './components/Tarjetaestudiantes/tarjetaestudiantes/Tarjetaestudiantes.component';
import { EstudianteService } from './services/estudiante.service';

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    FooterComponent,
    HeaderComponent,
    FormularioComponent,
    EstudiantesComponent,
    TarjetaestudiantesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    APPROUTING,
    HttpClientModule
  ],
  providers: [
    EstudianteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
