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
        <editable-date-field [(value)]="op.date"></editable-date-field>
      </div>
      <div class="flex-item perc4">
        <editable-text-combobox-field
          [(value)]="op.type"
          [echoices]="[{displayString: 'Chèque'}, {displayString: 'Virement'}, {displayString: 'Prélèvement'}, {displayString: 'Chèque n°'}, {displayString: 'Carte bleue'}]" >
        </editable-text-combobox-field>
      </div>
      <div class="flex-item perc13">
        <editable-text-field [(value)]="op.description"></editable-text-field>
      </div>
      <div class="flex-item perc3">
        <editable-currency-field [(value)]="op.value"></editable-currency-field>
      </div>
    </div>`,
  styleUrls: ['bank-operation.style.scss']
})
export class BankOperationComponent extends AccountOperationRenderer {
  /* it inherits the inputs and outputs from AccountOperationRenderer */
};
