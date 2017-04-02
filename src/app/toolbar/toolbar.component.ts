import { Component, OnInit, Input } from '@angular/core';

import { ToolbarItem } from './toolbar-item';

@Component({
  selector: 'aam-toolbar',
  template: `
    <div class="aam-toolbar aam-toolbar-top">
      <div class="aam-toolbar-item" *ngFor="let item of items">
        <!-- TODO Replace with dynamic component creation -->
        <button-toolbar-item [item]="item"></button-toolbar-item>
      </div>
    </div>
  `,
  styleUrls: ['./toolbar.style.scss']
})
export class ToolbarComponent {
  @Input()
  items: Array<ToolbarItem>;
}
