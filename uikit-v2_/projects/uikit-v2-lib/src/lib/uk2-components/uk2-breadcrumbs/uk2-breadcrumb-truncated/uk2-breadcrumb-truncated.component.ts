import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { Uk2BreadcrumbsCssProperty, Uk2BreadcrumbsItem } from '../types';

@Component({
  selector: 'uk2-breadcrumb-truncated',
  templateUrl: './uk2-breadcrumb-truncated.component.html',
})
export class Uk2BreadcrumbTruncatedComponent {
  @Input() items!: Uk2BreadcrumbsItem[];
  @Input() uk2BreadcrumbsCssProperties: Uk2BreadcrumbsCssProperty[] = [];
  @Output() itemSelected = new EventEmitter<Uk2BreadcrumbsItem>();

  @ViewChild('ellipsisEl', { read: ElementRef }) ellipsisEl!: ElementRef;
  open = false;

  onItemSelected(item: Uk2BreadcrumbsItem) {
    this.itemSelected.emit(item);
  }

  overlayDetached() {
    this.open = false;
    const breadcrumbEl = this.ellipsisEl.nativeElement;
    breadcrumbEl?.querySelector('p')?.focus();
  }

  getRelativePosition(index: number): string | null {
    return `item ${index + 1} of ${this.items.length}`;
  }
}
