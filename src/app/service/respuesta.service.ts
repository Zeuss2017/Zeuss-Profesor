import {Http, Response} from '@angular/http';
import {Location} from '@angular/common';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {RestClient} from './rest-client';
import {Respuesta} from '../model/respuesta.model';

@Injectable()
export class RespuestaService extends RestClient<Respuesta> {
    baseURL = "http://174.138.36.65:8080/Zeuss/webresources/respuesta/";

    constructor(http: Http) {
        super(http);
    }

}
