import { environment } from './../../environments/environment';
import {Http, Response} from '@angular/http';
import {Location} from '@angular/common';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {RestClient} from './rest-client';
import {Colegio} from '../model/colegio.model';

@Injectable()
export class ColegioService extends RestClient<Colegio> {
    baseURL =environment.url+"colegio/";

    constructor(http: Http) {
        super(http);
    }

}