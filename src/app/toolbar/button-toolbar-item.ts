import { Component, OnInit, Input } from '@angular/core';

import { ToolbarItem } from './toolbar-item';

@Component({
  template: `
    <div class="aam-toolbar-button" (click)="onClicked();">
      <span *ngIf="icon && icon != ''">aa</span>
      {{item.text}}
    </div>
  `
})
export class ButtonToolbarItemComponent {
  @Input()
  item: ButtonToolbarItem;

  onClicked(): void {
    if(this.item.clickedCallback)
      this.item.clickedCallback(this);
  }
}

export interface ButtonItemData {
  icon?: string;
  text: string;
  clickedCallback?: (ButtonToolbarItemComponent) => void;
}

export class ButtonToolbarItem implements ToolbarItem, ButtonItemData {
  type = ButtonToolbarItemComponent;
  icon: string = '';
  text: string;
  clickedCallback: (ButtonToolbarItemComponent) => void = function(item){ alert('aa'); };

  constructor(data: ButtonItemData) {
    Object.assign(this, data);
  }
}