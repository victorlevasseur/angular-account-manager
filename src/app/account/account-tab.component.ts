import { Component, OnInit, Input } from '@angular/core';
import { AccountComponent } from './account.component';

@Component({
  template: `
    <div>
      <account [accountFilename]="filename"></account>
    </div>
  `
})
export class AccountTabComponent {
  @Input()
  filename: string;
}
