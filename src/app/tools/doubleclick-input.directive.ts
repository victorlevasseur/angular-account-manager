import { Directive, ElementRef, Input, Output, OnInit, AfterViewInit, HostListener, ContentChildren, EventEmitter } from '@angular/core';
const $ = require('jquery');

/**
 * This directive makes all the component inputs editable on double-clicks only.
 *
 * Dependencies: jquery
 */
@Directive({
  selector: '[aam-doubleclickInput]'
})
export class DoubleclickInputDirective implements AfterViewInit {

  managedInputs = new Array<any>();

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
      $(this.managedInputs[i]).off('dblclick').on('dblclick', ($event) => {
        this.blurElement($event.target);
        this.enableElement($event.target, true);
        this.focusElement($event.target);
      });

      // Register a blur event on the input
      $(this.managedInputs[i]).off('blur').on('blur', ($event) => {
        this.enableElement($event.target, false);
      });
    }
  }

/*  @HostListener('dblclick')
  onDblClicked() {
    // To force a call to the focus callback
    this.blurElement();
    this.enableElement(true);
    this.focusElement();
  }

  @HostListener('blur')
  onBlur() {
    this.enableElement(false);
  }*/

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
