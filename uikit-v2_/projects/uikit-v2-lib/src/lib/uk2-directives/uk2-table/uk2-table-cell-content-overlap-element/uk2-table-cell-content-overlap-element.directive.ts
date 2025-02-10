import { Directive, HostBinding, Input } from '@angular/core';
import { UK2_BUTTON_OVERLAP_ON_CELL_CONTENT_CLASS } from '../constants';
@Directive({
  selector: '[uk2TableCellContentOverlapElement]',
})
export class Uk2TableCellContentOverlapElementDirective {
  @HostBinding(`class.${UK2_BUTTON_OVERLAP_ON_CELL_CONTENT_CLASS}`)
  @Input()
  uk2OverlapCellContent = true;
}
