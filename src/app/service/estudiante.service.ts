import {Http, Response} from '@angular/http';
import {Location} from '@angular/common';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {RestClient} from './rest-client';
import {Estudiante} from '../model/estudiante.model';

@Injectable()
export class EstudianteService extends RestClient<Estudiante> {
    baseURL = "http://localhost:8080/Zeuss-Servidor/webresources/estudiante/";

    constructor(http: Http) {
        super(http);
    }
    
    findByCurso(id:number) {
        let url = this.baseURL +'findByCurso/'+ id ;
        return this.http.get(url)
            .map((res: Response) => res.json());
        
    }

}