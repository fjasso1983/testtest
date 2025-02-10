import { UK2_TABLE_ELEMENT_VISIBLE_SELECTED_AND_HOVER_CSS_CLASS } from '../../constants';
import { Uk2VisibleUntilSelectedAndHoverDirective } from '../../uk2-visible-until-selected-and-hover';
import { Uk2VisibilityStrategy } from '../interfaces';

export class Uk2SelectedAndHoverVisibilityStrategy
  implements Uk2VisibilityStrategy<Uk2VisibleUntilSelectedAndHoverDirective>
{
  processVisibility(directive: Uk2VisibleUntilSelectedAndHoverDirective): void {
    const targetEl = directive.elementRefNativeElement.querySelector(
      `.${UK2_TABLE_ELEMENT_VISIBLE_SELECTED_AND_HOVER_CSS_CLASS}`
    );
    if (!targetEl) return;

    if (directive.getCheckboxCheckedState() && directive.uk2IsHovered) {
      targetEl.classList.add('uk2-visible');
      targetEl.classList.remove('uk2-hidden');
    } else {
      targetEl.classList.add('uk2-hidden');
      targetEl.classList.remove('uk2-visible');
    }
  }
}
