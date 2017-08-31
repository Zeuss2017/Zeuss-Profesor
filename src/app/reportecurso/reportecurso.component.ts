import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoService } from "../service/curso.service";
import { Actividadestudiante } from "../model/actividadestudiante.model";
import { Curso } from "../model/curso.model";
@Component({
  selector: 'reportecurso',
  templateUrl: './reportecurso.component.html'
})
export class ReportecursoComponent implements OnInit {
  idCurso: number;
  actividadesEst1: Array<Actividadestudiante>;
  actividadesEst2: Array<Actividadestudiante>;
  actividadesEst3: Array<Actividadestudiante>;
  message = '';
  currentPath=1;
  curso:Curso=new Curso(0,'','',0);
  public pieChartLabels: string[] = ['Articulo/Sustantivo', 'Sujeto/Verbo', 'Adjetivo/Sustantivo'];
  public pieChartDataErrores: number[] = [0, 0, 0];
  public pieChartDataTiempo: number[] = [0, 0, 0];
  public pieChartType: string = 'pie';

  public barChartLabels: string[] = ['', '', '', ''];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  public barChartData: any[] = [{
    data: [0, 0, 0, 0], label: 'Cantidad de estudiantes'
  }
  ];
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          stepSize : 1
        },
        scaleLabel: {
          display: true,
          labelString: "Cantidad de estudiantes"
        }

      }],
      xAxes: [{
        ticks: {
          beginAtZero: true
        },
        scaleLabel: {
          display: true,
          labelString: "Tiempo (s)"
        }
      }]
    }

  };
  constructor(
    private serviceCurso: CursoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.idCurso = this.route.snapshot.params['id'];
    this.serviceCurso.find(this.idCurso)
    .subscribe(
    retrievedCurso=>this.curso = retrievedCurso,
    error => this.message = "Opción no permitida"
    );

    this.serviceCurso.pedirActCurso(this.idCurso, 1)
      .subscribe(
      retrievedAct => {
        this.actividadesEst1 = retrievedAct
        this.actividadesEst1.forEach(element => {
          this.pieChartDataErrores[0] = this.pieChartDataErrores[0] + element.errores;
          this.pieChartDataTiempo[0] = this.pieChartDataTiempo[0] + element.tiempo;
        });
        this.tiempos(1);
      },
      error => this.message = "Opción no permitida"
      );

    this.serviceCurso.pedirActCurso(this.idCurso, 2)
      .subscribe(
      retrievedAct => {
        this.actividadesEst2 = retrievedAct
        this.actividadesEst2.forEach(element => {
          this.pieChartDataErrores[1] = this.pieChartDataErrores[1] + element.errores;
          this.pieChartDataTiempo[1] = this.pieChartDataTiempo[1] + element.tiempo;
        });
      },
      error => this.message = "Opción no permitida"
      );

    this.serviceCurso.pedirActCurso(this.idCurso, 3)
      .subscribe(
      retrievedAct => {
        this.actividadesEst3 = retrievedAct
        this.actividadesEst3.forEach(element => {
          this.pieChartDataErrores[2] = this.pieChartDataErrores[2] + element.errores;
          this.pieChartDataTiempo[2] = this.pieChartDataTiempo[2] + element.tiempo;
        });
      },
      error => this.message = "Opción no permitida"
      );


  }
  public randomizeType(): void {
    this.barChartType = this.barChartType === 'bar' ? 'line' : 'bar';
    this.pieChartType = this.pieChartType === 'doughnut' ? 'pie' : 'doughnut';
  }
  public tiempos(numAct: number) {
   
    let promedio1;
    let actividades:Array<Actividadestudiante>;
    if (numAct == 1) {
      promedio1 = this.pieChartDataTiempo[0] / this.actividadesEst1.length;
      actividades=this.actividadesEst1;
      this.currentPath=1;
    }

    if (numAct == 2) {
      promedio1 = this.pieChartDataTiempo[1] / this.actividadesEst2.length;
      actividades=this.actividadesEst2;
      this.currentPath=2;
    }

    if (numAct == 3) {
      promedio1 = this.pieChartDataTiempo[2] / this.actividadesEst2.length;
      actividades=this.actividadesEst3;
      this.currentPath=3;
    }

    console.log(this.pieChartDataTiempo[0], this.actividadesEst1.length)
    this.barChartLabels[0] = '0-' + (promedio1 * 0.5).toFixed(2);
    this.barChartLabels[1] = (promedio1 * 0.5).toFixed(2) + '-' + promedio1.toFixed(2);
    this.barChartLabels[2] = promedio1.toFixed(2) + '-' + (promedio1 * 1.5).toFixed(2);
    this.barChartLabels[3] = (promedio1 * 1.5).toFixed(2) + '-' + (promedio1 * 2).toFixed(2);
    let data = [0, 0, 0, 0];
    console.log(promedio1.toFixed(2));
    actividades.forEach(element => {
      if (element.tiempo < promedio1 * 0.5) {
        data[0] = data[0] + 1;
      }
      else {
        if (element.tiempo >= promedio1 * 0.5 && element.tiempo < promedio1) {
          data[1] = data[1] + 1;
        }
        else {
          if (element.tiempo >= promedio1 && element.tiempo < promedio1 * 1.5) {
            data[2] = data[2] + 1;
          }
          else {
            if (element.tiempo >= promedio1 * 1.5) {
              data[3] = data[3] + 1;
            }
          }
        }
      }
    });
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;

    console.log(this.barChartData)

  }

}
