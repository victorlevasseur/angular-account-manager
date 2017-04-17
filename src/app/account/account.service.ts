import { Injectable } from '@angular/core';
import { Account } from './account';
import { BankOperation } from './operation/bank-operation';

import * as moment from 'moment';
import Big = require('big.js/big');

@Injectable()
export class AccountService {
  getAccount(filename: string): Account {
    var account: Account = new Account();
    account.operations = [
      new BankOperation(
        true,
        moment.utc(),
        "Virement",
        "Salaire",
        new Big(1500)
      ),
      new BankOperation(
        false,
        moment.utc(),
        "Chèque",
        "Noël des enfants",
        new Big(-35)
      ),
      new BankOperation(
        true,
        moment.utc(),
        "Virement",
        "Salaire 2",
        new Big(1200.45)
      ),
      new BankOperation(
        true,
        moment.utc(),
        "Virement",
        "Loyer",
        new Big(-700)
      ),
      new BankOperation(
        false,
        moment.utc(),
        "Chèque #1",
        "E.Leclerc",
        new Big(-123.65)
      )
    ];
    /*account.operations = [];
    for(var i = 0; i < 2000; i++) {
      account.operations.push(new BankOperation(
        true,
        moment.utc(),
        "Chèque #1",
        "E.Leclerc",
        new Big(0)
      ));
    }*/

    return account;
  }
}
