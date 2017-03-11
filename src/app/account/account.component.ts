import { Component, OnInit, Input } from '@angular/core';
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
      <div *ngIf="account" class="account-component" [dragula]="'account-bag'" [dragulaModel]='account.operations'>
        <account-operation
          *ngFor="let operation of account.operations; let i = index;"
          [accountOperation]="operation"
          [partialSum]="partialSums[i]"
          [index]="i"
          (valueChanged)="onValueChanged(account.operation, i)">
        </account-operation>
      </div>
      <!-- TODO: A séparer dans un autre composant -->
      <div class="fixed-action-btn">
        <a class="btn-floating btn-large red">
          <i class="large material-icons">mode_edit</i>
        </a>
        <ul>
          <li>
            <a
              class="btn-floating red waves-effect waves-light tooltipped"
              data-position="left"
              data-delay="50"
              data-tooltip="Supprimer la sélection">
              <i class="material-icons">delete</i>
            </a>
          </li>
          <li>
            <a
              class="btn-floating green waves-effect waves-light tooltipped"
              data-position="left"
              data-delay="50"
              data-tooltip="Ajouter une ligne"
              (click)="addOperation()">
              <i class="material-icons">add</i>
            </a>
          </li>
        </ul>
      </div>
    `,
  providers: [DragulaService] // To provide a different dragula service for each account
})
export class AccountComponent implements OnInit {
  @Input()
  accountFilename: string;

  account: Account;

  partialSums = new Array<{value: Big, collectedValue: Big}>();

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
      .subscribe(() => {this.getNewSumsForAccount();});
    this.account = this.accountService.getAccount(this.accountFilename);
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

  addOperation() {
    this.account.operations.push(new BankOperation(
      false,
      moment.utc(),
      "",
      "",
      new Big(0),
      new Big(0)
    ));
  }
};
