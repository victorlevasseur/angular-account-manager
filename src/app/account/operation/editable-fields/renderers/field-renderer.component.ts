import {
  Component,
  Input
} from '@angular/core';

@Component({
  template: `{{value}}`
})
export class FieldRendererComponent<T> {
  @Input()
  value: T;
};
