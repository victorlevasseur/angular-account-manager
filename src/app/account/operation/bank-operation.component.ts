import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { AccountOperationRenderer } from './account-operation';
import { BankOperation } from './bank-operation';

@Component({
  selector: 'bank-operation',
  template: `
    <div class="flex-container horizontal" materialize>
      <div class="flex-item perc1">
        <div style="margin-left: 5px; margin-top: 5px">
          <app-checkbox label="" [(checked)]='op.collected'></app-checkbox>
        </div>
      </div>
      <div class="flex-item perc3">
        <input appDateInput aam-doubleclickInput [(dateValue)]="op.date" type="text" placeholder="Date"/>
      </div>
      <div class="flex-item perc4">
        <app-combobox aam-doubleclickInput
          cbContainerClass="full-height"
          [(cbValue)]="op.type"
          [cbDropdownItems]="[{displayString: 'Chèque'}, {displayString: 'Virement'}, {displayString: 'Prélèvement'}, {displayString: 'Chèque n°'}, {displayString: 'Carte bleue'}]">
        </app-combobox>
      </div>
      <div class="flex-item perc10">
        <input aam-doubleclickInput type="text" placeholder="Description" [(ngModel)]="op.description"/>
      </div>
      <div class="flex-item perc3">
        <input appCurrencyInput aam-doubleclickInput [(currencyValue)]="op.credit" type="text" placeholder="Crédit" />
      </div>
      <div class="flex-item perc3">
        <input appCurrencyInput aam-doubleclickInput [(currencyValue)]="op.debit" type="text" placeholder="Débit" />
      </div>
    </div>`,
  styleUrls: ['bank-operation.style.scss']
})
export class BankOperationComponent extends AccountOperationRenderer {
  /* it inherits the inputs and outputs from AccountOperationRenderer */
};
