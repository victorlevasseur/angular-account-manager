import { Component, ComponentFactoryResolver, ViewContainerRef, OnInit, ViewChild, Input } from '@angular/core';

import { Tab } from './tab';

@Component({
  selector: "tab",
  template: `
    <div [id]="tabId">
      <div #tabContent></div>
    </div>
    `
})
export class TabComponent implements OnInit {
  @Input()
  tabId: string;

  @Input()
  tab: Tab;

  @ViewChild('tabContent', {read: ViewContainerRef})
  tabContent: ViewContainerRef;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    this.tab.createComponent(this.componentFactoryResolver, this.viewContainerRef);
  }
}
