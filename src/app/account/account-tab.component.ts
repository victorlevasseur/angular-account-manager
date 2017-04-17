import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  ViewChild
} from '@angular/core';

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
export class AccountTabComponent implements OnInit, AfterViewInit {
  @Input()
  filename: string;

  account: Account;

  @ViewChild('accountComponent')
  accountComponent: AccountComponent;

  toolbarItems: Array<ToolbarItem> = [
    new ButtonToolbarItem({
      text: 'Ajouter une opération',
      clickedCallback: (item) => {
        //for(let i = 0; i < 100; ++i) {
          this.addOperation();
        //}
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
        this.accountComponent.columnsSizes.push(['value', 250]);
      }
    })
  ];

  constructor(private accountService: AccountService) {

  }

  ngOnInit() {
    this.account = this.accountService.getAccount(this.filename);
  }

  ngAfterViewInit() {
    this.accountComponent.updateSums();
  }

  addOperation() {
    this.account.operations.push(new BankOperation(
      false,
      moment.utc(),
      "",
      "",
      new Big(0)
    ));
    this.accountComponent.updateSums();
  }

  removeSelectedOperations() {
    this.accountComponent.selection.forEach((selectedItem: AccountOperation) => {
      let itemIndex = this.account.operations.indexOf(selectedItem);
      if(itemIndex === -1) {
        return;
      }
      this.account.operations.splice(itemIndex, 1);
    });
    this.accountComponent.selection = new Set([]);
    this.accountComponent.updateSums();
  }
}
