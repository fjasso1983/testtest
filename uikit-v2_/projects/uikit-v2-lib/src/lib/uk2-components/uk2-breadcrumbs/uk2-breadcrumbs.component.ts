import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { IUk2IsLoading } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';
import { Uk2Tier1NavigationEnum } from '@axos/uikit-v2-lib/src/lib/uk2-services';

import { Uk2BreadcrumbsItem, Uk2BreadcrumbsCssProperty } from './types';
import { Uk2BreadcrumbsContainerDirective } from './uk2-breadcrumbs-container';

@Component({
  selector: 'uk2-breadcrumbs[items]',
  templateUrl: './uk2-breadcrumbs.component.html',
})
export class Uk2BreadcrumbsComponent implements IUk2IsLoading, OnInit {
  @Input() items!: Uk2BreadcrumbsItem[];
  @Input() uk2IsLoading = false;
  @Input() uk2BreadcrumbsCssProperties: Uk2BreadcrumbsCssProperty[] = [];
  @Output() itemSelected = new EventEmitter<Uk2BreadcrumbsItem>();
  readonly separatorSvgIconName = Uk2Tier1NavigationEnum.chevronRight;
  showTruncatedBreadcrumbs = false;

  constructor(private container: Uk2BreadcrumbsContainerDirective) {}

  ngOnInit(): void {
    this.validateInputs();
    this.container.overflow.subscribe(isOverflowing => {
      this.showTruncatedBreadcrumbs = isOverflowing;
    });
  }

  validateInputs() {
    if (!this.items || this.items.length === 0)
      throw new Error('[items] property in Uk2BreadcrumbsComponent is required');
  }

  onItemSelected(item: Uk2BreadcrumbsItem) {
    this.itemSelected.emit(item);
  }

  getRelativePosition(index: number): string | null {
    return `item ${index + 1} of ${this.items.length}`;
  }
}
