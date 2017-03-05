import { Injectable } from '@angular/core';
import { Account } from './account';
import { BankOperation } from './operation/bank-operation';

@Injectable()
export class AccountService {
  getAccount(filename: string): Account {
    var account: Account = new Account();
    account.operations = [
      new BankOperation(
        true,
        new Date(),
        "Virement",
        "Salaire",
        1500,
        0
      ),
      new BankOperation(
        false,
        new Date(),
        "Chèque",
        "Noël des enfants",
        0,
        35
      ),
      new BankOperation(
        true,
        new Date(),
        "Virement",
        "Salaire 2",
        1200.45,
        0
      ),
      new BankOperation(
        true,
        new Date(),
        "Virement",
        "Loyer",
        0,
        700
      ),
      new BankOperation(
        false,
        new Date(),
        "Chèque #1",
        "E.Leclerc",
        0,
        123.65
      )
    ];

    return account;
  }
}
