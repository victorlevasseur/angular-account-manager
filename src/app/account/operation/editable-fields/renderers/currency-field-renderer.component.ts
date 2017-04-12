import {
  Component,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';

import Big = require('big.js/big');

import { FieldRendererComponent } from './field-renderer.component';

@Component({
  template: `<div class="currency-field-renderer">{{value.toFixed(2)}} €</div>`,
  styleUrls: ['currency-field-editor.style.scss']
})
export class CurrencyFieldRendererComponent extends FieldRendererComponent<Big> {
  value: Big;
};
