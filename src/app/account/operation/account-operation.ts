import { Component, Input, Output, EventEmitter, Type } from '@angular/core';

import Big = require('big.js/big');

export abstract class AccountOperation {

  valueChanged = new EventEmitter<void>();

  constructor() {

  }

  abstract getValue(): Big;

  abstract getCollectedValue(): Big;

  abstract getComponentClass(): Type<AccountOperationRenderer>;

  abstract getComponentDefaultHeight(): number;

  protected setValueChanged(): void {
    this.valueChanged.next();
  }
}

@Component({
  template: `
    <strong> Unimplemented component! </strong>`
})
export abstract class AccountOperationRenderer {
  @Input()
  op: AccountOperation;
}
