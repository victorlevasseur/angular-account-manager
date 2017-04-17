import {
  Component,
  Input
} from '@angular/core';

@Component({
  selector: 'columns-container-row',
  template: `
    <div [class]="class" style="display: flex; flex-direction: row; width: 100%; height: 100%;">
      <ng-content select="[column-cell]"></ng-content>
    </div>`
})
export class ColumnsContainerRowComponent {
  @Input()
  class: string = "";
}
