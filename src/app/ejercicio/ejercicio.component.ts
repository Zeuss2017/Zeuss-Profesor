import { Component, OnInit } from '@angular/core';
import { Ejercicio } from "../model/ejercicio.model";
import { EjercicioService } from "../service/ejercicio.service";
import { ActivatedRoute, Router } from '@angular/router';
import { Profesor } from "../model/profesor.model";

@Component({
  selector: 'ejercicio',
  templateUrl: 'ejercicio.component.html'
})
export class EjercicioComponent implements OnInit {
  
  ejercicios: Array<Ejercicio> = [];
  profesor = new Profesor(0, '', '', '');
  message = '';
  constructor(
    private serviceEjercicio: EjercicioService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.profesor = JSON.parse(localStorage.getItem('USER'));
    this.serviceEjercicio.findEjercicios(this.profesor.username)
      .subscribe(
      ejercicios => this.ejercicios = ejercicios,
      error => this.message = "Error: " + JSON.stringify(error)
      );
  }

}
