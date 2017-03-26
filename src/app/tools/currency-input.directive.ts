import { Directive, ElementRef, Input, Output, OnChanges, HostListener, EventEmitter } from '@angular/core';

import Big = require('big.js/big');

@Directive({
  selector: '[appCurrencyInput]',
  host: { 'class': 'currency' }
})
export class CurrencyInputDirective implements OnChanges {

  @Input('currencyValue')
  value: Big;

  @Output('currencyValueChange')
  valueChange: EventEmitter<Big>;

  focused = false;

  constructor(private el: ElementRef) {
    this.valueChange = new EventEmitter<Big>();
  }

  updateFromValue(withSuffix: boolean) {
    this.el.nativeElement.value = this.value.toFixed(2) + (withSuffix ? ' €' : '');
  }

  ngOnChanges() {
    if(!this.focused) {
      this.updateFromValue(true);
    }
  }

  @HostListener("input")
  inputValueChanged() {
    if(this.el.nativeElement.value !== '') {
      try {
        var newValue = new Big(this.el.nativeElement.value);
        this.valueChange.emit(newValue);
      }
      catch(err) { }
    }
    else {
      this.valueChange.emit(new Big(0));
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
    this.updateFromValue(true);
  }
}
