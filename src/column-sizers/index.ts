import {
  NgModule
} from '@angular/core';

import { ColumnCellComponent } from './column-cell.component';
import { ColumnRowComponent } from './column-row.component';

@NgModule({
  exports: [
    ColumnCellComponent,
    ColumnRowComponent
  ],
  declarations: [
    ColumnCellComponent,
    ColumnRowComponent
  ]
})
export class ColumnSizersModule {

}
