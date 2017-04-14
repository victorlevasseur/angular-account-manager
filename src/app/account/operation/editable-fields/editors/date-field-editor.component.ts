import {
  Component,
  EventEmitter,
  ChangeDetectionStrategy,
  AfterViewInit,
  ViewChild,
  ElementRef
} from '@angular/core';

import * as moment from 'moment';

import { FieldEditorBase } from './field-editor-base';

@Component({
  template: `
    <div class="field-editor-container" aam-click-outside-event (clickOutside)="close.emit()">
      <input #textField class="text-field-input" type="text" [value]="value?.utc().format('DD/MM/YYYY')" (input)="onInputChange($event.target.value);" />
    </div>
  `,
  styleUrls: ['field-editors.style.scss']
})
export class DateFieldEditorComponent extends FieldEditorBase<moment.Moment> implements AfterViewInit {

  @ViewChild('textField', {read: ElementRef})
  inputDOM: ElementRef;

  constructor() {
    super();
  }

  ngAfterViewInit() {
    this.inputDOM.nativeElement.focus();
  }

  onInputChange(newValue: string) {
    let newDate = moment.utc(this.inputDOM.nativeElement.value, "DD/MM/YYYY");
    this.valueChange.emit(newDate);
  }

  getCustomInputs(): string[] {
    return [];
  }
}
