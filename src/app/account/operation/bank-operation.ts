import { Type } from '@angular/core';

import { AccountOperation, AccountOperationRenderer } from './account-operation';
import { BankOperationComponent } from './bank-operation.component';

import * as moment from 'moment';
import Big = require('big.js/big');

export interface BankOperationInterface {
  collected: boolean;
  date: moment.Moment;
  type: string;
  description: string;
  value: Big;
}

export class BankOperation extends AccountOperation implements BankOperationInterface {
  private _collected: boolean;

  get collected(): boolean {
    return this._collected;
  }

  set collected(val: boolean) {
    this._collected = val;
  }

  constructor(_collected: boolean, public date: moment.Moment, public type: string, public description: string, public value: Big) {
    super();
    this._collected = _collected;
  }

  getCollectedValue(): Big {
    return this.collected ? this.value : new Big(0);
  }

  getComponentClass(): Type<AccountOperationRenderer> {
    return BankOperationComponent;
  }

  getComponentDefaultHeight(): number {
    return 29;
  }
}
