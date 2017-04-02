import { Injectable } from '@angular/core';
import { SelectableItemDirective } from './selectable-item.directive';

@Injectable()
export class SelectableItemDirectivesListerService {

  selectableItemDirectives = new Array<SelectableItemDirective>();

  constructor() {

  }

  getSelectableItemDirective(item: any): SelectableItemDirective {
    for(let i = 0; i < this.selectableItemDirectives.length; ++i) {
      let directive = this.selectableItemDirectives[i];
      if(directive.trackBy === item) {
        return directive;
      }
    }
    return null;
  }

  registerDirective(directive: SelectableItemDirective) {
    this.selectableItemDirectives.push(directive);
  }

  unregisterDirective(directive: SelectableItemDirective) {
    let i = this.selectableItemDirectives.indexOf(directive);
    if(i < 0) {
      return;
    }
    this.selectableItemDirectives.splice(i, 1);
  }
}
