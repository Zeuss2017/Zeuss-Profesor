import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actividadestudiante } from "../model/actividadestudiante.model";
import { ActividadestudianteService } from "../service/actividadestudiante.service";
import { EstudianteService } from "../service/estudiante.service";
import { Estudiante } from "../model/estudiante.model";
import { EjercicioestudianteService } from "../service/ejercicioestudiante.service";
import { Ejercicioestudiante } from "../model/ejercicioestudiante.model";
import { Promedioscurso } from "../model/promedioscurso.model";

@Component({
  selector: 'reporteindividual',
  templateUrl: './reporteindividual.component.html'
})
export class ReporteindividualComponent implements OnInit {
  //PIE
  public pieChartLabels: string[] = ['Sujeto/Verbo', 'Articulo/Sustantivo', 'Adjetivo/Sustantivo'];
  public pieChartDataErrores: number[] = [30, 30, 30];
  public pieChartDataTiempo: number[] = [30, 30, 30];
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
          stepSize: 1
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
  promediosCurso: Promedioscurso = new Promedioscurso(0, 0, 0, 0, 0, 0, 0);
  desempeno: Array<boolean> = [true, true, true, true, true, true];
  realizo: Array<boolean> = [false, false, false];
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
    let errores: number[] = [0, 0, 0];
    let tiempo: number[] = [0, 0, 0];


    this.serviceAct.pedirAct(this.idEstudiante, 1)
      .subscribe(
      retrievedAct => {
        if (retrievedAct != null) {
          this.realizo[0] = true;
          this.actividades[0] = retrievedAct;
          errores[0] = this.actividades[0].errores;
          tiempo[0] = this.actividades[0].tiempo;
        }
        this.act2(errores, tiempo);
      },
      error => {
        this.message = "Opción no permitida"
        this.act2(errores, tiempo);
      }
      );

  }
  public act2(errores: number[], tiempo: number[]) {
    this.serviceAct.pedirAct(this.idEstudiante, 2)
      .subscribe(
      retrievedAct3 => {
        if (retrievedAct3 != null) {
          this.realizo[1] = true;
          this.actividades[1] = retrievedAct3;
          errores[1] = this.actividades[1].errores;
          tiempo[1] = this.actividades[1].tiempo;
        }
        this.act3(errores, tiempo);

      },
      error => {
        this.message = "Opción no permitida"
        this.act3(errores, tiempo);
      }
      );


  }
  public act3(errores: number[], tiempo: number[]) {
    this.serviceAct.pedirAct(this.idEstudiante, 3)
      .subscribe(
      retrievedAct2 => {
        if (retrievedAct2 != null) {
          this.realizo[2]=true;
          this.actividades[2] = retrievedAct2;
          errores[2] = this.actividades[2].errores;
          tiempo[2] = this.actividades[2].tiempo;
        }
        this.pieChartDataErrores = errores;
        this.pieChartDataTiempo = tiempo;
        console.log(errores);
      },
      error => {
        this.message = "Opción no permitida"
        this.pieChartDataErrores = errores;
        this.pieChartDataTiempo = tiempo;
      }
      );
    this.barra(1);
    this.promedios();
  }
  public barra(act: number) {
    let data: number[] = [];
    let dataLine: number[] = [];
    let actividadId: number;
    this.barChartLabels = [];
    this.lineChartLabels = [];

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
  public promedios() {
    this.serviceAct.promediosCurso(this.idEstudiante)
      .subscribe(
      retrieved => {
        this.promediosCurso = retrieved;
        console.log(this.promediosCurso);
        if (this.promediosCurso.errores1 < this.pieChartDataErrores[0]) {
          this.desempeno[0] = false;

        }
        if (this.promediosCurso.errores2 < this.pieChartDataErrores[1]) {
          this.desempeno[1] = false;
        }
        if (this.promediosCurso.errores3 < this.pieChartDataErrores[2]) {
          this.desempeno[2] = false;
        }
        if (this.promediosCurso.tiempo1 < this.pieChartDataTiempo[0]) {
          this.desempeno[3] = false;
        }
        if (this.promediosCurso.tiempo2 < this.pieChartDataTiempo[1]) {
          this.desempeno[4] = false;
        }
        if (this.promediosCurso.tiempo3 < this.pieChartDataTiempo[2]) {
          this.desempeno[5] = false;
        }

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

    this.pieChartType = this.pieChartType === 'doughnut' ? 'pie' : 'doughnut';


  }

  public randomizeType2(): void {
    this.barChartType = this.barChartType === 'bar' ? 'line' : 'bar';

    this.lineChartType = this.barChartType === 'line' ? 'bar' : 'line';

  }
}