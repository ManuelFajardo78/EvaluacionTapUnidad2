
import { RouterModule, Routes } from '@angular/router';
import { FormularioComponent } from './components/formulario/formulario/formulario.component';
import { BodyComponent } from './components/body/body/body.component';
import { EstudiantesComponent } from './components/estudiantes/estudiantes/estudiantes.component';
const ROUTES: Routes = [
    { path: 'home', component: BodyComponent},
    { path: 'estudiantes', component: EstudiantesComponent},
    { path: '**', pathMatch: 'full', redirectTo: 'home'}
];

export const APPROUTING = RouterModule.forRoot(ROUTES);
