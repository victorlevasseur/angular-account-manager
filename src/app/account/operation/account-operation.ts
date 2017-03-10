import { Component, Input, Output, EventEmitter } from '@angular/core';

import Big = require('big.js/big');

@Component({
  template: `
    <strong> Unimplemented component! </strong>`
})
export class AccountOperationRenderer {
  @Input()
  op: AccountOperation;

  @Input()
  index: number;
}

export abstract class AccountOperation {

  partialSum: Big;
  partialCollectedSum: Big;

  valueChanged = new EventEmitter<void>();

  constructor() {
    this.partialSum = new Big(0);
    this.partialCollectedSum = new Big(0);
  }

  abstract getValue(): Big;

  getCollectedValue(): Big {
    return new Big(0);
  }

  abstract getComponentClass(): { new(...args: any[]): AccountOperationRenderer; };

  protected setValueChanged(): void {
    this.valueChanged.next();
  }
}
