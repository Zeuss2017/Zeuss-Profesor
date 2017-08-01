import { environment } from './../../environments/environment';
import {Http, Response} from '@angular/http';
import {Location} from '@angular/common';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {RestClient} from './rest-client';
import {Curso} from '../model/curso.model';

@Injectable()
export class CursoService extends RestClient<Curso> {
    baseURL = environment.url+"curso/";

    constructor(http: Http) {
        super(http);
    }
    findByUsername(username:string) {
        let url = this.baseURL +'findByUsername/'+ username ;
        return this.http.get(url)
            .map((res: Response) => res.json());
        
    }
    
    create(obj: Curso) {
        console.log("post " + this.baseURL + " " + JSON.stringify(obj));
        return this.http.post(this.baseURL + "create", obj)
            .map((res: Response) => res.json());
    }
    asociarProCurso(cursoId: number, username: string) {
        let url = this.baseURL + 'asociarProCurso/' + cursoId + '/' + username;
        return this.http.get(url)
            .map((res: Response) => res.json());
    }

}