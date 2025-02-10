import { Directive, ElementRef } from '@angular/core';
import { Uk2BaseHeaderCellDirective } from '../uk2-base-header-cell';

@Directive({
  selector: 'mat-header-cell[uk2HeaderBulkActionCell]',
})
export class Uk2HeaderBulkActionCellDirective extends Uk2BaseHeaderCellDirective {
  constructor(protected elementRef: ElementRef<HTMLElement>) {
    super(elementRef, 'uk2-header-bulk-action-cell');
  }
}
