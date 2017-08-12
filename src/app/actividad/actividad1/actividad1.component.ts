import { Respuesta } from './../../model/respuesta.model';
import { RespuestaService } from './../../service/respuesta.service';
import { Profesor } from './../../model/profesor.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EjercicioService } from './../../service/ejercicio.service';
import { Ejercicio } from './../../model/ejercicio.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-actividad1',
  templateUrl: './actividad1.component.html'
})
export class Actividad1Component implements OnInit {
  niveles: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  ejercicio: Ejercicio = new Ejercicio(0, '', '', '', '', 0);
  message = "";
  respuesta1=new Respuesta(0,'',0);
  respuesta2=new Respuesta(0,'',0);
  respuesta3=new Respuesta(0,'',0);
  currentUser = new Profesor(0, '', '', '');
  correcta=0;
  constructor(
    private service: EjercicioService,
    private serviceRes: RespuestaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('USER'));
  }
  guardar() {
    if(this.correcta==1){
      this.respuesta1.correcta=1;
    }
    if(this.correcta==2){
      this.respuesta1.correcta=1;
    }
    if(this.correcta==3){
      this.respuesta1.correcta=1;
    }

    this.ejercicio.enunciado1 = this.ejercicio.enunciado1 + "__________" + this.ejercicio.enunciado2;
    this.ejercicio.enunciado2 = '';
    this.service.create(this.ejercicio).subscribe(
      id => {
        this.ejercicio.id = id
        this.service.asoProEj(this.ejercicio.id, this.currentUser.username).subscribe(
          success => {
            this.serviceRes.create2(this.respuesta1, this.ejercicio.id).subscribe(
              success => {


              },
              error => this.message = "Error: " + JSON.stringify(error)
            );

          },
          error => this.message = "Error: " + JSON.stringify(error)
        );
      },
      error => this.message = "Error: " + JSON.stringify(error)
    );

  }

}
