

import {Http, Response} from '@angular/http';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


export class RestClient<T extends {id: number}> {
    baseURL: string;

    constructor(protected http: Http) {
    }

    create(obj: T) {
        console.log("post " + this.baseURL + " " + JSON.stringify(obj));
        return this.http.post(this.baseURL, obj)
            .map((res: Response) => res.json());
    }

    edit(obj: T) {
        let url = this.baseURL + obj.id;
        return this.http.put(url, obj)
            .map((res: Response) => res.json());
    }

    remove(id: number) {
        let url = this.baseURL + id;
        return this.http.delete(url)
            .map((res: Response) => res.json());
    }

    find(id: number): Observable<T> {
        let url = this.baseURL + id;
        return this.http.get(url)
            .map((res: Response) => res.json());
    }

    findAll(): Observable<Array<T>> {
        return this.http.get(this.baseURL)
            .map((res: Response) => res.json());
    }

    findRange(from: number, to: number): Observable<Array<T>> {
        return this.http.get(this.baseURL + from + '/' + to)
            .map((res: Response) => res.json());
    }

    count(): Observable<number> {
        return this.http.get(this.baseURL + 'count')
            .map((res: Response) => res.json());
    }
}