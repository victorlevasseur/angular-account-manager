import { Component, OnInit, Input, Optional } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

import { AccountService } from './account.service';
import { AccountCalculatorService } from './calculator/account-calculator.service';
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
          [partialSum]="partialSums[i]"
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

  partialSums = new Array<{value: Big, collectedValue: Big}>();

  /* debouncer used to reduce the number of request to the AccountCalculatorService */
  valueChanged = new Subject();

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
