import {
  Component,
  Input
} from '@angular/core';

@Component({
  selector: 'column-cell',
  template: `
    <div [style]="(expand === true ? ('flex-grow: 1; width: 0;') : ('width: ' + size + 'px;'))"></div>
    `
})
export class ColumnCellComponent {
  @Input()
  size: number;

  @Input()
  expand: boolean = false;
}
