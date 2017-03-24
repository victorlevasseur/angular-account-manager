/*
 * Angular Modules
 */
import { enableProdMode, NgModule, Component, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Setup redux with ngrx
import { Store, StoreModule } from '@ngrx/store';

import { DragulaModule } from 'ng2-dragula/ng2-dragula';

import "materialize-css";
import "angular2-materialize";
import "rxjs/Rx";
import Raven = require('raven-js');
import { MaterializeModule } from "angular2-materialize";
import { DropdownModule } from "ngx-dropdown";

/**
 * Import our child components
 */
import { AppComponent } from './components/app.component';

import { routes } from './app.routes';

/**
 * Import the authentication service to be injected into our component
 */

import { AccountService } from './account/account.service';
import { AccountCalculatorService } from './account/calculator/account-calculator.service';

import { AccountTabComponent } from './account/account-tab.component';
import { AccountComponent } from './account/account.component';
import { AccountOperationComponent } from './account/operation/account-operation.component';
import { BankOperationComponent} from './account/operation/bank-operation.component';

import { TabComponent } from './tabbedwindow/tab.component';
import { TabsContainerComponent } from './tabbedwindow/tabscontainer.component';
import { TabsHeaderComponent } from './tabbedwindow/tabsheader.component';

import { CheckboxComponent } from './tools/checkbox.component';
import { ComboboxComponent } from './tools/combobox.component';
import { CurrencyInputDirective } from './tools/currency-input.directive';
import { DateInputDirective } from './tools/date-input.directive';
import { UniqueNumberService } from './tools/unique-number.service';

// Raven initialization
Raven
  .config('https://970f081d785e4896aa5b69133a5ea5dc@sentry.io/149444')
  .install();

// An error handler that redirects the errors to Raven
export class RavenErrorHandler implements ErrorHandler {
  handleError(err:any) : void {
    console.log(err);
    Raven.captureException(err.originalError || err);
  }
}

/*
 * provide('AppStore', { useValue: appStore }),
 */
@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        MaterializeModule,
        RouterModule.forRoot(routes, { useHash: true }),
        DragulaModule
    ],
    providers: [
      AccountService,
      AccountCalculatorService,
      UniqueNumberService,
      { provide: ErrorHandler, useClass: RavenErrorHandler } // To redirect errors to raven
    ],
    declarations: [
      AppComponent,
      AccountComponent,
      AccountOperationComponent,
      BankOperationComponent,
      TabComponent,
      TabsContainerComponent,
      TabsHeaderComponent,
      AccountTabComponent,
      CheckboxComponent,
      ComboboxComponent,
      CurrencyInputDirective,
      DateInputDirective
    ],
    bootstrap: [AppComponent],
    entryComponents: [BankOperationComponent, AccountTabComponent]
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);
