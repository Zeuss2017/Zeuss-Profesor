import { environment } from './../../environments/environment';
import {Http, Response} from '@angular/http';
import {Location} from '@angular/common';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {RestClient} from './rest-client';
import {Ejercicio} from '../model/ejercicio.model';

@Injectable()
export class EjercicioService extends RestClient<Ejercicio> {
    baseURL =  environment.url+"ejercicio/";

    constructor(http: Http) {
        super(http);
    }
    findEjercicios(username:string) {
        let url = this.baseURL +'profesor/'+ username ;
        return this.http.get(url)
            .map((res: Response) => res.json());
        
    }
    create(obj: Ejercicio) {
        console.log("post " + this.baseURL + " " + JSON.stringify(obj));
        return this.http.post(this.baseURL + "create", obj)
            .map((res: Response) => res.json());
    }
    asoProActEj(id:number,username:string, actividad:number) {
        let url = this.baseURL +'asoProActEj/'+id+'/'+ username +'/'+actividad;
        return this.http.get(url)
            .map((res: Response) => res.json());
    }

}