/*
 * Angular Modules
 */
import { enableProdMode, NgModule, Component } from '@angular/core';
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
import { MaterializeModule } from "angular2-materialize";

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

import { ComboboxComponent } from './tools/combobox.component';
import { CurrencyInputDirective } from './tools/currency-input.directive';
import { DateInputDirective } from './tools/date-input.directive';

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
    providers: [AccountService, AccountCalculatorService],
    declarations: [
      AppComponent,
      AccountComponent,
      AccountOperationComponent,
      BankOperationComponent,
      TabComponent,
      AccountTabComponent,
      ComboboxComponent,
      CurrencyInputDirective,
      DateInputDirective
    ],
    bootstrap: [AppComponent],
    entryComponents: [BankOperationComponent, AccountTabComponent]
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);
