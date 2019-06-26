import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseApi } from 'src/app/shared/core/base-api';
import { Observable } from 'rxjs';
import { CuratEvent } from '../models/event.model';

@Injectable()
export class EventsService extends BaseApi{
    constructor(public http : HttpClient){
        super(http);
    }

    addEvent(event : CuratEvent) : Observable<CuratEvent>{
        return this.post('events', event);
    }

    getEvents() : Observable<CuratEvent[]>{
        return this.get('events');
    }

    getEvent(id : string) : Observable<CuratEvent>{
        return this.get(`events/${id}`)
    }

}