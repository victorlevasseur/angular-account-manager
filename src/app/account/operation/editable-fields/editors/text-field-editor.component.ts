import {
  Component,
  EventEmitter,
  ChangeDetectionStrategy,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef
} from '@angular/core';

import { FieldEditorBase } from './field-editor-base';

@Component({
  template: `
    <div class="field-editor-container" aam-click-outside-event (clickOutside)="close.emit()">
      <input
        #textField
        class="text-field-input"
        type="text"
        [value]="value"
        (input)="onInputChange($event.target.value);" />
    </div>
  `,
  styleUrls: ['field-editors.style.scss']
})
export class TextFieldEditorComponent extends FieldEditorBase<string> implements AfterViewInit {

  @ViewChild('textField', {read: ElementRef})
  inputDOM: ElementRef;

  constructor() {
    super();

    console.log(this);
  }

  ngAfterViewInit() {
    this.inputDOM.nativeElement.focus();
  }

  onInputChange(newValue: string): void {
    this.valueChange.emit(newValue);
  }

  getCustomInputs(): string[] {
    return [];
  }
}
