import { AccountOperation, AccountOperationRenderer } from './account-operation';
import { BankOperationComponent } from './bank-operation.component';

import * as moment from 'moment';
import Big = require('big.js/big');

export class BankOperation extends AccountOperation {
  get collected(): boolean {
    return this._collected;
  }

  set collected(val: boolean) {
    this._collected = val;
    this.setValueChanged();
  }

  get credit(): Big {
    return this._credit;
  }

  set credit(val: Big) {
    if(typeof val == "number") {
      this._credit = new Big(val);
    }
    else {
      this._credit = val;
    }

    this.setValueChanged();
  }

  get debit(): Big {
    return this._debit;
  }

  set debit(val: Big) {
    if(typeof val == "number") {
      this._debit = new Big(val);
    }
    else {
      this._debit = val;
    }

    this.setValueChanged();
  }

  constructor(private _collected: boolean, private date: moment.Moment, private type: string, private description: string, private _credit: Big, private _debit: Big) {
    super();
  }

  getValue(): Big {
    return this._credit.sub(this._debit);
  }

  getCollectedValue(): Big {
    return this.collected ? this.getValue() : new Big(0);
  }

  getComponentClass(): { new(...args: any[]): AccountOperationRenderer; } {
    return BankOperationComponent;
  }
}
