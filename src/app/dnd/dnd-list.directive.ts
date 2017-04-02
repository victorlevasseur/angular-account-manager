import { Directive, Input, HostListener, HostBinding, ElementRef } from '@angular/core';

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

  @HostBinding('style.cursor')
  cursor: string;

  private mouseDragging = false;

  constructor(private el: ElementRef, private selectionService: SelectionService, private lister: SelectableItemDirectivesListerService) {

  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if(!this.draggingItems && !this.mouseDragging && event.buttons === 1) {
      this.mouseDragging = true; //To avoid starting d&d in the middle of a refused drag

      if(!this.isOnSelectedHandle(event.target))
        return;

      //Start the drag
      this.draggingItems = this.selectionService.selected.slice();
      this.selectionService.clearSelection();
      this.removeItemsFromModel(this.draggingItems);
      this.cursor = '-webkit-grabbing';
    }
    else if(this.draggingItems) {
      return false;
    }
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    if(this.draggingItems) {
      this.dropItemsAt(event.pageY - $(this.el.nativeElement).offset().top);
      this.cursor = undefined;
      this.mouseDragging = false;
    }
  }

  @HostListener('body:mouseleave')
  onMouseLeaveWindow() {
    if(this.draggingItems) {
      this.dropItemsAt(0);
    }
  }

  private isOnSelectedHandle(target): boolean {
    //Check if the target is in an handle of a selected element
    for(let i = 0; i < this.selectionService.selected.length; ++i) {
      // Get the directive associated with the item
      let selectedItem = this.selectionService.selected[i];
      let associatedDirective = this.lister.getSelectableItemDirective(selectedItem);

      // Get all the handles in the element
      let jqueryEl = $(associatedDirective.el.nativeElement);
      let handles = jqueryEl.find(associatedDirective.dndHandleSelector);
      for(let j = 0; j < handles.size(); ++j) {
        let handle = handles.get(j);
        if($.contains(handle, target) || handle == target) {
          return true;
        }
      }
    }

    return false;
  }

  private dropItemsAt(y: number): void {
    if(this.draggingItems) {
      let mousePos = y;
      let insertionIndex = this.model.length;

      if(this.lister.selectableItemDirectives.length > 0) {
        if(mousePos < this.getYPositionOfSelectable(this.lister.selectableItemDirectives[0])) {
          insertionIndex = 0;
        }
        else {
          for(let i = 0; i < this.lister.selectableItemDirectives.length; ++i) {
            let sel = this.lister.selectableItemDirectives[i];
            if(mousePos < this.getYPositionOfSelectable(sel) + this.getHeightOfSelectable(sel)/2) {
              insertionIndex = i;
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
