import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'curat-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.scss']
})
export class CurrencyCardComponent implements OnInit {

  @Input('currency') currency : any;
 // currencyes : string[] = ['USDRUB', 'EURRUB'];
 //currencyes : string[] = ['USD', 'AUD'];

  date = new Date();

  myUsd : number;
  myEuro : number;

  constructor() {}

  ngOnInit(){
  //  console.log(this.currency['rates']['USD'])
    this.myUsd = this.currency['rates']['RUB'] / this.currency['rates']['USD'];
    this.myEuro = this.currency['rates']['RUB'];
  }
  // рубль к доллару (0,015) = евро / доллар (1,3) * рубль к евро

}
