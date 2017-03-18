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
    <div>
      <div class="navbar-fixed">
        <nav class="nav-extended">
          <div class="nav-wrapper">
            <a href="#" class="brand-logo"><i class="material-icons">euro_symbol</i>Angular Account Manager</a>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
              <li (click)="minimizeClicked()"><a href="#"><i class="material-icons">vertical_align_bottom</i></a></li>
              <li (click)="maximizeClicked()"><a href="#"><i class="material-icons">fullscreen</i></a></li>
              <li (click)="closeClicked()"><a href="#"><i class="material-icons">close</i></a></li>
            </ul>
          </div>
          <div class="nav-content">
            <app-tabs-header [tabsList]="tabsList"></app-tabs-header>
          </div>
        </nav>
      </div>
      <main>
        <app-tabs-container [tabsList]="tabsList"></app-tabs-container>
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
