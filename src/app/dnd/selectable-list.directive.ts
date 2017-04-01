import { Directive, Input, ContentChildren, QueryList, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';

import { SelectableItemDirective } from './selectable-item.directive';
import { SelectionService } from './selection.service';

@Directive({
  selector: '[aam-selectableList]',
  providers: [SelectionService]
})
export class SelectableListDirective implements OnChanges {

  @Input('aam-selectedItems')
  selectedItems = new Array<any>();

  @Input('aam-selectedItemsChange')
  selectedItemsChange = new EventEmitter<Array<any>>();

  @ContentChildren('[aam-selectableItem]')
  selectableItems: QueryList<SelectableItemDirective>;

  constructor(private selectionService: SelectionService) {
    selectionService.selectedChanged.subscribe((newSelection: Array<any>) => {
      this.onSelectionChanged(newSelection);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.hasOwnProperty('selectedItems') && changes['selectedItems']) {
      this.selectionService.selected = changes['selectedItems'].currentValue;
    }
  }

  onSelectionChanged(newSelection: Array<any>) {
    this.selectedItems = newSelection;
    this.selectedItemsChange.next(newSelection);
  }
}
