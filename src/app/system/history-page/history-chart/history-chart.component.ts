import { Component, Input } from '@angular/core';

@Component({
  selector: 'curat-history-chart',
  templateUrl: './history-chart.component.html',
  styleUrls: ['./history-chart.component.scss']
})
export class HistoryChartComponent {

  @Input() data;

  constructor() { }

}
