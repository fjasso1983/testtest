import { Component, ElementRef, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';

import { Uk2Tier1NavigationEnum } from '@axos/uikit-v2-lib/src/lib/uk2-services';

import { Uk2BreadcrumbsItem } from '../types';

@Component({
  selector: 'uk2-breadcrumb-item',
  templateUrl: './uk2-breadcrumb-item.component.html',
})
export class Uk2BreadcrumbItemComponent implements OnInit {
  @Input() item: Uk2BreadcrumbsItem | undefined;
  @Input() relativePosition: string | null | undefined;
  @Input() label: string | undefined;
  @Input() ariaExpanded: string | undefined;
  @Input() hidden = false;
  @Output() itemSelected = new EventEmitter<Uk2BreadcrumbsItem>();
  @HostBinding('attr.aria-hidden') ariaHidden = 'true';

  arialLabel: string | undefined;

  readonly separatorSvgIconName = Uk2Tier1NavigationEnum.chevronRight;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.arialLabel = this.elementRef.nativeElement.ariaLabel;
  }

  onItemSelected(item: Uk2BreadcrumbsItem) {
    this.itemSelected.emit(item);
  }
}
