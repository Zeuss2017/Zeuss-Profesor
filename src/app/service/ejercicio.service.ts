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
    baseURL = "http://localhost:8080/Zeuss-Servidor/webresources/ejercicio/";

    constructor(http: Http) {
        super(http);
    }

}