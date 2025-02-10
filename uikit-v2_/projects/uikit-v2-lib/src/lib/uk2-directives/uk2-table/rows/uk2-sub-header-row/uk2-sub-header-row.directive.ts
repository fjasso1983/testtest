import { Directive, ElementRef } from '@angular/core';
import { Uk2BaseRowDirective } from '../uk2-base-row';

@Directive({
  selector: 'mat-header-row[uk2SubHeaderRow],mat-row[uk2SubHeaderRow]',
})
export class Uk2SubHeaderRowDirective extends Uk2BaseRowDirective {
  constructor(protected elementRef: ElementRef<HTMLElement>) {
    super(elementRef, 'uk2-sub-header-row');
  }
}
