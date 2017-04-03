import {
  Component,
  Input,
  Output,
  EventEmitter,
  ComponentFactoryResolver,
  ViewContainerRef,
  ChangeDetectorRef,
  OnInit,
  OnDestroy,
  ViewChild,
  Optional } from '@angular/core';

import { TriggerService } from '../../../angular2-viewport-master';

import { AccountOperation, AccountOperationRenderer } from './account-operation';
import { BankOperation } from './bank-operation';
import { SelectionService } from '../../dnd/selection.service';

import Big = require('big.js/big');

@Component({
  selector: 'account-operation',
  template: `
      <div (vp-in-view)="onEnterViewport();" [vp-in-view-config]="{everyTime: true}"
        (vp-out-view)="onExitViewport();" [vp-out-view-config]="{everyTime: true}"
        [class]="'aam-account-operation z-depth-1 flex-container horizontal ' + customClass + (selected ? ' selected':'')">
        <div [class]="'flex-item fixed24 handle ' + (inViewport ? 'viewport' : '')">&nbsp;</div>
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
export class AccountOperationComponent implements OnInit, OnDestroy {
  @Input()
  accountOperation: AccountOperation;

  @Input()
  partialSum: {value: Big, collectedValue: Big};

  @Input()
  customClass: String = "";

  @Output()
  valueChanged = new EventEmitter<void>();

  @Input()
  selected = false;

  @Output()
  selectedChange = new EventEmitter<boolean>();

  @ViewChild('operationRenderer', {read: ViewContainerRef})
  operationRendererContainer: ViewContainerRef;

  private inViewport = false;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    private changeDetectorRef: ChangeDetectorRef,
    private triggerService: TriggerService,
    private selectionService: SelectionService) { }

  ngOnInit() {
    // Chargement du composant qui va faire le rendu de la ligne de compte
    const factory = this.componentFactoryResolver.resolveComponentFactory(this.accountOperation.getComponentClass());
    const ref = this.operationRendererContainer.createComponent(factory, 0);
    ref.instance.op = this.accountOperation;
    ref.changeDetectorRef.detectChanges();

    // Connect to the valueChanged emitter of the AccountOperation
    this.accountOperation.valueChanged.subscribe(() => {this.onAccountOperationValueChanged();});

    this.triggerViewportCheck();
  }

  ngOnDestroy() {
    this.triggerViewportCheck();
  }

  onAccountOperationValueChanged() {
    this.valueChanged.next();
  }

  onEnterViewport() {
    this.inViewport = true;

    this.changeDetectorRef.reattach();
    this.changeDetectorRef.detectChanges();
  }

  onExitViewport() {
    this.inViewport = false;
    this.changeDetectorRef.detach();
    this.changeDetectorRef.detectChanges();
  }

  triggerViewportCheck() {
    this.triggerService.trigger();
  }
};
