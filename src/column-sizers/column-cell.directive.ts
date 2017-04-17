import {
  Directive,
  Input,
  HostBinding,
  OnInit
} from '@angular/core';

import { ColumnsSizesService } from './columns-sizes.service';

@Directive({
  selector: '[column-cell]',
})
export class ColumnCellDirective implements OnInit {
  @Input()
  columnName: string;

  @HostBinding('style.width.px')
  size: number;

  @HostBinding('style.flex-grow')
  expand: number = 0;

  constructor(private columnsSizesService: ColumnsSizesService) {
    this.columnsSizesService.sizesChange.subscribe(() => {
      this.updateHostBindings();
    })
  }

  ngOnInit() {
    this.updateHostBindings();
  }

  updateHostBindings(): void {
    let newSize = this.columnsSizesService.getSize(this.columnName);
    if(newSize !== -1) {
      this.size = newSize;
      this.expand = undefined;
    }
    else {
      this.size = undefined;
      this.expand = 1;
    }
  }
}
