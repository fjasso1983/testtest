import { Directive, HostBinding } from '@angular/core';

import { UK2_TABLE_ELEMENT_VISIBLE_SELECTED_AND_HOVER_CSS_CLASS } from '../constants';

@Directive({
  selector: '[uk2VisibleUntilSelectedAndHoverElement]',
})
export class Uk2VisibleUntilSelectedAndHoverElementDirective {
  @HostBinding(`class.${UK2_TABLE_ELEMENT_VISIBLE_SELECTED_AND_HOVER_CSS_CLASS}`) uk2Class = true;
}
