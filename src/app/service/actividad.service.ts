import {Http, Response} from '@angular/http';
import {Location} from '@angular/common';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {RestClient} from './rest-client';
import {Actividad} from '../model/actividad.model';

@Injectable()
export class ActividadService extends RestClient<Actividad> {
    baseURL = "http://174.138.36.65:8080/Zeuss/webresources/actividad/";

    constructor(http: Http) {
        super(http);
    }

}