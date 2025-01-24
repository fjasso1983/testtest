import { Directive, AfterViewInit } from '@angular/core';

import { UK2_DROPDOWN_ARIA_OWNS } from './constants';

@Directive({
  selector: 'mat-select[uk2Dropdown]',
})
export class Uk2DropdownAriaOwnsDirective implements AfterViewInit {
  ngAfterViewInit() {
    const elements = document.querySelectorAll(`[${UK2_DROPDOWN_ARIA_OWNS.tagInput}]`);
    elements.forEach(element => {
      element.removeAttribute(UK2_DROPDOWN_ARIA_OWNS.tagInput);
    });
  }
}
