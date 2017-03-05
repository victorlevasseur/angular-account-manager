import { Component, Input, Output, EventEmitter } from '@angular/core';

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

  partialSum: number = 0;

  valueChanged = new EventEmitter<void>();

  abstract getValue(): number;
  abstract getComponentClass(): { new(...args: any[]): AccountOperationRenderer; };

  protected setValueChanged(): void {
    this.valueChanged.next();
  }
}
