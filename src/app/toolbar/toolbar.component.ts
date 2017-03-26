import { Component, OnInit, Input } from '@angular/core';

import { ToolbarItem } from './toolbar-item';

@Component({
  selector: 'aam-toolbar',
  template: `
    <div class="aam-toolbar aam-toolbar-top">
      <div class="aam-toolbar-item" *ngFor="let item of items">
        <template dynamic-component
          [componentType]="item.type"
          [componentContext]="{item: item}">
        </template>
      </div>
    </div>
  `,
  styleUrls: ['./toolbar.style.scss']
})
export class ToolbarComponent {
  @Input()
  items: Array<ToolbarItem>;
}
