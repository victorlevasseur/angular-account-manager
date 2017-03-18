import { Tab } from './tab';

export class TabsList
{
  tabs: Array<Tab>;
  selected = null;

  constructor(tabs: Array<Tab> = null) {
    this.tabs = tabs ? tabs : new Array<Tab>();

    if(this.tabs && this.tabs.length > 0) {
      this.selected = this.tabs[0];
    }
  }
}
