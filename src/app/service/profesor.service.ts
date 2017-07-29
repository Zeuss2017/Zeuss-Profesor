import {Http, Response} from '@angular/http';
import {Location} from '@angular/common';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {RestClient} from './rest-client';
import {Profesor} from '../model/profesor.model';

@Injectable()
export class ProfesorService extends RestClient<Profesor> {
    baseURL = "http://174.138.36.65:8080/Zeuss/webresources/profesor/";

    constructor(http: Http) {
        super(http);
    }
    
    asociarColPro(idColegio:number,username:string) {
        let url = this.baseURL +'asociarColPro/'+ idColegio+ '/' + username ;
        return this.http.get(url)
            .map((res: Response) => res.json());
    }
    veriUsername(username:string): Observable<number> {
        let url = this.baseURL +'veriUsername/'+ username ;
        return this.http.get(url)
            .map((res: Response) => res.json());
        
    }
}