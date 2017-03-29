import { Directive, ElementRef, Input, Output, OnInit, OnDestroy, AfterViewInit, EventEmitter } from '@angular/core';
const $ = require('jquery');

/**
 * This directive makes all the component inputs editable on double-clicks only.
 *
 * Dependencies: jquery
 */
@Directive({
  selector: '[aam-doubleclickInput]'
})
export class DoubleclickInputDirective implements AfterViewInit, OnDestroy {

  private managedInputs = new Array<any>();

  private dblClickEventHandler = ($event) => {
    this.blurElement($event.target);
    this.enableElement($event.target, true);
    this.focusElement($event.target);
  };

  private blurEventHandler = ($event) => {
    this.enableElement($event.target, false);
  }

  constructor(private el: ElementRef) {

  }

  ngAfterViewInit() {
    // Get all inputs in the component on which the directive acts.
    // It can be the component root DOM element or some of its children.
    if(this.el.nativeElement.tagName === 'INPUT') {
      this.managedInputs.push(this.el.nativeElement);
    }
    else {
      var childrenInputs = $(this.el.nativeElement).find('input');
      for(var i = 0; i < childrenInputs.length; ++i) {
        this.managedInputs.push(childrenInputs.get(i));
      }
    }

    for(var i = 0; i < this.managedInputs.length; ++i) {
      // Makes the input read-only
      this.enableElement(this.managedInputs[i], false);

      // Register a double click event on the input
      $(this.managedInputs[i]).off('dblclick').on('dblclick', this.dblClickEventHandler);

      // Register a blur event on the input
      $(this.managedInputs[i]).off('blur').on('blur', this.blurEventHandler);
    }
  }

  ngOnDestroy() {
    //Unbind all events to avoid leaks
    for(var i = 0; i < this.managedInputs.length; ++i) {
      $(this.managedInputs[i]).off('dblclick', this.dblClickEventHandler);
      $(this.managedInputs[i]).off('blur', this.blurEventHandler);
    }
  }

  private enableElement(element: any, enable: boolean) {
    element.readOnly = !enable;
  }

  private focusElement(element: any) {
    element.focus();
  }

  private blurElement(element: any) {
    element.blur();
  }
};
