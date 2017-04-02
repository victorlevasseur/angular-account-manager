import { Injectable, EventEmitter } from '@angular/core';

import { SelectableItemDirective } from './selectable-item.directive';

@Injectable()
export class SelectionService {

  selected: Array<any> = null;
  selectedChanged = new EventEmitter<Array<any>>();

  selectableItems = new Array<any>();
  selectableDirectives = new Array<SelectableItemDirective>();

  constructor() {

  }

  registerSelectableItemDirective(directive: SelectableItemDirective) {
    this.selectableDirectives.push(directive);
  }

  unregisterSelectableItemDirective(directive: SelectableItemDirective) {
    let index = this.selectableDirectives.indexOf(directive);
    if(index !== -1) {
      this.selectableDirectives.splice(index, 1);
    }
  }

  setSelection(selected: Array<any>) {
    this.selected = selected;
    this.propagateSelectionChange();
  }

  isSelected(item): boolean {
    for(var i = 0; i < this.selected.length; ++i) {
      if(this.selected[i] === item) {
        return true;
      }
    }
    return false;
  }

  getSelectedCount(): number {
    return this.selected.length;
  }

  getSelected(i: number) {
    return this.selected[i];
  }

  getLatestSelected() {
    if(this.selected.length == 0) {
      return null;
    }

    return this.selected[this.selected.length - 1];
  }

  getEarliestSelected() {
    if(this.selected.length == 0) {
      return null;
    }

    return this.selected[0];
  }

  getFirstSelectableSelected() {
    if(this.selected.length === 0) {
      return null;
    }

    let firstIndex = this.selectableItems.indexOf(this.selected[0]);
    for(let i = 1; i < this.selected.length; ++i) {
      let index = this.selectableItems.indexOf(this.selected[i]);
      if(index < firstIndex) {
        firstIndex = index;
      }
    }

    return firstIndex;
  }

  getLastSelectableSelected() {
    if(this.getSelectedCount() === 0) {
      return null;
    }

    let lastIndex = this.selectableItems.indexOf(this.selected[0]);
    for(let i = 1; i < this.selected.length; ++i) {
      let index = this.selectableItems.indexOf(this.selected[i]);
      if(index > lastIndex) {
        lastIndex = index;
      }
    }

    return lastIndex;
  }

  clearSelection() {
    let previousSelected = this.selected.slice();
    this.selected.length = 0;
    this.propagateSelectionChange();
    this.notifyItems(previousSelected);
  }

  addToSelection(item): boolean {
    if(this.isSelected(item)) {
      return false;
    }
    this.selected.push(item);
    this.propagateSelectionChange();
    this.notifyItems([item]);
    return true;
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
    this.selected = this.selected.concat(itemsToAdd);
    this.propagateSelectionChange();
    this.notifyItems(itemsToAdd);

    return true;
  }

  removeFromSelection(item): boolean {
    for(var i = 0; i < this.selected.length; ++i) {
      if(this.selected[i] === item) {
        this.selected.splice(i, 1);
        this.notifyItems([item]);
        return true;
      }
    }
    return false;
  }

  selectAll() {
    this.selected = this.selectableItems.slice();
    this.propagateSelectionChange();
    this.notifyAllItems();
  }

  private propagateSelectionChange() {
    this.selectedChanged.next(this.selected);
  }

  private notifyItems(items: Array<any>) {
    for(let i = 0; i < this.selectableDirectives.length; ++i) {
      let directive = this.selectableDirectives[i];
      if(items.indexOf(directive.trackBy) !== -1) {
        directive.notifySelectionChanged(this.isSelected(directive.trackBy));
      }
    }
  }

  private notifyAllItems() {
    for(let i = 0; i < this.selectableDirectives.length; ++i) {
      let directive = this.selectableDirectives[i];
      directive.notifySelectionChanged(this.isSelected(directive.trackBy));
    }
  }
}
