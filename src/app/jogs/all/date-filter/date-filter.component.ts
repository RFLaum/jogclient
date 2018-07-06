import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { JogListService } from '../jog-list.service';
import { FormUtilitiesService } from '../../../misc/form-utilities.service'


// filter jogs by date
@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.css']
})
export class DateFilterComponent implements OnInit {
  @ViewChild("form") form: NgForm;

  constructor(private jogs: JogListService,
    private util: FormUtilitiesService) { }

  ngOnInit() {
  }

  // get value of the field with the given name. Renders null or undefined as
  // empty strings
  getValue(name: string): string {
    return this.util.parseAsString(this.form.value[name]);
  }
  get startDate(): string {
    return this.getValue("startDate");
  }
  get endDate(): string {
    return this.getValue("endDate");
  }

  onSubmit() {
    this.jogs.changeDates(this.startDate, this.endDate);
  }
  onReset() {
    this.jogs.changeDates("","");
  }

  // check if the submit button should be disabled
  disableSubmit(): boolean {
    return this.startDate == this.jogs.startDate &&
      this.endDate == this.jogs.endDate;
  }

}
