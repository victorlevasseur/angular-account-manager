import {
  NgModule
} from '@angular/core';

import { ColumnCellDirective } from './column-cell.directive';
import { ColumnHeaderCellComponent } from './column-header-cell.component';
import { ColumnsContainerRowComponent } from './columns-container-row.component';
import { ColumnsContainerDirective } from './columns-container.directive';

@NgModule({
  exports: [
    ColumnCellDirective,
    ColumnHeaderCellComponent,
    ColumnsContainerRowComponent,
    ColumnsContainerDirective
  ],
  declarations: [
    ColumnCellDirective,
    ColumnHeaderCellComponent,
    ColumnsContainerRowComponent,
    ColumnsContainerDirective
  ]
})
export class ColumnSizersModule {

}
