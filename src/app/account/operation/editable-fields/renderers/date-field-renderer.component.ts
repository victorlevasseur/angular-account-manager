import {
  Component,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';

import * as moment from 'moment';

import { FieldRendererComponent } from './field-renderer.component';

@Component({
  template: `{{value?.utc().format('DD/MM/YYYY')}}`
})
export class DateFieldRendererComponent extends FieldRendererComponent<moment.Moment> {
  value: moment.Moment;
};
