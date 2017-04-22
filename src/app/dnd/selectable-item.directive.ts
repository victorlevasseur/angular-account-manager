import {
  Directive,
  Input,
  Output,
  Optional,
  HostListener,
  HostBinding,
  EventEmitter,
  OnInit,
  OnDestroy,
  OnChanges,
  ElementRef,
  Renderer2,
  SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { SelectionService, SelectionStateChangeInfo } from './selection.service';

@Directive({
  selector: '[aam-selectableItem]'
})
export class SelectableItemDirective implements OnInit, OnDestroy, OnChanges {

  @Input('aam-trackBy')
  trackBy: any = null;

  @Input('aam-selectedClass')
  selectedClass: string = 'selected';

  private selected$Sub: Subscription;

  constructor(public el: ElementRef, private renderer: Renderer2, private selectionService: SelectionService) {
    this.selected$Sub = selectionService.selected$
      .filter((info: SelectionStateChangeInfo, index: number): boolean => {
        return info.item === this.trackBy;
      })
      .map((info: SelectionStateChangeInfo) => {
        return info.selected;
      }).subscribe((selected: boolean) => {
        this.addSelectedClass(selected);
      });
  }

  private addSelectedClass(select: boolean) {
    if(select) {
      this.renderer.addClass(this.el.nativeElement, this.selectedClass);
    }
    else {
      this.renderer.removeClass(this.el.nativeElement, this.selectedClass);
    }
  }

  ngOnInit() {
    //this.addSelectedClass(this.selectionService.isSelected(this.trackBy));
  }

  ngOnDestroy() {
    this.selectionService.select(this.trackBy, false);
    this.selected$Sub.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['trackBy'] && !changes['trackBy'].isFirstChange()) {
      let oldTrackBy = changes['trackBy'].previousValue;
      let newTrackBy = changes['trackBy'].currentValue;

      if(this.selectionService.isSelected(oldTrackBy)) {
        this.selectionService.select(oldTrackBy, false);
        this.selectionService.select(newTrackBy);
      }

      this.addSelectedClass(this.selectionService.isSelected(newTrackBy));
    }
  }

  @HostListener('mousedown', ['$event'])
  onClick(event: MouseEvent) {
    let latestSelected = this.selectionService.getFirstSelectableSelected(); // Need to keep it before maybe cleaning the selection

    if(!event.ctrlKey) {
      this.selectionService.clearSelection();
    }

    if(event.ctrlKey && this.selectionService.isSelected(this.trackBy)) {
      this.selectionService.select(this.trackBy, false);
    }
    else if(event.shiftKey) { //TODO: Improve shift selection logic
      this.selectionService.addRangeToSelection(latestSelected, this.trackBy);
    }
    else {
      this.selectionService.select(this.trackBy);
    }
  }
}
