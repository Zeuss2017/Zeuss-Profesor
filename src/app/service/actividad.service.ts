import {Http, Response} from '@angular/http';
import {Location} from '@angular/common';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {RestClient} from './rest-client';
import {Actividad} from '../model/actividad.model';
import { environment } from "../../environments/environment";

@Injectable()
export class ActividadService extends RestClient<Actividad> {
    baseURL = environment.url+"actividad/";

    constructor(http: Http) {
        super(http);
    }

}