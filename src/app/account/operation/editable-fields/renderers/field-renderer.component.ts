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

  /**
   * The renderer must declare the custom "inputs" that he needs
   * so that the editable field can update them from its own "r-"-prefixed inputs.
   *
   * Example: a renderer declares a "list" custom input, then the editable field
   * will set and update it from its own "r-list" @Input.
   */
  getCustomInputs(): string[] {
    return [];
  }
};
