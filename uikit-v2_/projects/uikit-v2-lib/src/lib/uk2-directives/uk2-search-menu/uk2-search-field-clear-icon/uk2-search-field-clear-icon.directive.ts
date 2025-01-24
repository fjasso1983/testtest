import { Directive, HostBinding, HostListener, Input } from '@angular/core';

import { Uk2SearchMenuDirective } from '../uk2-search-menu.directive';

@Directive({
  selector: '[uk2SearchInputClearIcon]',
})
export class Uk2SearchInputClearIconDirective {
  @Input() uk2SearchMenu!: Uk2SearchMenuDirective;

  @HostBinding('class.uk2-search-input-icon') get uk2SearchInputIconClass() {
    return true;
  }
  @HostBinding('class.uk2-search-clear-input-icon') get uk2SearchInputClearIconClass() {
    return true;
  }
  @HostBinding('type') get uk2SearchInputClearIconType() {
    return 'button';
  }
  @HostBinding('attr.aria-label') get uk2SearchInputClearIconAriaLabel() {
    return 'Clear search input';
  }

  @HostListener('keydown.tab', ['$event']) handleTabKey(event: Event) {
    this.uk2SearchMenu?.focusOverlay(event);
  }

  @HostListener('click', ['$event']) handleClick(event: Event) {
    event.preventDefault();
    this.uk2SearchMenu.clearInputAndFocus();
  }

  @HostListener('keydown.enter', ['$event']) handleEnterKey(event: Event) {
    event.preventDefault();
  }

  @HostListener('keyup.enter', ['$event']) handleEnterKeyUp(event: Event) {
    event.preventDefault();
    this.uk2SearchMenu.clearInputAndFocus();
  }
}
