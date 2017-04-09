/**
 * Import decorators and services from angular
 */
import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
  Inject,
  Optional
} from '@angular/core';

import { TriggerService } from '../../angular2-viewport-master';

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
    <div class="aam-main-container flex-container vertical" (window:resize)="onResize();">
      <div class="aam-main-tab-header">
          <div class="flex-container">
            <div class="flex-item perc24">
              <app-tabs-header [tabsList]="tabsList"></app-tabs-header>
            </div>
          </div>
      </div>
      <main class="aam-main-tab-container flex-item flex-item-grow">
        <div class="aam-noscroll">
          <app-tabs-container [tabsList]="tabsList"></app-tabs-container>
        </div>
      </main>
    </div>
    `,
})
export class AppComponent implements OnInit, AfterViewInit {

  tabsList: TabsList;

  constructor(
    private triggerService: TriggerService,
    @Optional() @Inject('CloseLoadingScreen') private closeLoadingScreen: () => void) {
    var tabs: Tab[] = [
      new AccountTab("compte courant.cpt"),
      new AccountTab("pel.cpt"),
      new AccountTab("remboursements.cpt")
    ];

    this.tabsList = new TabsList(tabs);
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    if(this.closeLoadingScreen) {
      this.closeLoadingScreen();
    }
  }

  onResize() {
    this.triggerService.trigger();
  }
}
