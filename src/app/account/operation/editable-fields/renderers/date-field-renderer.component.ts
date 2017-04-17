import {
  Component,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';

import * as moment from 'moment';

import { FieldRendererComponent } from './field-renderer.component';

@Component({
  template: `<div class="field-renderer">{{value?.utc().format('DD/MM/YYYY')}}</div>`,
  styleUrls: ['field-renderer.style.scss']
})
export class DateFieldRendererComponent extends FieldRendererComponent<moment.Moment> {
  value: moment.Moment;
};
