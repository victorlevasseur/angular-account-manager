import { AppState } from './../store/appState.store';
/**
 * Import decorators and services from angular
 */
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { AccountOperation } from './../account/operation/account-operation';
import { BankOperation } from './../account/operation/bank-operation';
import { AccountOperationComponent} from './../account/operation/account-operation.component';
import { Tab } from '../tabbedwindow/tab';
import { AccountTab } from '../account/account-tab';

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
            <a href="#" class="brand-logo">Angular Account Manager</a>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
              <li><a href="sass.html">Sass</a></li>
              <li><a href="badges.html">Components</a></li>
              <li><a href="collapsible.html">JavaScript</a></li>
            </ul>
          </div>
          <div class="nav-content">
            <ul class="tabs tabs-transparent">
              <li *ngFor="let tab of tabs; let i = index;" class="tab" (click)="tabClicked(i)">
                <a [href]="'#tab-n' + i">{{tab.getTabTitle()}}</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <main>
        <div *ngFor="let tab of tabs; let i = index;" [hidden]="selectedTab != i">
          <tab  [tab]="tab" [tabId]="'tab-n' + i"></tab>
        </div>
        <router-outlet></router-outlet>
      </main>
    </div>
    `,
})
export class AppComponent implements OnInit {

  tabs: Tab[] = [
    new AccountTab("compte courant.cpt"),
    new AccountTab("pel.cpt"),
    new AccountTab("remboursements.cpt")
  ];

  selectedTab: number = 0;

  constructor() {

  }

  ngOnInit() {
    //check authentication
  }

  tabClicked(id: number) {
    this.selectedTab = id;
  }
}
