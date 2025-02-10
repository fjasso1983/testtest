import { Directive, HostBinding } from '@angular/core';
import { UK2_TABLE_ELEMENT_VISIBLE_HOVER_CSS_CLASS } from '../constants';

@Directive({
  selector: '[uk2VisibleUntilHoverElement]',
})
export class Uk2VisibleUntilHoverElementDirective {
  @HostBinding(`class.${UK2_TABLE_ELEMENT_VISIBLE_HOVER_CSS_CLASS}`) uk2TableRowHoverVisibilityClass = true;
}
