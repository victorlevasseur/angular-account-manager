import { Component, Input, Output, EventEmitter, ComponentFactoryResolver, ViewContainerRef, OnInit, ViewChild } from '@angular/core';
import { AccountOperation, AccountOperationRenderer } from './account-operation';

@Component({
  selector: 'account-operation',
  template: `
      <div class="row">
        <div class="card horizontal">
          <div class="card-image handle waves-effect waves-light"></div>
          <div class="card-content">
            <div class="col l10">
              <div #operationRenderer></div>
            </div>
            <div class="operation-value col l1">
              <input
                class="currency"
                type="text"
                [value]="accountOperation.partialSum + ' €'"
                readonly/>
            </div>
            <div class="operation-collected-value col l1">
              <input
                class="currency"
                type="text"
                [value]="accountOperation.partialCollectedSum + ' €'"
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
