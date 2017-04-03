import { Injectable, EventEmitter } from '@angular/core';

import { SelectableItemDirective } from './selectable-item.directive';

@Injectable()
export class SelectionService {

  selected: Set<any> = null;
  selectedChanged = new EventEmitter<Set<any>>();

  selectableItems = new Array<any>();

  constructor() {

  }

  setSelection(selected: Set<any>) {
    this.selected = selected;
    this.propagateSelectionChange();
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
      return this.selectableItems[firstIndex].trackBy;
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
      return this.selectableItems[firstIndex].trackBy;
    }
  }

  clearSelection() {
    this.selected.clear();
    this.propagateSelectionChange();
  }

  addToSelection(item): boolean {
    if(this.isSelected(item)) {
      return false;
    }
    this.selected.add(item);
    this.propagateSelectionChange();
    return true;
  }

  /**
   * Add the items in the interval [from, to]
   * to the selection.
   * Note: if "to" is before "from", there're inverted
   */
  addRangeToSelection(from, to): boolean {
    let itemsToSelect = [];
    console.log(from);
    console.log(to);

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
      this.selected.add(itemsToAdd[i]);
    }
    this.propagateSelectionChange();

    return true;
  }

  removeFromSelection(item): boolean {
    this.selected.delete(item);
    return false;
  }

  selectAll() {
    this.selected = new Set(this.selectableItems.slice());
    this.propagateSelectionChange();
  }

  private propagateSelectionChange() {
    this.selectedChanged.emit(this.selected);
  }
}
