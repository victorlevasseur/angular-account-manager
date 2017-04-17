import {
  Component,
  Input
} from '@angular/core';

@Component({
  selector: 'column-row',
  template: `
    <div style="display: flex; flex-direction: column; width: 100%; height: 100%;">
      <ng-content select="column-cell"></ng-content>
    </div>`
})
export class ColumnRowComponent {

}
