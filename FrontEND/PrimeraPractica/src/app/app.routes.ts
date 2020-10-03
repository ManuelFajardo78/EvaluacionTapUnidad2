
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './components/body/body/body.component';
const ROUTES: Routes = [
    { path: 'home', component: BodyComponent}
];

export const APPROUTING = RouterModule.forRoot(ROUTES);
