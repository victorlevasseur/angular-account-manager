import { Component, Input, Output, EventEmitter, ComponentFactoryResolver, ViewContainerRef, OnInit, ViewChild } from '@angular/core';
import { AccountOperation, AccountOperationRenderer } from './account-operation';

import Big = require('big.js/big');

@Component({
  selector: 'account-operation',
  template: `
      <div class="row">
        <div class="account-operation-card z-depth-1 flex-container horizontal">
          <div class="flex-item fixed24 handle">&nbsp;</div>
          <div class="flex-item unfixed24 flex-container">
            <div class="flex-item perc18">
              <div #operationRenderer></div>
            </div>
            <div class="flex-item perc6">
              <div *ngIf="partialSum == undefined" class="col l12 valign-wrapper">
                <div class="valign">
                  Calcul en cours...
                </div>
              </div>
              <div *ngIf="partialSum != undefined" class="operation-value col l6">
                <input
                  class="currency"
                  type="text"
                  [value]="partialSum.value + ' €'"
                  readonly/>
              </div>
              <div *ngIf="partialSum != undefined" class="operation-collected-value col l6">
                <input
                  class="currency"
                  type="text"
                  [value]="partialSum.collectedValue + ' €'"
                  readonly/>
              </div>
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
