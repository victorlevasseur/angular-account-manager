import {
  Component,
  Input,
  Output,
  EventEmitter,
  ComponentFactory,
  ComponentFactoryResolver,
  ViewContainerRef,
  ChangeDetectorRef,
  OnInit,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
  ComponentRef,
  Optional } from '@angular/core';

import { TriggerService } from '../../../angular2-viewport-master';

import { AccountOperation, AccountOperationRenderer } from './account-operation';
import { AccountOperationRendererService } from './account-operation-renderer.service';
import { BankOperation } from './bank-operation';
import { SelectionService } from '../../dnd/selection.service';

import Big = require('big.js/big');

@Component({
  selector: 'account-operation',
  template: `
      <div (vp-in-view)="onEnterViewport();" [vp-in-view-config]="{everyTime: true, margin: 500}"
        (vp-out-view)="onExitViewport();" [vp-out-view-config]="{everyTime: true, margin: 500}"
        [class]="'aam-account-operation z-depth-1 flex-container horizontal ' + customClass + (selected ? ' selected':'')"
        [style.height]="!inViewport ? accountOperation.getComponentDefaultHeight() + 'px' : 'auto'">
        <div class="flex-item fixed24 handle">&nbsp;</div>
        <div class="flex-item unfixed24 flex-container">
          <div class="flex-item perc18">
            <div #operationRenderer></div>
          </div>
          <div class="flex-item perc6 flex-container horizontal">
            <div *ngIf="partialSum != undefined" class="operation-value flex-item perc12">
              <!--<input
                appCurrencyInput [(currencyValue)]="partialSum.value"
                type="text"
                readonly/>-->{{partialSum.value}}
            </div>
            <div *ngIf="partialSum != undefined" class="operation-collected-value flex-item perc12">
              <!--<input
                appCurrencyInput [(currencyValue)]="partialSum.collectedValue"
                type="text"
                readonly/>-->{{partialSum.collectedValue}}
            </div>
          </div>
        </div>
      </div>
    `,
  styleUrls: ['account-operation.style.scss']
})
export class AccountOperationComponent implements OnInit, OnChanges, OnDestroy {
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

  @ViewChild('operationRenderer', {read: ViewContainerRef})
  operationRendererContainer: ViewContainerRef;

  private inViewport = false;

  private factory: ComponentFactory<AccountOperationRenderer> = null;

  private renderer: ComponentRef<AccountOperationRenderer> = null;

  constructor(
    private accOpRenderer: AccountOperationRendererService,
    private viewContainerRef: ViewContainerRef,
    private changeDetectorRef: ChangeDetectorRef,
    private triggerService: TriggerService,
    private selectionService: SelectionService) {
  }

  ngOnInit() {
    this.factory = this.accOpRenderer.getFactory(this.accountOperation.getComponentClass());

    // Connect to the valueChanged emitter of the AccountOperation
    this.accountOperation.valueChanged.subscribe(() => {this.onAccountOperationValueChanged();});

    this.triggerViewportCheck();
  }

  ngOnChanges(changes: SimpleChanges) {
    if('accountOperation' in changes) {
      if(this.renderer) {
        // Update the renderer operation instance to reflect the change in this component
        this.renderer.instance.op = changes['accountOperation'].currentValue;
      }
    }
  }

  ngOnDestroy() {
    this.triggerViewportCheck();
  }

  onAccountOperationValueChanged() {
    this.valueChanged.next();
  }

  onEnterViewport() {
    this.inViewport = true;

    // Chargement du composant qui va faire le rendu de la ligne de compte
    //TODO: Peut-être le charger depuis le début
    this.operationRendererContainer.clear();
    this.renderer = this.operationRendererContainer.createComponent(this.factory, 0);
    this.renderer.instance.op = this.accountOperation;
    this.renderer.changeDetectorRef.detectChanges();

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
