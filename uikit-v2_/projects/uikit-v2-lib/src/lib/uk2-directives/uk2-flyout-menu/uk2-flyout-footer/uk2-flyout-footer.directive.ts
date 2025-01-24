import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: 'div[uk2FlyoutMenuFooter]',
})
export class Uk2FlyoutMenuFooterDirective {
  @HostBinding('class.uk2-flyout-menu-footer') uk2Class = true;
}
