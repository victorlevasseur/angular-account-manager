import {
  Directive,
  Input,
  Output,
  OnInit,
  OnChanges,
  SimpleChanges,
  EventEmitter
} from '@angular/core';

import { ColumnsSizesService } from './columns-sizes.service';

@Directive({
  selector: '[columns-container]',
  providers: [ColumnsSizesService]
})
export class ColumnsContainerDirective implements OnInit, OnChanges {

  @Input()
  columnsSizes: [string, number][];

  @Output()
  columnsSizesChange = new EventEmitter<[string, number][]>();

  constructor(private columnsSizesService: ColumnsSizesService) {
    this.columnsSizesService.sizesChange.subscribe(() => {
      let newColumnsSizes: [string, number][] = [];
      for(let entry of this.columnsSizesService.get().entries()) {
        newColumnsSizes.push(entry);
      }
      this.columnsSizesChange.emit(newColumnsSizes);
    })
  }

  ngOnInit() {
    this.updateColumnsSizesFromInput();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updateColumnsSizesFromInput();
  }

  updateColumnsSizesFromInput() {
    this.columnsSizesService.set(new Map<string, number>(this.columnsSizes));
  }

  //TODO: OnChanges
}
