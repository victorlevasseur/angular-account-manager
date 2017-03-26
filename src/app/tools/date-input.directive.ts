import { Directive, ElementRef, Input, Output, OnChanges, HostListener, EventEmitter } from '@angular/core';

import * as moment from 'moment';
import Big = require('big.js/big');

@Directive({
  selector: '[appDateInput]',
  host: { 'class': 'date-input' }
})
export class DateInputDirective implements OnChanges {

  @Input('dateValue')
  value: moment.Moment;

  @Output('dateValueChange')
  valueChange: EventEmitter<moment.Moment>;

  focused = false;

  constructor(private el: ElementRef) {
    this.valueChange = new EventEmitter<Big>();
  }

  updateFromValue(withSuffix: boolean) {
    this.el.nativeElement.value = this.value.utc().format("DD/MM/YYYY");
  }

  ngOnChanges() {
    if(!this.focused) {
      this.updateFromValue(true);
    }
  }

  @HostListener("focus")
  inputFocused() {
    if(this.el.nativeElement.readOnly) {
      return;
    }
    this.focused = true;
    this.updateFromValue(false);
    this.el.nativeElement.select();
  }

  @HostListener("blur")
  inputUnfocused() {
    this.focused = false;
    var newDate = moment.utc(this.el.nativeElement.value, "DD/MM/YYYY");
    if(newDate.isValid())
      this.valueChange.emit(newDate);
    this.updateFromValue(true);
  }
}
