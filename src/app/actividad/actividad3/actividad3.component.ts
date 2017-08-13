import { Component, OnInit } from '@angular/core';
import { Respuesta } from './../../model/respuesta.model';
import { RespuestaService } from './../../service/respuesta.service';
import { Profesor } from './../../model/profesor.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EjercicioService } from './../../service/ejercicio.service';
import { Ejercicio } from './../../model/ejercicio.model';

@Component({
  selector: 'app-actividad3',
  templateUrl: './actividad3.component.html'
})
export class Actividad3Component implements OnInit {
  niveles: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  ejercicio: Ejercicio = new Ejercicio(0, '', '', '', '', 0);
  message = "";
  respuesta1 = new Respuesta(0, '', 1);
  respuesta2 = new Respuesta(0, '', 2);
  respuesta3 = new Respuesta(0, '', 3);
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
    this.service.create(this.ejercicio).subscribe(
      id => {
        this.ejercicio.id = id
        this.service.asoProActEj(this.ejercicio.id, this.currentUser.username, 3).subscribe(
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
