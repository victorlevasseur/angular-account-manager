import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { AccountOperationRenderer } from './account-operation';
import { BankOperation } from './bank-operation';

@Component({
  selector: 'bank-operation',
  template: `
    <div class="flex-container horizontal bank-operation-container">
      <div class="flex-item perc1">
        <div style="margin-left: 5px; margin-top: 5px">
          <app-checkbox label="" [(checked)]='op.collected'></app-checkbox>
        </div>
      </div>
      <div class="flex-item perc3">
        {{op.date|date:'dd/MM/y'}}
        <!--<input appDateInput aam-doubleclickInput [(dateValue)]="op.date" type="text" placeholder="Date"/>-->
      </div>
      <div class="flex-item perc4">
        <!--<app-combobox aam-doubleclickInput
          cbContainerClass="full-height"
          [(cbValue)]="op.type"
          [cbDropdownItems]="[{displayString: 'Chèque'}, {displayString: 'Virement'}, {displayString: 'Prélèvement'}, {displayString: 'Chèque n°'}, {displayString: 'Carte bleue'}]">
        </app-combobox>-->
        {{op.type}}
      </div>
      <div class="flex-item perc10">
        <!--<input aam-doubleclickInput type="text" placeholder="Description" [(ngModel)]="op.description"/>-->
        <editable-text-field [(value)]="op.description"></editable-text-field>
      </div>
      <div class="flex-item perc3">
        <!--<input appCurrencyInput aam-doubleclickInput [(currencyValue)]="op.credit" type="text" placeholder="Crédit" />-->
        {{op.credit}}
      </div>
      <div class="flex-item perc3">
        {{op.debit}}
        <!--<input appCurrencyInput aam-doubleclickInput [(currencyValue)]="op.debit" type="text" placeholder="Débit" />-->
      </div>
    </div>`,
  styleUrls: ['bank-operation.style.scss']
})
export class BankOperationComponent extends AccountOperationRenderer {
  /* it inherits the inputs and outputs from AccountOperationRenderer */
};
