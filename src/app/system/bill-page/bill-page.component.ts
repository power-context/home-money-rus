import { Component, OnInit, OnDestroy } from '@angular/core';

import { BillService } from '../shared/services/bill.service';
import { combineLatest, Subscription } from 'rxjs';
import { Bill } from '../shared/models/bill.model';

//import { combineLatest } from 'rxjs/internal/operators/combineLatest';
//import { combineLatest } from 'rxjs/internal/operators/combineLatest';
//import { combineLatest } from 'rxjs/operators';
//import { combineLatest } from 'rxjs/observable/combineLatest';


@Component({
  selector: 'curat-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {

  constructor(private billService : BillService) { }

  sub1 : Subscription;
  sub2 : Subscription;
  isLoaded = true;

  currency : any;
  bill : Bill;

  ngOnInit() {
  this.isLoaded = false;
  this.sub1 = combineLatest(
    this.billService.getBill(),
    //this.billService.getFakeCurrency()
    this.billService.getCurrency()
    )
    .subscribe((data : [any, any]) => {
      this.bill = data[0],
      this.currency = data[1]
      this.isLoaded = true;
    //  console.log(this.currency)
    })
  }

  onRefresh(){
    this.isLoaded = false;
    this.sub2 = this.billService.getCurrency()
    //this.sub2 = this.billService.getFakeCurrency()
    .subscribe((currency : any) => {
      this.currency = currency;
      
    })
    setTimeout(()=>{
      this.isLoaded = true;
    }, 3000)
  }

  ngOnDestroy(){
    this.sub1.unsubscribe();
    if(this.sub2)
      this.sub2.unsubscribe();
  }
}

/*
export class BillPageComponent implements OnInit, OnDestroy {

    subscription: Subscription;

    constructor(private billService: BillService) { }

    ngOnInit() {
        this.subscription = combineLatest(
          this.billService.getBill(), 
          this.billService.getCurretncy())
          .subscribe((data: [Bill, any]) => {
            console.log(data);
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}

*/ 