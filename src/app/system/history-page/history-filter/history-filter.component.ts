import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'curat-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent implements OnInit {

  @Output() onFilterCancel = new EventEmitter<any>();
  @Output() onFilterApply = new EventEmitter<any>();
  @Input() categories : Category[] = [];

  selectedPeriod = 'd';
  selectedTypes = [];
  selectedCategories = [];

  timePeriod = [
    {type : 'd', label : 'день'},
    {type : 'w', label : 'неделя'},
    {type : 'M', label : 'месяц'}
  ]

  selectTypes = [
    {type : 'income', label : 'Доход'},
    {type : 'outcome', label : 'Расход'}
  ]

  constructor() { }

  ngOnInit() {
  }

  closeFilter(){
    this.selectedPeriod = 'd';
    this.selectedCategories = [];
    this.selectedTypes = [];
    this.onFilterCancel.emit()
  }

  calculateInputParams(field : string, checked : boolean, value : string){
    if(checked){
      this[field].indexOf(value) === -1 ? this[field].push(value) : null;
    } else {
      this[field] = this[field].filter(i => i !== value)
    }
  }

  handleChangeType({checked, value}){
    this.calculateInputParams('selectedTypes', checked, value)
  }

  handleChangeCategory({checked, value}){
    this.calculateInputParams('selectedCategories', checked, value)
  }

  applyFilter(){
    this.onFilterApply.emit({
      types: this.selectedTypes,
      categories : this.selectedCategories,
      period: this.selectedPeriod
    })
  }

}
