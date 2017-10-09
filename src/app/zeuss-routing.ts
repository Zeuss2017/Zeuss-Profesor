import { QuienessomosComponent } from './quienessomos/quienessomos.component';
import { EjercicioComponent } from './ejercicio/ejercicio.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './security/login.component';
import { AuthGuard } from './security/auth.guard';
import { RegistroComponent } from './profesor/registro.component';
import { CursoComponent } from './curso/curso.component';
import { CursoEditarComponent } from './curso/curso-editar.component';
import { EstudianteComponent } from './estudiante/estudiante.component';
import { PerfilComponent } from './profesor/perfil.component';
import { CrearejercicioComponent } from "./crearejercicio/crearejercicio.component";
import { Actividad1Component } from "./actividad/actividad1/actividad1.component";
import { Actividad2Component } from "./actividad/actividad2/actividad2.component";
import { Actividad3Component } from "./actividad/actividad3/actividad3.component";
import { ReportecursoComponent } from "./reportecurso/reportecurso.component";
import { ReporteindividualComponent } from "./reporteindividual/reporteindividual.component";
import { AyudaComponent } from './ayuda/ayuda.component';
import { ManualestudianteComponent } from './manualestudiante/manualestudiante.component';
import { ModuloestudianteComponent } from './moduloestudiante/moduloestudiante.component';


const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'moduloEstudiante', component: ModuloestudianteComponent},    
    { path: 'modulolEstudiante/manualEstudiante', component: ManualestudianteComponent},
    { path: 'registro', component: RegistroComponent },
    { path: 'curso/list', component: CursoComponent, canActivate: [AuthGuard] },
    { path: 'curso/crear', component: CursoEditarComponent, canActivate: [AuthGuard] },
    { path: 'curso/editar/:id', component: CursoEditarComponent, canActivate: [AuthGuard] },
    { path: 'estudiante/list/:id', component: EstudianteComponent, canActivate: [AuthGuard] },
    { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },
    { path: 'ejercicio/list', component: EjercicioComponent, canActivate: [AuthGuard] },
    { path: 'ejercicio/crear', component: CrearejercicioComponent, canActivate: [AuthGuard] },
    { path: 'actividad/1/:escenario', component: Actividad1Component, canActivate: [AuthGuard] },
    { path: 'actividad/2/:escenario', component: Actividad2Component, canActivate: [AuthGuard] },
    { path: 'actividad/3/:escenario', component: Actividad3Component, canActivate: [AuthGuard] },
    { path: 'curso/reporte/:id', component: ReportecursoComponent, canActivate: [AuthGuard] },
    { path: 'estudiante/reporte/:id', component: ReporteindividualComponent, canActivate: [AuthGuard] },
    { path: 'quienessomos', component: QuienessomosComponent, canActivate: [AuthGuard] },
    { path: 'ayuda', component: AyudaComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: '/curso/list', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class ZeussRoutingModule { }