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
    styleUrls: [
      '../styles/app.style.scss',
      '../../../node_modules/font-awesome/scss/font-awesome.scss'
    ],
    encapsulation: ViewEncapsulation.None,
    template: `
      <div class="aam-main-container flex-container vertical" (window:resize)="onResize();">
        <div class="aam-main-tab-header">
          <div class="flex-container horizontal">
            <div class="flex-item main-toolbar flex-container horizontal">
              <div class="btn btn-flat full-height"><i class="fa fa-file" aria-hidden="true"></i>&nbsp;Nouveau</div>
              <div class="btn btn-flat full-height"><i class="fa fa-folder-open" aria-hidden="true"></i>&nbsp;Ouvrir</div>
              <dropdown-button buttonClass="btn btn-flat full-height" dropdownClass="extra-menu-dropdown">
                <span buttonHtml><i class="fa fa-lg fa-ellipsis-h" aria-hidden="true"></i></span>
                <li dropdownItem><i class="fa fa-fw fa-cog" aria-hidden="true"></i>&nbsp;Paramètres</li>
                <li dropdownItem (click)="onCloseClicked();"><i class="fa fa-fw fa-sign-out" aria-hidden="true"></i>&nbsp;Quitter</li>
              </dropdown-button>
            </div>
            <div class="flex-item flex-item-grow">
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

  onCloseClicked() {
    remote.getCurrentWindow().close();
  }
}
