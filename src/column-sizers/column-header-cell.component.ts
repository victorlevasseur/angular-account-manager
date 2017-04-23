import {
  Component,
  Input
} from '@angular/core';

import { ColumnCellDirective } from './column-cell.directive';
import { ColumnsSizesService } from './columns-sizes.service';

@Component({
  selector: 'column-header-cell',
  template: `
      <ng-content></ng-content>
    `
})
export class ColumnHeaderCellComponent extends ColumnCellDirective {
  @Input()
  columnName: string;

  constructor(columnsSizesService: ColumnsSizesService) {
    super(columnsSizesService);
  }
}
