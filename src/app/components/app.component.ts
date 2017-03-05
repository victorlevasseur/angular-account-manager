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
    selector: 'account-manager-app',
    styleUrls: ['../styles/app.style.scss'],
    encapsulation: ViewEncapsulation.None,
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
