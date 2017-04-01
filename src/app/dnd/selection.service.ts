import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class SelectionService {

  selected: Array<any> = null;
  selectedChanged = new EventEmitter<Array<any>>();

  constructor() {

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

  clearSelection() {
    this.selected.length = 0;
    this.propagateSelectionChange();
  }

  addToSelection(item): boolean {
    if(this.isSelected(item)) {
      return false;
    }
    this.selected.push(item);
    this.propagateSelectionChange();
    return true;
  }

  removeFromSelection(item): boolean {
    for(var i = 0; i < this.selected.length; ++i) {
      if(this.selected[i] === item) {
        this.selected.splice(i, 1);
        this.propagateSelectionChange();
        return true;
      }
    }
    return false;
  }

  private propagateSelectionChange() {
    this.selectedChanged.next(this.selected);
  }
}
