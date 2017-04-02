import { Directive, Input, HostListener, ElementRef } from '@angular/core';

const $ = require('jquery');

import { SelectionService } from './selection.service';
import { SelectableItemDirective } from './selectable-item.directive';
import { SelectableItemDirectivesListerService } from './selectable-item-directives-lister.service';

@Directive({
  selector: '[aam-dndList]',
  providers: [SelectableItemDirectivesListerService]
})
export class DndListDirective {

  @Input('aam-dndModel')
  model = new Array<any>();

  draggingItems: Array<any> = null;

  constructor(private el: ElementRef, private selectionService: SelectionService, private lister: SelectableItemDirectivesListerService) {

  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if(!this.draggingItems && event.buttons === 1) {
      //Start the drag
      this.draggingItems = this.selectionService.selected.slice();
      this.selectionService.clearSelection();
      this.removeItemsFromModel(this.draggingItems);
    }
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    if(this.draggingItems) {
      let mousePos = event.pageY - $(this.el.nativeElement).offset().top;
      let insertionIndex = this.model.length;

      if(this.lister.selectableItemDirectives.length > 0) {
        if(mousePos < this.getYPositionOfSelectable(this.lister.selectableItemDirectives[0])) {
          insertionIndex = 0;
        }
        else {
          for(let i = 0; i < this.lister.selectableItemDirectives.length; ++i) {
            let sel = this.lister.selectableItemDirectives[i];
            if(mousePos < this.getYPositionOfSelectable(sel) + this.getHeightOfSelectable(sel)/2) {
              insertionIndex = i+1;
              break;
            }
          }
        }
      }

      this.insertAndSelectItemsInModel(this.draggingItems, insertionIndex);
      this.draggingItems = null;
    }
  }

  private getYPositionOfSelectable(selectableItem: SelectableItemDirective) {
    return selectableItem.el.nativeElement.offsetTop;
  }

  private getHeightOfSelectable(selectableItem: SelectableItemDirective) {
    return selectableItem.el.nativeElement.offsetHeight;
  }

  private removeItemsFromModel(itemsToRemove: Array<any>) {
    itemsToRemove.forEach((item: any) => {
      let itemIndex = this.model.indexOf(item);
      if(itemIndex === -1) {
        return;
      }
      this.model.splice(itemIndex, 1);
    });
  }

  private insertAndSelectItemsInModel(itemsToAdd: Array<any>, at: number) {
    if(at < 0 || at > this.model.length) {
      //TODO: Throw instead ?
      return;
    }

    Array.prototype.splice.apply(this.model, [at, 0].concat(itemsToAdd));
    this.selectionService.setSelection(itemsToAdd.slice());
  }
}
