import {
  NgModule
} from '@angular/core';

import { ColumnCellDirective } from './column-cell.directive';
import { ColumnsContainerRowComponent } from './columns-container-row.component';
import { ColumnsContainerDirective } from './columns-container.directive';

@NgModule({
  exports: [
    ColumnCellDirective,
    ColumnsContainerRowComponent,
    ColumnsContainerDirective
  ],
  declarations: [
    ColumnCellDirective,
    ColumnsContainerRowComponent,
    ColumnsContainerDirective
  ]
})
export class ColumnSizersModule {

}
