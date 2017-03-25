import { Component, Input, Output, EventEmitter, ComponentFactoryResolver, ViewContainerRef, OnInit, ViewChild } from '@angular/core';
import { AccountOperation, AccountOperationRenderer } from './account-operation';

import Big = require('big.js/big');

@Component({
  selector: 'account-operation',
  template: `
      <div class="aam-account-operation z-depth-1 flex-container horizontal">
        <div class="flex-item fixed24 handle">&nbsp;</div>
        <div class="flex-item unfixed24 flex-container">
          <div class="flex-item perc18">
            <div #operationRenderer></div>
          </div>
          <div class="flex-item perc6 flex-container horizontal">
            <div *ngIf="partialSum != undefined" class="operation-value flex-item perc12">
              <input
                appCurrencyInput [(currencyValue)]="partialSum.value"
                type="text"
                readonly/>
            </div>
            <div *ngIf="partialSum != undefined" class="operation-collected-value flex-item perc12">
              <input
                appCurrencyInput [(currencyValue)]="partialSum.collectedValue"
                type="text"
                readonly/>
            </div>
          </div>
        </div>
      </div>
    `,
  styleUrls: ['account-operation.style.scss']
})
export class AccountOperationComponent implements OnInit {
  @Input()
  accountOperation: AccountOperation;

  @Input()
  partialSum: {value: Big, collectedValue: Big};

  @Input()
  index: number;

  @Output()
  valueChanged = new EventEmitter<void>();

  @ViewChild('operationRenderer', {read: ViewContainerRef})
  operationRendererContainer: ViewContainerRef;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef) { }

  ngOnInit(): void {
    // Chargement du composant qui va faire le rendu de la ligne de compte
    const factory = this.componentFactoryResolver.resolveComponentFactory(this.accountOperation.getComponentClass());
    const ref = this.operationRendererContainer.createComponent(factory, 0);
    ref.instance.op = this.accountOperation;
    ref.instance.index = this.index;
    ref.changeDetectorRef.detectChanges();

    // Connect to the valueChanged emitter of the AccountOperation
    this.accountOperation.valueChanged.subscribe(() => {this.onAccountOperationValueChanged();});
  }

  onAccountOperationValueChanged(): void {
    this.valueChanged.next();
  }
};
