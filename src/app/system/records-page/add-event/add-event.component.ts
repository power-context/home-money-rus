import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Category } from '../../shared/models/category.model';
import { NgForm } from '@angular/forms';
import { CuratEvent } from '../../shared/models/event.model';
import * as moment from 'moment';
import { EventsService } from '../../shared/services/events.service';
import { BillService } from '../../shared/services/bill.service';
import { Bill } from '../../shared/models/bill.model';
import { Message } from 'src/app/shared/models/message.model';
import { mergeMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'curat-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit, OnDestroy {

  @Input() categories : Category[] = [];
  message : Message;
  sub1 : Subscription;
  sub2 : Subscription;

  types = [
    {type: 'income', label: 'Доход'},
    {type: 'outcome', label: 'Расход'}
  ]

  constructor(
    private eventService : EventsService,
    private billService : BillService
    ) { }

  ngOnInit() {
    this.message = new Message('danger', '');
  }

  private showMessage(text : string) {
    this.message.text = text;
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000)
  }

  onSubmit(form : NgForm){
    let {amount, description, category, type} = form.value;

    if(amount < 0) amount *= -1;

    const event = new CuratEvent(type, amount, +category, 
      moment().format('DD.MM.YYYY HH:MM:SS'), description);

    this.billService.getBill()
    .subscribe((bill : Bill) => {
      let value = 0;
      if(type === 'outcome'){
        if(amount > bill.value){
          //error
          this.showMessage(`На счету недостаточно средств. 
          Вам нехватает ${amount - bill.value} руб.`)
          return;
        } else {
          value = bill.value - amount;
        }
      } else {
        value = bill.value + amount;
      }

      this.billService.updateBill({value, currency : bill.currency})
      .pipe(mergeMap(() => {
        return this.eventService.addEvent(event)
      }))
      .subscribe();
    })

    form.setValue({
      amount : 0,
      description : ' ',
      category : 1,
      type: 'outcome'
    })
  }

  ngOnDestroy(){
    if(this.sub1) this.sub1.unsubscribe();
    if(this.sub2) this.sub2.unsubscribe();
  }

}
