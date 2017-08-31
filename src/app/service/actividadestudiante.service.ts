import {Http, Response} from '@angular/http';
import {Location} from '@angular/common';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {RestClient} from './rest-client';
import {Actividadestudiante} from '../model/actividadestudiante.model';
import { environment } from "../../environments/environment";

@Injectable()
export class ActividadestudianteService extends RestClient<Actividadestudiante>{

    baseURL = environment.url+"actividadestudiante/";

    constructor(http: Http) {
        super(http);
    }
    
    pedirAct( idEstudiante: number,idActividad:number) {
        let url = this.baseURL + 'pedirAct/'  + idEstudiante+'/'+idActividad;
        return this.http.get(url)
            .map((res: Response) => res.json());
    }

}
