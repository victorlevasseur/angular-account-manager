import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { SelectableItemDirective } from './selectable-item.directive';

export interface SelectionStateChangeInfo {
  item: any;
  selected: boolean;
}

@Injectable()
export class SelectionService {

  selected = new Set<any>();

  private notifySelection = new Subject<SelectionStateChangeInfo>();
  selected$ = this.notifySelection.share();

  selectableItems = new Array<any>();

  constructor() {
    this.selected$.subscribe((info: SelectionStateChangeInfo) => {
      if(info.selected) {
        this.selected.add(info.item);
      }
      else {
        this.selected.delete(info.item);
      }
    });
  }

  select(item: any, select = true) {
    this.notifySelection.next({
      item: item,
      selected: select
    });
  }

  clearSelection() {
    while(this.selected.size > 0) {
      let firstItem = this.selected.values().next().value;
      this.select(firstItem, false);
    }
  }

  setSelection(selected: Iterable<any>) {
    this.clearSelection();
    for(let item of selected) {
      this.select(item);
    }
  }

  isSelected(item): boolean {
    return this.selected.has(item);
  }

  getSelectedCount(): number {
    return this.selected.size;
  }

  getFirstSelectableSelected() {
    if(this.selected.size === 0) {
      return null;
    }

    let firstIndex = NaN;
    for (let item of this.selected.values()) {
      let index = this.selectableItems.indexOf(item);
      if(isNaN(firstIndex) || index < firstIndex) {
        firstIndex = index;
      }
    }

    if(isNaN(firstIndex)) {
      return null;
    }
    else {
      return this.selectableItems[firstIndex];
    }
  }

  getLastSelectableSelected() {
    if(this.selected.size === 0) {
      return null;
    }

    let firstIndex = NaN;
    for (let item of this.selected.values()) {
      let index = this.selectableItems.indexOf(item);
      if(isNaN(firstIndex) || index > firstIndex) {
        firstIndex = index;
      }
    }

    if(isNaN(firstIndex)) {
      return null;
    }
    else {
      return this.selectableItems[firstIndex];
    }
  }

  /**
   * Add the items in the interval [from, to]
   * to the selection.
   * Note: if "to" is before "from", there're inverted
   */
  addRangeToSelection(from, to): boolean {
    let itemsToSelect = [];

    let startPos = this.selectableItems.indexOf(from);
    let endPos = this.selectableItems.indexOf(to);
    if(startPos === -1 || endPos === -1) {
      return false;
    }
    if(startPos > endPos) {
      [startPos, endPos] = [endPos, startPos];
    }

    let itemsToAdd = this.selectableItems.slice(startPos, endPos+1);
    for(let i = 0; i < itemsToAdd.length; ++i) {
      this.select(itemsToAdd[i]);
    }

    return true;
  }

  selectAll() {
    this.setSelection(this.selectableItems);
  }
}
