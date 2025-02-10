import { Directive, ElementRef } from '@angular/core';
import { Uk2BaseCellDirective } from '../uk2-base-cell';

@Directive({
  selector: 'mat-cell[uk2MenuCell]',
})
export class Uk2MenuCellDirective extends Uk2BaseCellDirective {
  constructor(protected elementRef: ElementRef<HTMLElement>) {
    super(elementRef, 'uk2-menu-cell');
  }
}
