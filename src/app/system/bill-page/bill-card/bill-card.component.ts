import { Component, OnInit, Input } from '@angular/core';
import { Bill } from '../../shared/models/bill.model';

@Component({
  selector: 'curat-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss']
})
export class BillCardComponent implements OnInit {

  @Input('currency') currency : any;
  @Input('bill') bill : Bill;

  dollar : number;
  euro : number;

  constructor() { }

  ngOnInit() {
    this.dollar = this.bill.value / this.currency['rates']['RUB'] * this.currency['rates']['USD'];
   // this.dollar = this.bill.value * this.currency['RUBUSD'];
   // this.euro = this.bill.value * this.currency['RUBEUR'];
    this.euro = this.bill.value / this.currency['rates']['RUB'];
  }

}
