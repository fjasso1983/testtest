import { Directive, ElementRef } from '@angular/core';
import { Uk2BaseHeaderCellDirective } from '../uk2-base-header-cell';

@Directive({
  selector: 'mat-header-cell[uk2HeaderMenuCell]',
})
export class Uk2HeaderMenuCellDirective extends Uk2BaseHeaderCellDirective {
  constructor(protected elementRef: ElementRef<HTMLElement>) {
    super(elementRef, 'uk2-header-menu-cell');
  }
}
