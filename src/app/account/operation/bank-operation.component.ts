import { Component, Input } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { AccountOperationRenderer } from './account-operation';
import { BankOperation } from './bank-operation';

@Component({
  selector: 'bank-operation',
  template: `
    <div class="" materialize>
      <div class="col l1">
        <div class="switch">
          <label>
            <input type="checkbox" [(ngModel)]="op.collected">
            <span class="lever"></span>
          </label>
        </div>
      </div>
      <div class="col l2">
        <input type="text" placeholder="Date" [(ngModel)]="op.date"/>
      </div>
      <div class="col l2">
        <input type="text" placeholder="Type" [(ngModel)]="op.type"/>
      </div>
      <div class="col l3">
        <input type="text" placeholder="Description" [(ngModel)]="op.description"/>
      </div>
      <div class="col l2">
        <input class="currency validate" type="text" pattern="[0-9]*\.[0-9]{0,2}" placeholder="Crédit" [(ngModel)]="op.credit"/>
      </div>
      <div class="col l2">
        <input class="currency" type="text" placeholder="Débit" [(ngModel)]="op.debit"/>
      </div>
    </div>`,
  styleUrls: ['bank-operation.style.scss']
})
export class BankOperationComponent extends AccountOperationRenderer {
  /* it inherits the inputs and outputs from AccountOperationRenderer */
};
