import { Component, OnInit, Input } from '@angular/core';

import { Week } from '../week.model';
@Component({
  selector: 'app-show-week',
  templateUrl: './show-week.component.html',
  styleUrls: ['./show-week.component.css']
})
export class ShowWeekComponent implements OnInit {
  @Input() week: Week;

  constructor() { }

  ngOnInit() {
  }

}
