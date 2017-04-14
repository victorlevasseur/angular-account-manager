import {
  EventEmitter
} from '@angular/core';

/**
 * Interface for field editors components.
 *
 * These components are created dynamically by FieldComponent derived classes
 * when the user wants to edit their field.
 */
export class FieldEditorBase<T> {
  /// The input value
  public value: T;

  /// Emits on every change of the value
  public valueChange = new EventEmitter<T>();

  /// Emits when the editor wants to close
  public close = new EventEmitter<void>();

  /**
   * The editor must declare the custom "inputs" that he needs
   * so that the editable field can update them from its own "e-"-prefixed inputs.
   *
   * Example: an editor declares a "list" custom input, then the editable field
   * will set and update it from its own "e-list" @Input.
   */
  getCustomInputs(): string[] {
    return [];
  }

  /**
   * Tells whether an editor closes on Enter or not.
   * true by default
   */
  closesOnEnter(): boolean {
    return true;
  }
}
