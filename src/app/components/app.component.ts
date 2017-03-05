import { AppState } from './../store/appState.store';
/**
 * Import decorators and services from angular
 */
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { AccountOperation } from './../account/operation/account-operation';
import { BankOperation } from './../account/operation/bank-operation';
import { AccountOperationComponent} from './../account/operation/account-operation.component';

/*
 * App Component
 * Top Level Component
 */
@Component({
    // The selector is what angular internally uses
    selector: 'account-manager-app', // <app></app>
    styleUrls: ['../styles/app.style.scss'],
    template: `
    <div>
      <main>
        <div class="account-operations">
          <account accountFilename="aaaa"></account>
        </div>
        <router-outlet></router-outlet>
      </main>
    </div>
    `,
})
export class AppComponent implements OnInit {

  constructor() {

  }

  ngOnInit() {
    //check authentication
  }
}
