import { Directive, Input, Output, ContentChildren, QueryList, OnInit, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';

import { SelectableItemDirective } from './selectable-item.directive';
import { SelectionService } from './selection.service';

@Directive({
  selector: '[aam-selectableList]',
  providers: [SelectionService]
})
export class SelectableListDirective implements OnInit, OnChanges {

  @Input('aam-selectedItems')
  selectedItems = new Set<any>();

  @Output('aam-selectedItemsChange')
  selectedItemsChange = new EventEmitter<Set<any>>();

  @Input('aam-selectableModel')
  selectableItems: Array<any> = null;

  constructor(private selectionService: SelectionService) {
    selectionService.selectedChanged.subscribe((newSelection: Set<any>) => {
      this.onSelectionChanged(newSelection);
    });
  }

  ngOnInit() {
    //TODO: Throw if null
    this.selectionService.selectableItems = this.selectableItems;
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    if(changes.hasOwnProperty('selectedItems') && changes['selectedItems']) {
      this.selectionService.setSelection(changes['selectedItems'].currentValue);
    }
  }

  onSelectionChanged(newSelection: Set<any>) {
    this.selectedItems = newSelection;
    this.selectedItemsChange.next(newSelection);
  }
}
