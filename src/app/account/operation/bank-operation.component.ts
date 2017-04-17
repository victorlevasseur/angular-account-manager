import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { AccountOperationRenderer } from './account-operation';
import { BankOperation } from './bank-operation';

@Component({
  selector: 'bank-operation',
  template: `
    <columns-container-row class="bank-operation-container">
      <div column-cell columnName="collected">
        <div style="margin-left: 5px; margin-top: 5px">
          <app-checkbox label="" [(checked)]='op.collected'></app-checkbox>
        </div>
      </div>
      <div column-cell columnName="date">
        <editable-date-field [(value)]="op.date"></editable-date-field>
      </div>
      <div column-cell columnName="type">
        <editable-text-combobox-field
          [(value)]="op.type"
          [echoices]="[{displayString: 'Chèque'}, {displayString: 'Virement'}, {displayString: 'Prélèvement'}, {displayString: 'Chèque n°'}, {displayString: 'Carte bleue'}]" >
        </editable-text-combobox-field>
      </div>
      <div column-cell columnName="description">
        <editable-text-field [(value)]="op.description"></editable-text-field>
      </div>
      <div column-cell columnName="value">
        <editable-currency-field [(value)]="op.value"></editable-currency-field>
      </div>
    </columns-container-row>`,
  styleUrls: ['bank-operation.style.scss']
})
export class BankOperationComponent extends AccountOperationRenderer {
  /* it inherits the inputs and outputs from AccountOperationRenderer */
};
