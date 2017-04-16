import { Component, Input, Output, EventEmitter, ComponentFactoryResolver, ViewContainerRef, OnInit, ViewChild } from '@angular/core';

import { UniqueNumberService } from './unique-number.service';
import { ComboboxItem } from './comboboxitem';

@Component({
  selector: 'dropdown-button',
  template: `
    <div
      [class]="'dropdown-bt ' + buttonClass"
      (click)="onDropdownButtonClicked()"
      (mouseleave)="onMouseLeave();">
      <ng-content select="[buttonHtml]"></ng-content>
      <div class="dropdown">
        <ul [class]="'dropdown-menu ' + dropdownClass" [class.show]="open">
          <ng-content select="[dropdownItem]"></ng-content>
        </ul>
      </div>
    </div>
  `,
  styleUrls: ['./dropdown-button.style.scss']
})
export class DropdownButtonComponent implements OnInit {
  open = false;

  @Input('buttonClass')
  buttonClass: string = '';

  @Input('dropdownClass')
  dropdownClass: string = '';

  constructor() {

  }

  ngOnInit() {

  }

  onDropdownButtonClicked() {
    this.open = !this.open;
  }

  onMouseLeave() {
    this.open = false;
  }
}
