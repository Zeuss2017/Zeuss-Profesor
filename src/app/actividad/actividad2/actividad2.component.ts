import { Respuesta } from './../../model/respuesta.model';
import { RespuestaService } from './../../service/respuesta.service';
import { Profesor } from './../../model/profesor.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EjercicioService } from './../../service/ejercicio.service';
import { Ejercicio } from './../../model/ejercicio.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'zeuss-actividad2',
  templateUrl: './actividad2.component.html'
})
export class Actividad2Component implements OnInit {
  niveles: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  ejercicio: Ejercicio = new Ejercicio(0, '', '', '', '', 0);
  message = "";
  respuesta1 = new Respuesta(0, '', 0);
  respuesta2 = new Respuesta(0, '', 0);
  respuesta3 = new Respuesta(0, '', 0);
  currentUser = new Profesor(0, '', '', '');
  correcta = 0;
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
  guardar() {
    if (this.correcta == 0) {
      this.message = 'Seleccione la opción correcta';
    }
    else {
      if (this.correcta == 1) {
        this.respuesta1.correcta = 1;
      }
      if (this.correcta == 2) {
        this.respuesta2.correcta = 1;
      }
      if (this.correcta == 3) {
        this.respuesta3.correcta = 1;
      }

      this.ejercicio.enunciado1 = this.ejercicio.enunciado1 + " ____ " + this.ejercicio.enunciado2;
      this.ejercicio.enunciado2 = '';
      this.service.create(this.ejercicio).subscribe(
        id => {

          this.ejercicio.id = id
          this.service.asoProActEj(this.ejercicio.id, this.currentUser.username, 2).subscribe(
            success => {
              this.serviceRes.create2(this.respuesta1, this.ejercicio.id).subscribe(
                success => {
                  this.serviceRes.create2(this.respuesta2, this.ejercicio.id).subscribe(
                    success => {
                      this.serviceRes.create2(this.respuesta3, this.ejercicio.id).subscribe(
                        success => { this.router.navigate(['ejercicio/list']); },
                        error => this.message = "Error: " + JSON.stringify(error)
                      );
                    },
                    error => this.message = "Error: " + JSON.stringify(error)
                  );
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
}
