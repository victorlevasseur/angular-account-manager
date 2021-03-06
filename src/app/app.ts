require('./polyfills.ts'); //TODO: Require it from the index.html

/*
 * Angular Modules
 */
import { enableProdMode, NgModule, Component, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DynamicComponentModule } from 'angular2-dynamic-component/index';
import { ViewportModule } from '../angular2-viewport-master';

// Setup redux with ngrx
import { Store, StoreModule } from '@ngrx/store';

import { DragulaModule } from 'ng2-dragula/ng2-dragula';

import "rxjs/Rx";
import Raven = require('raven-js');

import { ColumnSizersModule } from '../column-sizers';

/**
 * Import our child components
 */
import { AppComponent } from './components/app.component';

/**
 * Import the authentication service to be injected into our component
 */

import { AccountService } from './account/account.service';
import { AccountCalculatorService } from './account/calculator/account-calculator.service';

import { AccountTabComponent } from './account/account-tab.component';
import { AccountComponent } from './account/account.component';
import { AccountOperationComponent } from './account/operation/account-operation.component';
import { AccountOperationRendererService } from './account/operation/account-operation-renderer.service';
import { BankOperationComponent} from './account/operation/bank-operation.component';

import { EditableFieldComponentBase } from './account/operation/editable-fields/editable-field-base.component';

import { SelectableListDirective } from './dnd/selectable-list.directive';
import { SelectableItemDirective } from './dnd/selectable-item.directive';

import { TabComponent } from './tabbedwindow/tab.component';
import { TabsContainerComponent } from './tabbedwindow/tabscontainer.component';
import { TabsHeaderComponent } from './tabbedwindow/tabsheader.component';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { ButtonToolbarItemComponent } from './toolbar/button-toolbar-item';

import { ClickOutsideEventDirective } from './tools/click-outside-event.directive';
import { CheckboxComponent } from './tools/checkbox.component';
import { ComboboxComponent } from './tools/combobox.component';
import { CurrencyInputDirective } from './tools/currency-input.directive';
import { DateInputDirective } from './tools/date-input.directive';
import { DoubleclickInputDirective } from './tools/doubleclick-input.directive';
import { DropdownButtonComponent } from './tools/dropdown-button.component';
import { DropdownItemDirective } from './tools/dropdown-item.directive';
import { MainThreadCommunicationService } from './tools/main-thread-communication.service';
import { UniqueNumberService } from './tools/unique-number.service';

import * as editableFields from './account/operation/editable-fields';

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
        DragulaModule,
        ViewportModule,
        ColumnSizersModule
    ],
    providers: [
      AccountCalculatorService,
      UniqueNumberService,
      AccountOperationRendererService,
      MainThreadCommunicationService,
      { provide: ErrorHandler, useClass: RavenErrorHandler }, // To redirect errors to raven
      { provide: 'CloseLoadingScreen', useValue: () => { (window as any).loading_screen.finish() } } // To close the loading screen when done loading
    ].concat(editableFields.globalProviders),
    declarations: [
      AppComponent,
      AccountComponent,
      AccountOperationComponent,
      BankOperationComponent,
      TabComponent,
      TabsContainerComponent,
      TabsHeaderComponent,
      AccountTabComponent,
      ToolbarComponent,
      ButtonToolbarItemComponent,
      CheckboxComponent,
      ClickOutsideEventDirective,
      ComboboxComponent,
      CurrencyInputDirective,
      DateInputDirective,
      DoubleclickInputDirective,
      DropdownButtonComponent,
      DropdownItemDirective,
      SelectableListDirective,
      SelectableItemDirective,
    ].concat(editableFields.components),
    entryComponents: [
      BankOperationComponent,
      AccountTabComponent,
      ButtonToolbarItemComponent,
    ].concat(editableFields.entryComponents),
    bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
