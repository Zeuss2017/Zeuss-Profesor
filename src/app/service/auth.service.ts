import {Http, Response} from '@angular/http';
import {Location} from '@angular/common';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService  {
    baseURL = "http://localhost:8080/Zeuss-Servidor/webresources/auth/";

    constructor(private http: Http) {
    }
    
    login(username: string, contrasena: string): Observable<string> {
        let url = this.baseURL + 'login';
        return this.http.post(url, {username: username, contrasena: contrasena})
            .map((res: Response) => res.json());
    }
    
    logout(): Observable<string> {
        let url = this.baseURL + 'logout';
        return this.http.get(url)
            .map((res: Response) => res.text());
    }
    
    
    
    loggedUsername() : Observable<string> {
        let url = this.baseURL + 'logged-username';
        return this.http.get(url)
            .map((res: Response) => res.text());
    }

}


