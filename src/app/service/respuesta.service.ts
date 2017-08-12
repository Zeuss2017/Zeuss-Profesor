import {Http, Response} from '@angular/http';
import {Location} from '@angular/common';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {RestClient} from './rest-client';
import {Respuesta} from '../model/respuesta.model';
import { environment } from "../../environments/environment";

@Injectable()
export class RespuestaService extends RestClient<Respuesta> {
    baseURL =  environment.url+"respuesta/";

    constructor(http: Http) {
        super(http);
    }

    create2(obj: Respuesta, idEjercicio:number) {
        console.log("post " + this.baseURL + " " + JSON.stringify(obj));
        return this.http.post(this.baseURL + "create2/"+idEjercicio, obj)
            .map((res: Response) => res.json());
    }

}
