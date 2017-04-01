import { Component, OnInit, Input, Optional } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

import { AccountService } from './account.service';
import { AccountCalculatorService } from './calculator/account-calculator.service';
import { Account } from './account';
import { AccountOperation } from './operation/account-operation';
import { BankOperation } from './operation/bank-operation';

import * as moment from 'moment';
import Big = require('big.js/big');

@Component({
  selector: 'account',
  template: `
      <div aam-selectableList
        [(aam-selectedItems)]="selection"
        *ngIf="account"
        class="account-component">
        <account-operation
          *ngFor="let operation of account.operations; let i = index; let odd = odd;"
          [accountOperation]="operation"
          [partialSum]="partialSums[i]"
          [customClass]="odd ? 'odd' : 'even'"
          (valueChanged)="onValueChanged(account.operation, i)">
        </account-operation>
      </div>
    `,
  styleUrls: ['./account.style.scss'],
  providers: [DragulaService] // To provide a different dragula service for each account
})
export class AccountComponent implements OnInit {
  @Input()
  account: Account;

  partialSums = new Array<{value: Big, collectedValue: Big}>();

  selection = new Array<AccountOperation>();

  /* debouncer used to reduce the number of request to the AccountCalculatorService */
  debouncer = new Subject();

  constructor(private accountService: AccountService,
    private accountCalculator: AccountCalculatorService,
    private dragulaService: DragulaService) {

    dragulaService.setOptions('account-bag', {
      moves: function (el, container, handle) {
        return handle.className.indexOf('handle') != -1;
      }
    });
  }

  ngOnInit(): void {
    this.debouncer
      .debounceTime(100)
      .subscribe(() => {this.getNewSumsForAccount();});
  }

  /* The callback called each time an operation's value has changed */
  onValueChanged(operation: AccountOperation, index: number): void {
    this.partialSums.length = 0;
    this.debouncer.next();
  }

  /* The debounced callback */
  getNewSumsForAccount() {
    this.partialSums = this.accountCalculator.calculateSums(this.account);
  }
};
