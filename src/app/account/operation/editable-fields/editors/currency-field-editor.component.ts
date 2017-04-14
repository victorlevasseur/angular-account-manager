import {
  Component,
  EventEmitter,
  ChangeDetectionStrategy,
  AfterViewInit,
  ViewChild,
  ElementRef
} from '@angular/core';

import Big = require('big.js/big');

import { FieldEditorBase } from './field-editor-base';

@Component({
  template: `
    <div class="field-editor-container" aam-click-outside-event (clickOutside)="close.emit()">
      <input #textField class="text-field-input currency-field-input" type="text" [value]="value" (input)="onInputChange($event.target.value);" />
    </div>
  `,
  styleUrls: ['field-editors.style.scss', 'currency-field-editor.style.scss']
})
export class CurrencyFieldEditorComponent extends FieldEditorBase<Big> implements AfterViewInit {

  @ViewChild('textField', {read: ElementRef})
  inputDOM: ElementRef;

  constructor() {
    super();
  }

  ngAfterViewInit() {
    this.inputDOM.nativeElement.focus();
    this.inputDOM.nativeElement.select();
  }

  onInputChange(newValue: string) {
    if(newValue !== '') {
      try {
        let newCurrency = new Big(newValue);
        this.valueChange.emit(newCurrency);
      }
      catch(err) { }
    }
    else {
      this.valueChange.emit(new Big(0));
    }
  }

  getCustomInputs(): string[] {
    return [];
  }
}
