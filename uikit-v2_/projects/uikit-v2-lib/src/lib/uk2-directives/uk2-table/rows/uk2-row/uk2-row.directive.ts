import { Directive, ElementRef } from '@angular/core';
import { Uk2BaseRowDirective } from '../uk2-base-row';

@Directive({
  selector: 'mat-row[uk2Row]',
})
export class Uk2RowDirective extends Uk2BaseRowDirective {
  constructor(protected elementRef: ElementRef<HTMLElement>) {
    super(elementRef, 'uk2-row');
  }
}
