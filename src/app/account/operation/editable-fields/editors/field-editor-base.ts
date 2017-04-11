import {
  EventEmitter
} from '@angular/core';

/**
 * Interface for field editors components.
 *
 * These components are created dynamically by FieldComponent derived classes
 * when the user wants to edit their field.
 */
export interface FieldEditorBase<T> {
  /// The input value
  value: T;

  /// Emits on every change of the value
  valueChange: EventEmitter<T>;

  /// Emits when the editor wants to close
  close: EventEmitter<void>;
}
