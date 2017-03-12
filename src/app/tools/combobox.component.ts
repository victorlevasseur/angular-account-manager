import { Component, Input, Output, EventEmitter, ComponentFactoryResolver, ViewContainerRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-combobox',
  template: `
    <div class="flex-container horizontal">
      <input [class]="'flex-item unfixed32 ' + inputClass" type="text" [value]="value" (input)="valueChange.emit($event.target.value)"/>
      <div class="flex-item fixed32">
        <a [class]="'btn-flat dropdown-button ' + buttonClass"><i class="material-icons">arrow_drop_down</i></a>
      </div>
    </div>
  `,
  styles: [`
    .btn-flat {
      padding-left: 5px;
      padding-right: 5px;
      box-sizing: border-box;
    }
  `]
})
export class ComboboxComponent implements AfterViewInit {
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

  ngAfterViewInit() {

  }
}
