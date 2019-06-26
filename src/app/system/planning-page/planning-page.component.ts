import { Component, OnInit, Injectable, OnDestroy } from '@angular/core';
import { BillService } from '../shared/services/bill.service';
import { CategoriesService } from '../shared/services/categories.service';
import { EventsService } from '../shared/services/events.service';
import { Observable, Subscription } from 'rxjs';
import { combineLatest } from 'rxjs';
import { Bill } from '../shared/models/bill.model';
import { Category } from '../shared/models/category.model';
import { CuratEvent } from '../shared/models/event.model';

//@Injectable({ providedIn: 'root' })

@Component({
  selector: 'curat-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.scss']
})
export class PlanningPageComponent implements OnInit, OnDestroy {

  isLoaded : boolean = false;
  bill : Bill;
  categories : Category[] = [];
  events : CuratEvent[] = [];
  sub : Subscription;

  constructor(
    private billService : BillService, 
    private categoriesService : CategoriesService,
    private eventService : EventsService) { }

  ngOnInit() {
    this.sub = combineLatest(
      this.billService.getBill(),
      this.categoriesService.getCategories(),
      this.eventService.getEvents()
    ).subscribe((data : [Bill, Category[], CuratEvent[]]) => {
      this.bill = data[0],
      this.categories = data[1],
      this.events = data[2]

      this.isLoaded = true;
    })
  }

  getCategoryCost(cat : Category) : number{
    const catEvents = this.events.filter(e => e.category === cat.id && e.type === 'outcome')

    return catEvents.reduce((total, e) => {
      total += e.amount;
      return total
    }, 0)
  }

  private getPercent(cat : Category) : number{
    const percent = ( 100 * this.getCategoryCost(cat) / cat.capacity )
    return percent > 100 ? 100 : percent
  }

  getCatPercent(cat : Category) : string {
    return this.getPercent(cat) + '%'
  }

  getCatColorClass(cat : Category) : string {
    const percent = this.getPercent(cat);
    return percent < 60 ? 'success' : percent >= 100 ? 'danger' : 'warning'
  }

  ngOnDestroy(){
    if(this.sub) this.sub.unsubscribe();
  }

}
