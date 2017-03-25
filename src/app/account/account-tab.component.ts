import { Component, OnInit, Input } from '@angular/core';
import { AccountComponent } from './account.component';

@Component({
  template: `
    <div class="flex-container vertical" style="height: 100%;">
      <aam-toolbar></aam-toolbar>
      <div class="flex-item flex-item-grow">
        <div class="aam-vscrollable">
          <account [accountFilename]="filename"></account>
        </div>
      </div>
    </div>
  `
})
export class AccountTabComponent {
  @Input()
  filename: string;
}
