import { Injectable, Inject } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import Big = require('big.js/big');

import { Account } from '../account';
import { AccountOperation } from '../operation/account-operation';

@Injectable()
export class AccountCalculatorService {

  calculateSums(account: Account): Array<{value: Big, collectedValue: Big}> {
    var result = Array<{value: Big, collectedValue: Big}>(account.operations.length);
    for(var i = 0; i < result.length; i++) {
      result[i] = {
        value: account.operations[i].getValue().plus(i != 0 ? result[i-1].value : new Big(0)),
        collectedValue: account.operations[i].getCollectedValue().plus(i != 0 ? result[i-1].collectedValue : new Big(0))
      };
    }
    return result;
  }
}
