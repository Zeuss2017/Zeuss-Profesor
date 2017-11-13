import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'crearejercicio',
  templateUrl: 'crearejercicio.component.html'
})
export class CrearejercicioComponent implements OnInit {

  act: number = 0;
  escenario: string = '';
  message: string = '';
  constructor(private router: Router) { }

  ngOnInit() {

  }

  cambioActividad(event) {
    this.act = event;
  }
  cambioEscenario(event) {
    this.escenario = event;
  }
  next() {
    if (this.act == 0) {
      this.message = "Eliga una actividad"
    }
    else {
      if (this.escenario == '') {
        this.message = "Eliga un escenario"
      }
      else {

        if (this.act == 1) {
          this.router.navigate(['/actividad/1', this.escenario]);
        }
        if (this.act == 2) {
          this.router.navigate(['/actividad/2', this.escenario]);
        }
        if (this.act == 3) {
          this.router.navigate(['/actividad/3', this.escenario]);
        }
      }
    }

  }
}
