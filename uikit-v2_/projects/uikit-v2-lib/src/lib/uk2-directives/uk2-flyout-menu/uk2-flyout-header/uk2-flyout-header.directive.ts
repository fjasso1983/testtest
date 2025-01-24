import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: 'div[uk2FlyoutMenuHeader]',
})
export class Uk2FlyoutMenuHeaderDirective {
  @HostBinding('class.uk2-flyout-menu-header') uk2Class = true;
}
