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
import { ComboboxItem } from '../../../../tools/comboboxitem';

@Component({
  template: `
    <div class="field-editor-container" aam-click-outside-event (clickOutside)="close.emit()">
      <app-combobox
        cbContainerClass="text-field-input"
        [cbValue]="value"
        (cbValueChange)="onInputChange($event);"
        [cbDropdownItems]="choices">
      </app-combobox>
    </div>
  `,
  styleUrls: ['field-editors.style.scss']
})
export class ComboboxFieldEditorComponent extends FieldEditorBase<string> implements AfterViewInit {

  choices: Array<ComboboxItem>;

  @ViewChild('textField', {read: ElementRef})
  inputDOM: ElementRef;

  constructor() {
    super();
  }

  ngAfterViewInit() {

  }

  onInputChange(newValue: string): void {
    this.valueChange.emit(newValue);
  }

  getCustomInputs(): string[] {
    return ['choices'];
  }
}
