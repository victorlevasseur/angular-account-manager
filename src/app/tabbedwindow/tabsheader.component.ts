import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { Tab } from './tab';
import { TabsList } from './tabslist';

@Component({
    selector: 'app-tabs-header',
    template: `
      <ul class="aam-tabs">
        <li *ngFor="let tab of tabsList.tabs;" class="aam-tab" [class.selected]="tabsList.selected === tab" (click)="tabHeaderClicked(tab)">
          {{tab.getTabTitle()}}
        </li>
      </ul>
    `,
    styleUrls: ['./tabsheader.style.scss']
})
export class TabsHeaderComponent {
  @Input('tabsList')
  tabsList: TabsList;

  tabHeaderClicked(tab: Tab) {
    this.tabsList.selected = tab;
  }
}
