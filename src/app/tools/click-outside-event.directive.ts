import { Directive, EventEmitter, Output, ElementRef } from '@angular/core';

@Directive({
  selector: '[aam-click-outside-event]',
  host: {
    '(document:click)': 'handleClick($event)',
  },
})
export class ClickOutsideEventDirective {
  @Output()
  clickOutside = new EventEmitter<MouseEvent>();

  constructor(private el: ElementRef) {

  }

  private handleClick(event: MouseEvent) {
    var clickedElement: any = event.target;

    do {
      if(this.el.nativeElement === clickedElement) {
        return; // The click was inside, return
      }
      clickedElement = clickedElement.parentNode;
    } while(clickedElement);

    // The click is outside, call the @Output
    this.clickOutside.next(event);
  }
}
