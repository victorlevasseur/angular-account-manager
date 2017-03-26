import { Component, OnInit, Input } from '@angular/core';

import { AccountComponent } from './account.component';
import { AccountService } from './account.service';
import { Account } from './account';
import { BankOperation } from './operation/bank-operation';
import { ToolbarItem } from '../toolbar/toolbar-item';
import { ButtonToolbarItem } from '../toolbar/button-toolbar-item';

import * as moment from 'moment';
import Big = require('big.js/big');

@Component({
  template: `
    <div class="flex-container vertical" style="height: 100%;">
      <aam-toolbar [items]="toolbarItems"></aam-toolbar>
      <div class="flex-item flex-item-grow">
        <div class="aam-vscrollable">
          <account [account]="account"></account>
        </div>
      </div>
    </div>
  `
})
export class AccountTabComponent implements OnInit {
  @Input()
  filename: string;

  account: Account;

  toolbarItems: Array<ToolbarItem> = [
    new ButtonToolbarItem({
      text: 'Ajouter une opération',
      clickedCallback: (item) => {
        this.addOperation();
      }
    }),
  ];

  constructor(private accountService: AccountService) {

  }

  ngOnInit() {
    this.account = this.accountService.getAccount(this.filename);
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
}
