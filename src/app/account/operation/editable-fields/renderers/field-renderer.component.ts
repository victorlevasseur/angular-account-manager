import {
  Component,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  template: `{{value}}`
})
export class FieldRendererComponent<T> {
  value: T;
};
