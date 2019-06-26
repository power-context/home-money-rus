import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { Bill } from '../models/bill.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseApi } from 'src/app/shared/core/base-api';
import { Bill } from '../models/bill.model';

@Injectable({
    providedIn: 'root'
})
export class BillService extends BaseApi {
    constructor(
        public http: HttpClient
        ) {
        super(http);
    }

    getBill() : Observable<any> {
        return this.get('bill');
    }

    updateBill(bill : Bill) : Observable<Bill>{
        return this.put('bill', bill);
    }

    // getBill(): Observable<any> {
    //     return this.http.get('http://localhost:3000/bill')
    //         .pipe(map((data) => { return data }))
    // }

    // // //Должен быть тип Bill - тут правильный запрос к API, но он не работает пока
    // // // getCurrency(pairs: string = 'RUBUSD'): Observable<any> {
    // // //     const apiKey: string = '592201f6a3b71816cce5960748b29398';
    // // //     return this.http.jsonp
    // // //         (`https://currate.ru/api/?get=rates&pairs=${pairs}&key=${apiKey}&?callback=JSONP_CALLBACK`, )
    // // //         .pipe(map((data) => { return data }))
    // // // }

    // requestJsonp(url, callback = 'callback') {
    //     return this.httpClient.jsonp(this.heroesURL, callback);
    //    }

    // // //Тестирую JSONP
     getCurrency(pairs: string = 'USD'): Observable<any> {
        // const apiKey: string = '592201f6a3b71816cce5960748b29398';
        // const callback : string = 'callback';
        //const callback : string = 'JSONP_CALLBACK';
        // const callBack : string = '__ng_jsonp__.__req0.finished';
        // const callback : string = 'ng_jsonp_callback_0({})';
        // const callback : string = '';
        // const apiUrl : string = 'https://www.cbr-xml-daily.ru/daily_jsonp.js';

        const apiUrl : string = 'http://data.fixer.io/api/latest?access_key=52245cc8e89ebc338aa0f7b216aec94b&format=1';

        // const apiUrl : string = `https://currate.ru/api/?get=rates&pairs=${pairs}&key=${apiKey}`;
        // return this.http.jsonp(apiUrl, callBack);
         return this.http.jsonp (apiUrl, 'callback')
        // .pipe(map((data) => {
        //     return data
        // }))
     }
/**
 * 
 * requestJsonp(url, callback = 'callback') {
 return this.httpClient.jsonp(this.heroesURL, callback);
}
 * 
 */

    getFakeCurrency(pairs : string = 'getFakeData') : Observable<any> {
        return this.http.get(`http://localhost:3000/fakeAPI?pairs=${pairs}`)
        .pipe(map((data) => {
            return data
        }))
        .pipe(map((finalData) => {
            return finalData[0]
        }))
    }

}