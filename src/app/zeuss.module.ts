import { RespuestaService } from './service/respuesta.service';
import { PerfilComponent } from './profesor/perfil.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ZeussComponent } from './zeuss.component';
import { AuthService } from "./service/auth.service";
import { AuthGuard } from "./security/auth.guard";
import { ProfesorService } from "./service/profesor.service";
import { ColegioService } from "./service/colegio.service";
import { CursoService } from "./service/curso.service";
import { EstudianteService } from "./service/estudiante.service";
import { LoginComponent } from "./security/login.component";
import { RegistroComponent } from "./profesor/registro.component";
import { CursoComponent } from "./curso/curso.component";
import { CursoEditarComponent } from "./curso/curso-editar.component";
import { EstudianteComponent } from "./estudiante/estudiante.component";
import { HttpModule, JsonpModule } from "@angular/http";
import { FormsModule } from '@angular/forms';
import { ZeussRoutingModule } from "./zeuss-routing";
import { EjercicioComponent } from './ejercicio/ejercicio.component';
import { EjercicioService } from "./service/ejercicio.service";
import { CrearejercicioComponent } from './crearejercicio/crearejercicio.component';
import { Actividad1Component } from './actividad/actividad1/actividad1.component';
import { Actividad2Component } from './actividad/actividad2/actividad2.component';
import { Actividad3Component } from './actividad/actividad3/actividad3.component';
import { ActividadestudianteService } from "./service/actividadestudiante.service";
import { EjercicioestudianteService } from "./service/ejercicioestudiante.service";
import { ReportecursoComponent } from './reportecurso/reportecurso.component';
import { ReporteindividualComponent } from './reporteindividual/reporteindividual.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({

  declarations: [
    ZeussComponent,
    LoginComponent,
    RegistroComponent,
    CursoComponent,
    CursoEditarComponent,
    EstudianteComponent,
    PerfilComponent,
    EjercicioComponent,
    EjercicioComponent,
    CrearejercicioComponent,
    Actividad1Component,
    Actividad2Component,
    Actividad3Component,
    ReportecursoComponent,
    ReporteindividualComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    FormsModule,
    ZeussRoutingModule,
    ChartsModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    ProfesorService,
    ColegioService,
    CursoService,
    EstudianteService,
    EjercicioService,
    RespuestaService,
    ActividadestudianteService,
    EjercicioestudianteService
    
  ],
  bootstrap: [ZeussComponent]
})
export class ZeussModule { }
