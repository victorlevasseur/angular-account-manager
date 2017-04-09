import {
  Component,
  EventEmitter,
  ChangeDetectionStrategy,
  AfterViewInit,
  ViewChild,
  ElementRef
} from '@angular/core';

import { FieldEditorBase } from './field-editor-base';

@Component({
  template: `
    <div class="field-editor-container" aam-click-outside-event (clickOutside)="close.emit()">
      <input #textField class="text-field-input" type="text" [value]="value" (input)="onInputChange($event.target.value);" />
    </div>
  `,
  styleUrls: ['field-editors.style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextFieldEditorComponent implements FieldEditorBase<string>, AfterViewInit {
  value: string;
  valueChange = new EventEmitter<string>();
  valueValidated = new EventEmitter<string>();
  close = new EventEmitter<void>();

  @ViewChild('textField', {read: ElementRef})
  inputDOM: ElementRef;

  ngAfterViewInit() {
    this.inputDOM.nativeElement.focus();
  }

  onInputChange(newValue: string) {
    this.valueChange.emit(newValue);
    this.valueValidated.emit(newValue);
  }
}
