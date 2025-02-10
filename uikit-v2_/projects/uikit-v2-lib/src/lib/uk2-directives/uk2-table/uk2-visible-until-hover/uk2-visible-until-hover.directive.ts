import { Directive } from '@angular/core';
import { Uk2HoverVisibilityStrategy, Uk2VisibleBaseDirective } from '../uk2-visible-base';

@Directive({
  selector: 'mat-row[uk2VisibleUntilHover]',
})
export class Uk2VisibleUntilHoverDirective extends Uk2VisibleBaseDirective {
  constructor() {
    super(new Uk2HoverVisibilityStrategy());
  }
}
