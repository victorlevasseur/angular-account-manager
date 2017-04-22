import {
  Component,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';

import Big = require('big.js/big');

import { FieldRendererComponent } from './field-renderer.component';

@Component({
  template: `<div [class]="'field-renderer currency-field-renderer ' + (colorize === true ? (value >= 0 ? 'positive' : 'negative') : '')">{{value?.toFixed(2)}} €</div>`,
  styleUrls: ['field-renderer.style.scss', 'currency-field-renderer.style.scss']
})
export class CurrencyFieldRendererComponent extends FieldRendererComponent<Big> {
  value: Big;
  colorize = true;

  getCustomInputs() : string[] {
    return ['colorize'];
  }
};
