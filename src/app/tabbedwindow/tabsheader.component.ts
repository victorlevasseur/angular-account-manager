import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { Tab } from './tab';
import { TabsList } from './tabslist';

@Component({
    selector: 'app-tabs-header',
    template: `
      <ul class="tabs tabs-transparent">
        <li *ngFor="let tab of tabsList.tabs;" class="tab" (click)="tabHeaderClicked(tab)">
          <ul><a class="left">{{tab.getTabTitle()}}</a></ul>
        </li>
      </ul>
    `,
})
export class TabsHeaderComponent {
  @Input('tabsList')
  tabsList: TabsList;

  tabHeaderClicked(tab: Tab) {
    this.tabsList.selected = tab;
  }
}
