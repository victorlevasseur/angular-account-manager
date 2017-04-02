import {
  Directive,
  Input,
  Output,
  Optional,
  HostListener,
  EventEmitter,
  OnInit,
  OnDestroy,
  OnChanges,
  ElementRef,
  SimpleChanges } from '@angular/core';

import { SelectionService } from './selection.service';
import { SelectableItemDirectivesListerService } from './selectable-item-directives-lister.service';

@Directive({
  selector: '[aam-selectableItem]'
})
export class SelectableItemDirective implements OnInit, OnDestroy, OnChanges {

  @Input('aam-trackBy')
  trackBy: any;

  @Output('aam-selectStateChange')
  selectedChange = new EventEmitter<boolean>();

  constructor(public el: ElementRef, private selectionService: SelectionService, @Optional() private lister: SelectableItemDirectivesListerService) {
    selectionService.selectedChanged.subscribe(() => {
      this.onSelectionChanged();
    });
  }

  ngOnInit() {
    if(this.lister) {
      this.lister.registerDirective(this);
    }
  }

  ngOnDestroy() {
    this.selectionService.removeFromSelection(this.trackBy);
    if(this.lister) {
      this.lister.unregisterDirective(this);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.hasOwnProperty('trackBy') && changes['trackBy'] && !changes['trackBy'].isFirstChange()) {
      let oldTrackBy = changes['trackBy'].previousValue;
      let newTrackBy = changes['trackBy'].currentValue;

      if(this.selectionService.isSelected(oldTrackBy)) {
        this.selectionService.removeFromSelection(oldTrackBy);
        this.selectionService.addToSelection(newTrackBy);
      }
    }
  }

  @HostListener('mousedown', ['$event'])
  onClick(event: MouseEvent) {
    let latestSelected = this.selectionService.getLatestSelected(); // Need to keep it before maybe cleaning the selection

    if(!event.ctrlKey) {
      this.selectionService.clearSelection();
    }

    if(event.ctrlKey && this.selectionService.isSelected(this.trackBy)) {
      this.selectionService.removeFromSelection(this.trackBy);
    }
    else if(event.shiftKey) {
      this.selectionService.addRangeToSelection(latestSelected, this.trackBy);
    }
    else {
      this.selectionService.addToSelection(this.trackBy);
    }
  }

  private onSelectionChanged() {
    this.selectedChange.next(this.selectionService.isSelected(this.trackBy));
  }
}
