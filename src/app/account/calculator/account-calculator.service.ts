import { Injectable, Inject } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { WebWorkerService } from 'angular2-web-worker/web-worker';

import { Account } from '../account';
import { AccountOperation } from '../operation/account-operation';

@Injectable()
export class AccountCalculatorService {

  /* Ugly, needs to find a better solution with real DI, but my previous attempts failed with this particular service! */
  webWorkerService: WebWorkerService = new WebWorkerService;

  constructor() {

  }

  calculateSums(account: Account): Observable<Array<number>> {
    console.log("Start a new sums calculation...")

    var values = new Array<number>(account.operations.length);
    for(var i: number = 0; i < account.operations.length; i++) {
      values[i] = account.operations[i].getValue();
    }

    return Observable.fromPromise(this.webWorkerService.run(opValues => {
      var sums = new Array<number>(opValues.length);
      for(var i: number = 0; i < opValues.length; i++) {
        sums[i] = (i != 0 ? sums[i-1] : 0) + opValues[i];
      }
      return sums;
    }, values));
  }
}
