import { Directive } from '@angular/core';

import { Uk2SelectedAndHoverVisibilityStrategy, Uk2VisibleBaseDirective } from '../uk2-visible-base';

@Directive({
  selector: 'mat-row[uk2VisibleUntilSelectedAndHover]',
})
export class Uk2VisibleUntilSelectedAndHoverDirective extends Uk2VisibleBaseDirective {
  constructor() {
    super(new Uk2SelectedAndHoverVisibilityStrategy());
  }

  getCheckboxCheckedState(): boolean {
    const checkbox = this.nativeElement.querySelector('input[type="checkbox"]') as HTMLInputElement;
    return checkbox?.checked || false;
  }
}
