import { Http, Response } from '@angular/http';
import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { RestClient } from './rest-client';
import { environment } from "../../environments/environment";
import { Ejercicioestudiante } from "../model/ejercicioestudiante.model";

@Injectable()
export class EjercicioestudianteService extends RestClient<Ejercicioestudiante>{

  baseURL = environment.url + "ejercicioestudiante/";

  constructor(http: Http) {
    super(http);
  }
  pedirEj(idActividadEst: number) {
    let url = this.baseURL + 'pedirEj/' + idActividadEst;
    return this.http.get(url)
      .map((res: Response) => res.json());
  }

}
