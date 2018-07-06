//manage page navigation for multi-page lists

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() numPages: number;
  @Input() page: number;
  @Output() pageChange = new EventEmitter<number>();

  private get pageWrap(): number { return this.page; }
  private set pageWrap(newVal: number) {
    this.page = newVal;
    this.pageChange.emit(newVal);
  }

  constructor() { }

  ngOnInit() {
  }

  adjustPage(increment: number){
    this.page += increment;
    this.pageChange.emit(this.page);
  }
}
