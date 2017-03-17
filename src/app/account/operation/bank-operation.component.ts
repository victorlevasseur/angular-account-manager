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
        <app-combobox
          cbButtonClass="show-if-operation-hovered"
          [(cbValue)]="op.type"
          [cbDropdownItems]="[{displayString: 'Chèque'}, {displayString: 'Virement'}, {displayString: 'Prélèvement'}, {displayString: 'Chèque n°'}, {displayString: 'Carte bleue'}]">
        </app-combobox>
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
