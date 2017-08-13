import { Component, OnInit } from '@angular/core';
import { Respuesta } from './../../model/respuesta.model';
import { RespuestaService } from './../../service/respuesta.service';
import { Profesor } from './../../model/profesor.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EjercicioService } from './../../service/ejercicio.service';
import { Ejercicio } from './../../model/ejercicio.model';

@Component({
  selector: 'app-actividad2',
  templateUrl: './actividad2.component.html'
})
export class Actividad2Component implements OnInit {
  niveles: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  ejercicio: Ejercicio = new Ejercicio(0, '', '', '', '', 0);
  message = "";
  respuesta = new Respuesta(0, '', 0);
  respuestas: Array<Respuesta> = new Array;
  currentUser = new Profesor(0, '', '', '');
  correcta = 0;
  actual: number = -1;
  constructor(
    private service: EjercicioService,
    private serviceRes: RespuestaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
  this.ejercicio.escenario = this.route.snapshot.params['escenario'];
    this.currentUser = JSON.parse(localStorage.getItem('USER'));
  }

  change(i) {
    if (this.actual != -1) {
      this.respuestas[this.actual].correcta = 0;
    }
    this.respuestas[i].correcta = 1;
    this.actual = i;
    console.log(this.respuestas);
  }

  agregar() {
    console.log(this.respuesta.enunciado);
    this.respuestas.push(this.respuesta);
    this.respuesta = new Respuesta(0, '', 0);
  }

  guardar() {
    this.ejercicio.enunciado1 = this.ejercicio.enunciado1 + "__________" + this.ejercicio.enunciado2;
    this.ejercicio.enunciado2 = '';
    this.service.create(this.ejercicio).subscribe(
      id => {
        this.ejercicio.id = id
        this.service.asoProActEj(this.ejercicio.id, this.currentUser.username, 2).subscribe(
          success => {
              this.respuestas.forEach(element => {
                this.serviceRes.create2(element, this.ejercicio.id).subscribe(
                      success => {},
                      error => this.message = "Error: " + JSON.stringify(error)
                    );
              });
          },
          error => this.message = "Error: " + JSON.stringify(error)
        );
      },
      error => this.message = "Error: " + JSON.stringify(error)
    );
    this.router.navigate(['ejercicio/list']);

  }
}
