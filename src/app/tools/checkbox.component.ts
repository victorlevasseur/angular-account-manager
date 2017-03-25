import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';

import { UniqueNumberService } from './unique-number.service';

@Component({
  selector: 'app-checkbox',
  template: `
    <div class="aam-checkbox" [class.checked]="checked" (click)="onCheckboxClicked();">
      <div class="checker" [class.checked]="checked">
      </div>
    </div>
  `,
  styleUrls: ['./checkbox.style.scss']
})
export class CheckboxComponent implements OnInit, OnDestroy {
  id: number;

  @Input('label')
  label: string;

  @Input('checked')
  checked: boolean;

  @Output('checkedChange')
  checkedChange = new EventEmitter<boolean>();

  constructor(private uniqueNumberSrv: UniqueNumberService) {

  }

  ngOnInit() {
    this.id = this.uniqueNumberSrv.getUniqueNumber();
  }

  ngOnDestroy() {
    //TODO: Give the id back
  }

  onCheckboxClicked() {
    this.checkedChange.emit(!this.checked);
  }
}
