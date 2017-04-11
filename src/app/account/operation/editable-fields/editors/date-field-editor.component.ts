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
export class DateFieldEditorComponent implements FieldEditorBase<moment.Moment>, AfterViewInit {
  value: moment.Moment;
  valueChange = new EventEmitter<moment.Moment>();
  close = new EventEmitter<void>();

  @ViewChild('textField', {read: ElementRef})
  inputDOM: ElementRef;

  ngAfterViewInit() {
    this.inputDOM.nativeElement.focus();
  }

  onInputChange(newValue: string) {
    let newDate = moment.utc(this.inputDOM.nativeElement.value, "DD/MM/YYYY");
    this.valueChange.emit(newDate);
  }
}
