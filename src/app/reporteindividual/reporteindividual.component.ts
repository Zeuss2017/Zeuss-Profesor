import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actividadestudiante } from "../model/actividadestudiante.model";
import { ActividadestudianteService } from "../service/actividadestudiante.service";
import { EstudianteService } from "../service/estudiante.service";
import { Estudiante } from "../model/estudiante.model";
import { EjercicioestudianteService } from "../service/ejercicioestudiante.service";
import { Ejercicioestudiante } from "../model/ejercicioestudiante.model";

@Component({
  selector: 'reporteindividual',
  templateUrl: './reporteindividual.component.html'
})
export class ReporteindividualComponent implements OnInit {
  //PIE
  public pieChartLabels: string[] = ['Articulo/Sustantivo', 'Sujeto/Verbo', 'Adjetivo/Sustantivo'];
  public pieChartDataErrores: number[] = [0, 0, 0];
  public pieChartDataTiempo: number[] = [0, 0, 0];
  public pieChartType: string = 'pie';
  //BARRAS
  public barChartLabels: string[] = [];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        },
        scaleLabel: {
          display: true,
          labelString: "Tiempo (s)"
        }

      }],
      xAxes: [{
        ticks: {
          beginAtZero: true
        },
        scaleLabel: {
          display: true,
          labelString: "Nivel"
        }
      }]
    }

  };
  public barChartData: any[] = [
    { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Tiempo' }
  ];

  //LINE
  // lineChart
  public lineChartData: Array<any> = [
    { data: [], label: 'Nivel' }
  ];
  public lineChartLabels: Array<any> = [];
  public lineChartOptions: any = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          stepSize : 1
        },
        scaleLabel: {
          display: true,
          labelString: "Nivel"
        }
      }],
      xAxes: [{
        ticks: {
          beginAtZero: true
        },
        scaleLabel: {
          display: true,
          labelString: "Progreso"
        }
      }]
    }
  };

  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  idEstudiante: number;
  a: Actividadestudiante = new Actividadestudiante(0, 0, 0, 0, 0, 0);
  actividades: Array<Actividadestudiante> = [this.a, this.a, this.a];
  message: string = '';
  estudiante: Estudiante = new Estudiante(0, '', '', '');
  idActividades: Array<number>;
  ejercicios1: Array<Ejercicioestudiante>;
  ejercicios2: Array<Ejercicioestudiante>;
  ejercicios3: Array<Ejercicioestudiante>;


  constructor(
    private serviceAct: ActividadestudianteService,
    private serviceEstudiante: EstudianteService,
    private serviceEj: EjercicioestudianteService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.idEstudiante = this.route.snapshot.params['id'];
    this.serviceEstudiante.find(this.idEstudiante)
      .subscribe(
      estudiante => this.estudiante = estudiante,
      error => this.message = "Opción no permitida"
      );
    this.pie();


  }

  public pie() {
    this.serviceAct.pedirAct(this.idEstudiante, 1)
      .subscribe(
      retrievedAct => {
        this.actividades[0] = retrievedAct;
        this.pieChartDataErrores[0] = this.actividades[0].errores;
        this.pieChartDataTiempo[0] = this.actividades[0].tiempo;
        this.serviceAct.pedirAct(this.idEstudiante, 2)
          .subscribe(
          retrievedAct => {
            this.actividades[1] = retrievedAct;
            this.pieChartDataErrores[1] = this.actividades[1].errores;
            this.pieChartDataTiempo[1] = this.actividades[1].tiempo;
            this.serviceAct.pedirAct(this.idEstudiante, 3)
              .subscribe(
              retrievedAct => {
                this.actividades[2] = retrievedAct;
                this.pieChartDataErrores[2] = this.actividades[2].errores;
                this.pieChartDataTiempo[2] = this.actividades[2].tiempo;
                this.barra(1);
              },
              error => this.message = "Opción no permitida"
              );
          },
          error => this.message = "Opción no permitida"
          );
      },
      error => this.message = "Opción no permitida"
      );
  }
  public barra(act: number) {
    let data: number[] = [];
    let dataLine: number[] = [];
    let actividadId: number;
    this.barChartLabels = [];
    this.lineChartLabels= [];

    if (act == 1) {
      actividadId = this.actividades[0].id;
    }
    if (act == 2) {
      actividadId = this.actividades[1].id;
    }
    if (act == 3) {
      actividadId = this.actividades[2].id;
    }


    this.serviceEj.pedirEj(actividadId)
      .subscribe(
      retrievedEj => {
        this.ejercicios1 = retrievedEj;
        this.ejercicios1.sort(
          (a: Ejercicioestudiante, b: Ejercicioestudiante) => {
            if (a.consecutivo < b.consecutivo) {
              return -1;
            } else if (a.consecutivo > b.consecutivo) {
              return 1;
            } else {
              return 0;
            }
          }
        );
        console.log(this.ejercicios1);
        this.ejercicios1.forEach(element => {
          if (this.barChartLabels.includes(String(element.nivel))) {

            let pos = this.barChartLabels.findIndex(y => Object.is(String(element.nivel), y));
            data[pos] = (data[pos] + element.tiempo) / 2;
            console.log(data[pos]);
          }
          else {
            this.barChartLabels.push(String(element.nivel));
            data.push(element.tiempo);
          }
          this.lineChartLabels.push(String(element.consecutivo));
          dataLine.push(element.nivel);

        });
        let clone = JSON.parse(JSON.stringify(this.barChartData));
        clone[0].data = data;
        this.barChartData = clone;

        let cloneLine = JSON.parse(JSON.stringify(this.lineChartData));
        cloneLine[0].data = dataLine;
        this.lineChartData = cloneLine;
      },
      error => this.message = "Opción no permitida"
      );
  }



  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
  public randomizeType(): void {
    this.barChartType = this.barChartType === 'bar' ? 'line' : 'bar';
    this.pieChartType = this.pieChartType === 'doughnut' ? 'pie' : 'doughnut';
    this.lineChartType = this.barChartType === 'line' ? 'bar' : 'line';
    
  }

}
