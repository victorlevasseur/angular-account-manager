import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { Tab } from './tab';
import { TabsList } from './tabslist';

@Component({
    selector: 'app-tabs-container',
    template: `
      <div *ngFor="let tab of tabsList.tabs;" [hidden]="tabsList.selected != tab">
        <tab [tab]="tab"></tab>
      </div>
    `,
})
export class TabsContainerComponent {
  @Input('tabsList')
  tabsList: TabsList;
}
