/**
 * Import decorators and services from angular
 */
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { AccountOperation } from './../account/operation/account-operation';
import { BankOperation } from './../account/operation/bank-operation';
import { AccountOperationComponent} from './../account/operation/account-operation.component';
import { Tab } from '../tabbedwindow/tab';
import { TabsList } from '../tabbedwindow/tabslist';
import { AccountTab } from '../account/account-tab';

const remote = require('electron').remote;

/*
 * App Component
 * Top Level Component
 */
@Component({
    selector: 'account-manager-app',
    styleUrls: ['../styles/app.style.scss'],
    encapsulation: ViewEncapsulation.None,
    template: `
    <div class="aam-main-container">
      <div class="aam-main-tab-header">
          <div class="flex-container">
            <div class="flex-item perc24">
              <app-tabs-header [tabsList]="tabsList"></app-tabs-header>
            </div>
          </div>
      </div>
      <main class="aam-main-tab-container">
        <div class="aam-vscrollable">
          <app-tabs-container [tabsList]="tabsList"></app-tabs-container>
        </div>
        <router-outlet></router-outlet>
      </main>
    </div>
    `,
})
export class AppComponent implements OnInit {

  tabsList: TabsList;

  constructor() {
    var tabs: Tab[] = [
      new AccountTab("compte courant.cpt"),
      new AccountTab("pel.cpt"),
      new AccountTab("remboursements.cpt")
    ];

    this.tabsList = new TabsList(tabs);
  }

  ngOnInit() {
    //check authentication
  }

  minimizeClicked() {
    remote.getCurrentWindow().minimize();
  }

  maximizeClicked() {
    var window = remote.getCurrentWindow();
    if (!window.isMaximized()) {
      window.maximize();
    } else {
      window.unmaximize();
    }
  }

  closeClicked() {
    remote.getCurrentWindow().close();
  }
}
