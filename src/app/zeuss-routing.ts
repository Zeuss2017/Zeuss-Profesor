import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './security/login.component';
import {AuthGuard} from './security/auth.guard';
import {RegistroComponent} from './profesor/registro.component';
import {CursoComponent} from './curso/curso.component';
import {CursoEditarComponent} from './curso/curso-editar.component';
import {EstudianteComponent} from './estudiante/estudiante.component';

const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'registro', component: RegistroComponent},
    {path: 'curso/list', component: CursoComponent, canActivate: [AuthGuard]},
    {path: 'curso/crear', component: CursoEditarComponent, canActivate: [AuthGuard]},
    {path: 'curso/editar/:id', component: CursoEditarComponent, canActivate: [AuthGuard]},
    {path: 'estudiante/list/:id', component: EstudianteComponent, canActivate: [AuthGuard]},
    {path: '', redirectTo: '/curso/list', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class ZeussRoutingModule {}