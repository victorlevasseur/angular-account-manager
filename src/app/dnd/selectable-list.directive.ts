import { Directive, Input, Output, ContentChildren, QueryList, OnInit, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';

import { SelectableItemDirective } from './selectable-item.directive';
import { SelectionService, SelectionStateChangeInfo } from './selection.service';

@Directive({
  selector: '[aam-selectableList]'
})
export class SelectableListDirective implements OnInit, OnChanges {

  @Input('aam-selectableModel')
  selectableItems: Array<any> = null;

  constructor(private selectionService: SelectionService) {
    selectionService.selected$.subscribe((newSelection: SelectionStateChangeInfo) => {
      this.onSelectionChanged(this.selectionService.selected);
    });
  }

  ngOnInit() {
    //TODO: Throw if null
    this.selectionService.selectableItems = this.selectableItems;
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['selectedItems']) {
      this.selectionService.setSelection(changes['selectedItems'].currentValue);
    }
  }

  onSelectionChanged(newSelection: Set<any>) {
    /*this.selectedItems = newSelection;
    this.selectedItemsChange.next(newSelection);*/
  }
}
