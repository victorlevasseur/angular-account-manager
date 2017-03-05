import { Injectable, Inject } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { WebWorkerService } from 'angular2-web-worker/web-worker';

import Big = require('big.js/big');

import { Account } from '../account';
import { AccountOperation } from '../operation/account-operation';

@Injectable()
export class AccountCalculatorService {

  /* Ugly, needs to find a better solution with real DI, but my previous attempts failed with this particular service! */
  webWorkerService: WebWorkerService = new WebWorkerService;

  constructor() {

  }

  calculateSums(account: Account): Array<{value: Big, collectedValue: Big}> {
    console.log("Start a new sums calculation...")

    var result = Array<{value: Big, collectedValue: Big}>(account.operations.length);
    for(var i = 0; i < result.length; i++) {
      result[i] = {
        value: account.operations[i].getValue().plus(i != 0 ? result[i-1].value : new Big(0)),
        collectedValue: account.operations[i].getCollectedValue().plus(i != 0 ? result[i-1].collectedValue : new Big(0))
      };
    }

    console.log("...Ended");
    return result;
  }
}
