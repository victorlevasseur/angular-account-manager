import { Component, Input } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { AccountOperationRenderer } from './account-operation';
import { BankOperation } from './bank-operation';

@Component({
  selector: 'bank-operation',
  template: `
    <div class="flex-container horizontal" materialize>
      <div class="flex-item perc2 valign-wrapper">
        <div class="switch valign">
          <label>
            <input type="checkbox" [(ngModel)]="op.collected">
            <span class="lever"></span>
          </label>
        </div>
      </div>
      <div class="flex-item perc3">
        <input appDateInput [(dateValue)]="op.date" type="text" placeholder="Date"/>
      </div>
      <div class="flex-item perc4">
        <input type="text" placeholder="Type" [(ngModel)]="op.type"/>
      </div>
      <div class="flex-item perc9">
        <input type="text" placeholder="Description" [(ngModel)]="op.description"/>
      </div>
      <div class="flex-item perc3">
        <input appCurrencyInput [(currencyValue)]="op.credit" type="text" placeholder="Crédit" />
      </div>
      <div class="flex-item perc3">
        <input appCurrencyInput [(currencyValue)]="op.debit" type="text" placeholder="Débit" />
      </div>
    </div>`,
  styleUrls: ['bank-operation.style.scss']
})
export class BankOperationComponent extends AccountOperationRenderer {
  /* it inherits the inputs and outputs from AccountOperationRenderer */
};
