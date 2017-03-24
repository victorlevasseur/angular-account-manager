import { Component, Input, Output, EventEmitter, ComponentFactoryResolver, ViewContainerRef, OnInit, ViewChild } from '@angular/core';

import { UniqueNumberService } from './unique-number.service';
import { ComboboxItem } from './comboboxitem';

@Component({
  selector: 'app-combobox',
  template: `
    <div materialize class="flex-container horizontal">
      <input [class]="'flex-item unfixed32 ' + inputClass" type="text" [value]="value" (input)="valueChange.emit($event.target.value)"/>
      <div class="flex-item fixed32">
        <div class="dropdown">
          <button [class]="'btn btn-flat dropdown-bt ' + buttonClass" (click)="onDropdownButtonClicked()"><!--<i class="material-icons">arrow_drop_down</i>-->V</button>
          <ul [class]="'dropdown-menu ' + dropdownClass" [class.show]="open">
            <li
              [class.selected]="item.value ? (item.value === value) : (item.displayString === value)"
              *ngFor="let item of dropdownItems;"
              (click)="onItemClicked(item);">
              {{item.displayString}}
            </li>
          </ul>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./combobox.style.scss']
})
export class ComboboxComponent implements OnInit {
  open = false

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

  onDropdownButtonClicked() {
    this.open = !this.open;
  }

  onItemClicked(item: ComboboxItem) {
    this.open = false;
    this.dropdownItemSelected.emit(item);
  }
}
