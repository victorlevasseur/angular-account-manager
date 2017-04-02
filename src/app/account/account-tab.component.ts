import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { AccountComponent } from './account.component';
import { AccountService } from './account.service';
import { Account } from './account';
import { AccountOperation } from './operation/account-operation';
import { BankOperation } from './operation/bank-operation';
import { ToolbarItem } from '../toolbar/toolbar-item';
import { ButtonToolbarItem } from '../toolbar/button-toolbar-item';

import { SelectionService } from '../dnd/selection.service';

import * as moment from 'moment';
import Big = require('big.js/big');

@Component({
  template: `
    <div class="flex-container vertical" style="height: 100%;">
      <aam-toolbar [items]="toolbarItems"></aam-toolbar>
      <div class="flex-item flex-item-grow">
        <div vp-scrollable-content class="aam-vscrollable">
          <account #accountComponent [account]="account"></account>
        </div>
      </div>
    </div>
  `,
  providers: [SelectionService]
})
export class AccountTabComponent implements OnInit {
  @Input()
  filename: string;

  account: Account;

  @ViewChild('accountComponent')
  accountComponent: AccountComponent;

  toolbarItems: Array<ToolbarItem> = [
    new ButtonToolbarItem({
      text: 'Ajouter une opération',
      clickedCallback: (item) => {
        this.addOperation();
      }
    }),
    new ButtonToolbarItem({
      text: 'Supprimer',
      clickedCallback: (item) => {
        this.removeSelectedOperations();
      }
    }),
    new ButtonToolbarItem({
      text: "TEST",
      clickedCallback: (item) => {
        [this.account.operations[2], this.account.operations[3]] = [this.account.operations[3], this.account.operations[2]];
      }
    })
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

  removeSelectedOperations() {
    this.accountComponent.selection.forEach((selectedItem: AccountOperation) => {
      let itemIndex = this.account.operations.indexOf(selectedItem);
      if(itemIndex === -1) {
        return;
      }
      this.account.operations.splice(itemIndex, 1);
    });
    this.accountComponent.selection = [];
  }
}
