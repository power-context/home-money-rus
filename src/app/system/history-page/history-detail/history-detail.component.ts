import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { EventsService } from '../../shared/services/events.service';
import { CategoriesService } from '../../shared/services/categories.service';
import { mergeMap } from 'rxjs/operators';
import { CuratEvent } from '../../shared/models/event.model';
import { Category } from '../../shared/models/category.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'curat-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit, OnDestroy {

  event : CuratEvent;
  category : Category;
  isLoaded : boolean = false;
  sub : Subscription;

  constructor(
    private route : ActivatedRoute,
    private eventService : EventsService,
    private categoriesService : CategoriesService
    ) { }

  ngOnInit() {
    this.sub = this.route.params
    .pipe(mergeMap((params : Params) => {
      return this.eventService.getEvent(params['id'])
    }))
    .pipe(mergeMap((event : CuratEvent) => {
      this.event = event;
      return this.categoriesService.getCategoryById(event.category)
    }))
    .subscribe((category : Category) => {
      this.category = category;
      this.isLoaded = true;
    })

  }
  
  ngOnDestroy(){
    if(this.sub) this.sub.unsubscribe();
  }

}
