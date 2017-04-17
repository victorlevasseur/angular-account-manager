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
        [aam-selectableModel]="account.operations"
        [dragula]="'account-bag'"
        [dragulaModel]='account.operations'
        *ngIf="account"
        class="account-component"
        columns-container [(columnsSizes)]="columnsSizes">
        <account-operation
          *ngFor="let operation of account.operations; let i = index; let odd = odd;"
          aam-selectableItem
          [aam-trackBy]="operation"
          [selected]="selection.has(operation)"
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

  selection = new Set<AccountOperation>();

  /* debouncer used to reduce the number of request to the AccountCalculatorService */
  valueChanged = new Subject();

  columnsSizes = [
    ["handle", 24],
    ["renderer", -1],
    ["collected", 24],
    ["date", 120],
    ["description", -1]
  ];

  constructor(private accountService: AccountService,
    private accountCalculator: AccountCalculatorService,
    private dragulaService: DragulaService) {

    dragulaService.setOptions('account-bag', {
      moves: function (el, container, handle) {
        return handle.className.indexOf('handle') != -1;
      }
    });

    dragulaService.drop.subscribe(() => {
      this.updateSums();
    })
  }

  ngOnInit(): void {
    this.valueChanged
      .debounceTime(100)
      .subscribe(() => {this.getNewSumsForAccount();});
  }

  updateSums() {
    this.valueChanged.next();
  }

  /* The callback called each time an operation's value has changed */
  onValueChanged(operation: AccountOperation, index: number): void {
    this.updateSums();
  }

  /* The debounced callback */
  getNewSumsForAccount() {
    this.partialSums = this.accountCalculator.calculateSums(this.account);
  }
};
