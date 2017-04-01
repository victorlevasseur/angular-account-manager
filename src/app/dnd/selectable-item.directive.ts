import { Directive, Input, Output, HostListener, OnInit, EventEmitter } from '@angular/core';

import { SelectionService } from './selection.service';

@Directive({
  selector: '[aam-selectableItem]'
})
export class SelectableItemDirective {

  @Input('aam-trackBy')
  trackBy: any;

  @Output('aam-selectStateChange')
  selectedChange = new EventEmitter<boolean>();

  constructor(private selectionService: SelectionService) {
    selectionService.selectedChanged.subscribe(() => {
      this.onSelectionChanged();
    });
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

  onSelectionChanged() {
    this.selectedChange.next(this.selectionService.isSelected(this.trackBy));
  }
}
