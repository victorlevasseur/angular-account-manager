import {
  Injectable,
  EventEmitter
} from '@angular/core';

export class ColumnsSizesService {
  private sizes: Map<string, number>;
  sizesChange = new EventEmitter<void>();

  private defaultSize = 150;

  constructor() {

  }

  getSize(column: string): number {
    if(this.sizes.has(column)) {
      return this.sizes.get(column);
    }
    else {
      return this.defaultSize;
    }
  }

  setSize(column: string, size: number): void {
    this.sizes.set(column, size);
    this.updateSizes();
  }

  get(): Map<string, number> {
    return this.sizes;
  }

  set(sizes: Map<string, number>): void {
    this.sizes = sizes;
    this.updateSizes();
  }

  private updateSizes() {
    this.sizesChange.emit();
  }
}
