import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

import { AccountService } from './account.service';
import { AccountCalculatorService } from './calculator/account-calculator.service';
import { Account } from './account';
import { AccountOperation } from './operation/account-operation';

@Component({
  selector: 'account',
  template: `
      <div *ngIf="account" class="account-component" [dragula]="'account-bag'" [dragulaModel]='account.operations'>
        <account-operation
          *ngFor="let operation of account.operations; let i = index;"
          [accountOperation]="operation"
          [index]="i"
          (valueChanged)="onValueChanged(account.operation, i)">
        </account-operation>
      </div>
    `
})
export class AccountComponent implements OnInit {
  @Input()
  accountFilename: string;

  account: Account;

  /* debouncer used to reduce the number of request to the AccountCalculatorService */
  debouncer = new Subject();

  constructor(private accountService: AccountService, private accountCalculator: AccountCalculatorService, private dragulaService: DragulaService) {
    dragulaService.setOptions('account-bag', {
      moves: function (el, container, handle) {
        return handle.className.indexOf('handle') != -1;
      }
    });
  }

  ngOnInit(): void {
    this.debouncer
      .debounceTime(100)
      .subscribe((data: {operation: AccountOperation, index: number}) => {this.getNewSumsForAccount();});
    this.account = this.accountService.getAccount(this.accountFilename);
  }

  /* The callback called each time an operation's value has changed */
  onValueChanged(operation: AccountOperation, index: number): void {
    this.debouncer.next({operation, index});
  }

  /* The debounced callback */
  getNewSumsForAccount() {
    var results = this.accountCalculator.calculateSums(this.account);

    for(var i = 0; i < results.length && i < this.account.operations.length; i++) {
      this.account.operations[i].partialSum = results[i].value;
      this.account.operations[i].partialCollectedSum = results[i].collectedValue;
    }
  }
};
