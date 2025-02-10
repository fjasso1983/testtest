import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { MatColumnDef } from '@angular/material/table';
import { MATERIAL_CLASSES } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';

@Directive({
  selector: 'mat-header-cell[uk2HeaderFillColumn]',
})
export class Uk2HeaderFillColumnDirective implements OnInit {
  constructor(private el: ElementRef<HTMLElement>, private columnDef: MatColumnDef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.getColumnCells();
  }

  private getColumnCells() {
    const columnCssClass = `${MATERIAL_CLASSES.matColumnPartial}-${this.columnDef.cssClassFriendlyName}`;
    const table = this.el.nativeElement.closest(MATERIAL_CLASSES.matTable);
    if (table) {
      const columnCell = table!.querySelectorAll(`.${columnCssClass}`);

      columnCell.forEach(cell => {
        this.renderer.addClass(cell, 'uk2-header-fill-column');
      });
    }
  }
}
