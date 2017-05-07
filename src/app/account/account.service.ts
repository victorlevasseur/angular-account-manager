import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Account } from './account';
import { BankOperation } from './operation/bank-operation';

import * as moment from 'moment';
import Big = require('big.js/big');

/**
 * Holds one loaded account.
 * Each operation on the account mutates it, so components using it
 * shall keep a reference to the Account object if they want to use it
 */
@Injectable()
export class AccountService {
  /**
   * The current loaded account of the service.
   */
  private _account: Account;

  get account(): Account {
    return this._account;
  }

  private accountLoadedSubject = new Subject<Account>();

  /**
   * An observable that emits a new Account when a new one
   * is loaded.
   * The current loaded account is also available in the account
   * property of the service.
   */
  accountLoaded$ = this.accountLoadedSubject.asObservable();

  constructor() {

  }

  loadAccount(filename: string): Promise<Account> {
    return new Promise<Account>((resolve, reject) => {
      setTimeout(() => {
        this._account = new Account();
        this._account.operations = [
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
        this.accountLoadedSubject.next(this._account);
        resolve(this._account);
      }, 1000);
    });
  }

}
