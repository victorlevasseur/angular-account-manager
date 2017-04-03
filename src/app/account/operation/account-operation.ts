import { Component, Input, Output, EventEmitter } from '@angular/core';

import Big = require('big.js/big');

export abstract class AccountOperation {

  valueChanged = new EventEmitter<void>();

  constructor() {

  }

  abstract getValue(): Big;

  abstract getCollectedValue(): Big;

  abstract getComponentClass(): { new(...args: any[]): AccountOperationRenderer; };

  protected setValueChanged(): void {
    this.valueChanged.next();
  }
}

@Component({
  template: `
    <strong> Unimplemented component! </strong>`
})
export class AccountOperationRenderer {
  @Input()
  op: AccountOperation;
}
