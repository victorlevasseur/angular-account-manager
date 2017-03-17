import { Component, Input, Output, EventEmitter, ComponentFactoryResolver, ViewContainerRef, OnInit, ViewChild } from '@angular/core';

import { UniqueNumberService } from './unique-number.service';
import { ComboboxItem } from './comboboxitem';

@Component({
  selector: 'app-combobox',
  template: `
    <div materialize class="flex-container horizontal">
      <input [class]="'flex-item unfixed32 ' + inputClass" type="text" [value]="value" (input)="valueChange.emit($event.target.value)"/>
      <div class="flex-item fixed32">
        <a materialize='dropdown' [materializeParams]="[{hover: false, alignment: 'right', constrainWidth: false}]"
          [class]="'btn-flat dropdown-button ' + buttonClass"
          [attr.data-activates]="'dropdown-' + id">
          <i class="material-icons">arrow_drop_down</i>
        </a>
      </div>
      <ul [id]="'dropdown-' + id" class='dropdown-content'>
        <li
          [class.selected]="item.value ? (item.value === value) : (item.displayString === value)"
          *ngFor="let item of dropdownItems;">
          <a (click)="onItemClicked(item);">
            {{item.displayString}}
          </a>
        </li>
      </ul>
    </div>
  `,
  styles: [`
    .btn-flat {
      padding-left: 5px;
      padding-right: 5px;
      box-sizing: border-box;
    }

    .dropdown-content li.selected {
      background-color: $primary-color-light;
    }
  `]
})
export class ComboboxComponent implements OnInit {
  @Input('cbValue')
  value: string;

  @Output('cbValueChange')
  valueChange = new EventEmitter<string>();

  @Input('cbInputClass')
  inputClass: string = '';

  @Input('cbButtonClass')
  buttonClass: string = '';

  @Input('cbDropdownClass')
  dropdownClass: string = '';

  @Input('cbDropdownItems')
  dropdownItems: Array<ComboboxItem>;

  @Output('cbDropdownItemSelected')
  dropdownItemSelected = new EventEmitter<ComboboxItem>();

  id: number;

  constructor(private uniqueNumberSrv: UniqueNumberService) {
    this.id = uniqueNumberSrv.getUniqueNumber();
  }

  ngOnInit() {
    // If the output is not connected, connect it to the default callback
    // which just set the combobox value according
    if(this.dropdownItemSelected.observers.length == 0) {
      this.dropdownItemSelected.subscribe((selected: ComboboxItem) => {
        this.value = selected.value != null ? selected.value : selected.displayString;
      });
    }
  }

  onItemClicked(item: ComboboxItem) {
    this.dropdownItemSelected.emit(item);
  }
}
