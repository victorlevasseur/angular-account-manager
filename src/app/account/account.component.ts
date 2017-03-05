import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

import { AccountService } from './account.service';
import { AccountCalculatorService } from './calculator/account-calculator.service';
import { Account } from './account';
import { AccountOperation } from './operation/account-operation';
import { BankOperation } from './operation/bank-operation';

import Big = require('big.js/big');

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
      <!-- TODO: A séparer dans un autre composant -->
      <div class="fixed-action-btn">
        <a class="btn-floating btn-large red">
          <i class="large material-icons">mode_edit</i>
        </a>
        <ul>
          <li><a class="btn-floating btn-large red waves-effect waves-light tooltipped" data-position="left" data-delay="50" data-tooltip="Supprimer la sélection"><i class="material-icons">delete</i></a></li>
          <li>
            <a
              class="btn-floating btn-large green waves-effect waves-light tooltipped"
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

  addOperation() {
    this.account.operations.push(new BankOperation(
      false,
      new Date(),
      "",
      "",
      new Big(0),
      new Big(0)
    ));
  }
};
