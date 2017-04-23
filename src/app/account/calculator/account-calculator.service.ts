import { Injectable, Inject } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import Big = require('big.js/big');

import { Account } from '../account';
import { AccountOperation } from '../operation/account-operation';

export interface AccountPartialSum {
  account: Account;
  operation: AccountOperation;
  value: Big;
  collectedValue: Big;
}

@Injectable()
export class AccountCalculatorService {

  operationsPartialSums$ = new Subject<AccountPartialSum>();

  calculateSums(account: Account, startingAtOperation: number = 0): void {
    let value: Big;
    let collectedValue: Big;

    for(let i = startingAtOperation; i < account.operations.length; i++) {
      value = account.operations[i].value.plus(i != 0 ? value : new Big(0));
      collectedValue = account.operations[i].value.plus(i != 0 ? value : new Big(0));

      this.operationsPartialSums$.next({
        account: account,
        operation: account.operations[i],
        value: new Big(value),
        collectedValue: new Big(collectedValue)
      });
    }
  }
}
