import { Component, OnInit, Input, Optional } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

import { AccountService } from './account.service';
import { AccountCalculatorService, AccountPartialSum } from './calculator/account-calculator.service';
import { Account } from './account';
import { AccountOperation } from './operation/account-operation';
import { BankOperation } from './operation/bank-operation';
import { SelectionService } from '../dnd/selection.service';

import * as moment from 'moment';
import Big = require('big.js/big');

@Component({
  selector: 'account',
  template: `
      <div aam-selectableList
        [aam-selectableModel]="account.operations"
        [dragula]="'account-bag'"
        [dragulaModel]='account.operations'
        *ngIf="account"
        class="account-component"
        columns-container [(columnsSizes)]="columnsSizes">
        <account-operation
          *ngFor="let operation of account.operations; let i = index; let odd = odd;"
          [accountOperation]="operation"
          [partialSums$]="partialSums$"
          [customClass]="odd ? 'odd' : 'even'"
          (valueChanged)="onValueChanged(account.operation, i)">
        </account-operation>
      </div>
    `,
  styleUrls: ['./account.style.scss'],
  providers: [DragulaService, SelectionService] // To provide a different dragula service for each account
})
export class AccountComponent implements OnInit {
  @Input()
  account: Account;

  partialSums$: Observable<AccountPartialSum>;

  /* debouncer used to reduce the number of request to the AccountCalculatorService */
  valueChanged$ = new Subject<number>();

  columnsSizes = [
    ["handle", 24],
    ["renderer", -1],
    ["collected", 24],
    ["date", 120],
    ["description", -1]
  ];

  get selection() {
    return this.selectionService.selected;
  }

  set selection(value: Iterable<any>) {
    this.selectionService.setSelection(value);
  }

  constructor(private accountService: AccountService,
    private accountCalculator: AccountCalculatorService,
    private dragulaService: DragulaService,
    private selectionService: SelectionService) {

    dragulaService.setOptions('account-bag', {
      moves: function (el, container, handle) {
        return handle.className.indexOf('handle') != -1;
      }
    });

    dragulaService.drop.subscribe(() => {
      this.updateSums();
    });

    // Get the partial sums values changes for the current account
    this.partialSums$ = accountCalculator.operationsPartialSums$
      .filter((partialSum) => partialSum.account === this.account);
  }

  ngOnInit(): void {
    this.valueChanged$
      .debounceTime(100)
      .subscribe((firstIndex: number) => {this.getNewSumsForAccount(firstIndex);});
  }

  updateSums(firstOperationIndex: number = 0) {
    this.valueChanged$.next(firstOperationIndex);
  }

  /* The callback called each time an operation's value has changed */
  onValueChanged(operation: AccountOperation, index: number): void {
    this.updateSums();
  }

  /* The debounced callback */
  getNewSumsForAccount(firstOperationIndex: number = 0) {
    this.accountCalculator.calculateSums(this.account, firstOperationIndex);
  }
};
