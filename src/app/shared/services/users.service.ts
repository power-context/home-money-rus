import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {  User } from '../models/user.model';
import { Injectable } from '@angular/core';
import { BaseApi } from '../core/base-api';

@Injectable({
    providedIn: 'root'
})

export class UsersService extends BaseApi{
    constructor(public http: HttpClient){
        super(http);
    }

    getUserByEmail(email : string) : Observable<any>{
        return this.get(`users?email=${email}`)   
        .pipe(map( (user : User[]) => { return user[0] ? user[0] : undefined }) )
    }

    createNewUser(user : User) : Observable<any>{
        return this.post('users', user)
    }


    // getUserByEmail(email : string) : Observable<any>{
    //     return this.http.get(`http://localhost:3000/users?email=${email}`)   
    //     .pipe(map( (data) => { return data } ))
    //     .pipe(map( (user : User[]) => { return user[0] ? user[0] : undefined }) )
    // }

    // createNewUser(user : User) : Observable<any>{
    //     return this.http.post('http://localhost:3000/users', user)
    //     .pipe(map( (data) => { return data } ))
    // }
}

//должен быть тип <User>