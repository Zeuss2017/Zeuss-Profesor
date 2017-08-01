import {Http, Response} from '@angular/http';
import {Location} from '@angular/common';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {RestClient} from './rest-client';
import {ResultadoAct} from '../model/resultadoact.model';
import { environment } from "../../environments/environment";

@Injectable()
export class ResultadoActService extends RestClient<ResultadoAct> {
    baseURL =  environment.url+"resultadoact";

    constructor(http: Http) {
        super(http);
    }

}
