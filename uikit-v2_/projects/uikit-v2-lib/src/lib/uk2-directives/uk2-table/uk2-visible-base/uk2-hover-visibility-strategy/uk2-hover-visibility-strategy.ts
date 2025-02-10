import { UK2_TABLE_ELEMENT_VISIBLE_HOVER_CSS_CLASS } from '../../constants';
import { Uk2VisibilityStrategy } from '../interfaces';
import { Uk2VisibleBaseDirective } from '../uk2-visible-base.directive';

export class Uk2HoverVisibilityStrategy implements Uk2VisibilityStrategy<Uk2VisibleBaseDirective> {
  processVisibility(directive: Uk2VisibleBaseDirective): void {
    const targetEl = directive.elementRefNativeElement.querySelector(`.${UK2_TABLE_ELEMENT_VISIBLE_HOVER_CSS_CLASS}`);
    if (!targetEl) return;

    if (directive.uk2IsHovered) {
      targetEl.classList.add('uk2-visible');
      targetEl.classList.remove('uk2-hidden');
    } else {
      targetEl.classList.add('uk2-hidden');
      targetEl.classList.remove('uk2-visible');
    }
  }
}
