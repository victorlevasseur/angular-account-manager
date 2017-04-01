import {
  Directive,
  Input,
  Output,
  HostListener,
  EventEmitter,
  OnDestroy,
  OnChanges,
  SimpleChanges } from '@angular/core';

import { SelectionService } from './selection.service';

@Directive({
  selector: '[aam-selectableItem]'
})
export class SelectableItemDirective implements OnDestroy, OnChanges {

  @Input('aam-trackBy')
  trackBy: any;

  @Output('aam-selectStateChange')
  selectedChange = new EventEmitter<boolean>();

  constructor(private selectionService: SelectionService) {
    selectionService.selectedChanged.subscribe(() => {
      this.onSelectionChanged();
    });
  }

  ngOnDestroy() {
    this.selectionService.removeFromSelection(this.trackBy);
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

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    if(!event.ctrlKey) {
      this.selectionService.clearSelection();
    }

    if(event.ctrlKey && this.selectionService.isSelected(this.trackBy)) {
      this.selectionService.removeFromSelection(this.trackBy);
    }
    else {
      this.selectionService.addToSelection(this.trackBy);
    }
  }

  private onSelectionChanged() {
    this.selectedChange.next(this.selectionService.isSelected(this.trackBy));
  }
}
