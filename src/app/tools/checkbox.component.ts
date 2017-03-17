import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';

import { UniqueNumberService } from './unique-number.service';

@Component({
  selector: 'app-checkbox',
  template: `
    <input class="filled-in" type="checkbox" [id]="'checkbox-' + id" [ngModel]="checked" (ngModelChange)="onCheckboxChanged($event);" />
    <label [attr.for]="'checkbox-' + id">{{label}}</label>
  `
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

  onCheckboxChanged(event: boolean) {
    this.checkedChange.emit(event);
  }
}
