import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class BaseApi{
//    private baseUrl = 'http://localhost:3000/';
    private baseUrl = 'http://195.161.62.85:3000/';
    constructor(public http : HttpClient){}

    private getUrl(url : string = '') : string{
        return this.baseUrl + url;
    }

    public get(url : string = '') : Observable<any>{
        return this.http.get(this.getUrl(url))
        .pipe(map((data) => {return data}))
        //I think, url can will be in ``
    }

    public post(url : string = '', data : any = {}) : Observable<any>{
        return this.http.post(this.getUrl(url), data)
        .pipe(map((data) => { return data }))
    }

    public put(url : string = '', data : any = {}) : Observable<any>{
        return this.http.put(this.getUrl(url), data)
        .pipe(map((data) => {return data}))
    }
}