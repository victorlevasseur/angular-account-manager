import { Component, Input, Output, EventEmitter, Type } from '@angular/core';

import Big = require('big.js/big');

export abstract class AccountOperation {

  private _value: Big = 0;
  valueChanged = new EventEmitter<void>();

  get value(): Big {
    return this._value;
  }

  set value(newValue: Big) {
    this._value = newValue;
    this.valueChanged.emit();
  }

  constructor() {

  }

  abstract getCollectedValue(): Big;

  abstract getComponentClass(): Type<AccountOperationRenderer>;

  abstract getComponentDefaultHeight(): number;
}

@Component({
  template: `
    <strong> Unimplemented component! </strong>`
})
export abstract class AccountOperationRenderer {
  @Input()
  op: AccountOperation;
}
