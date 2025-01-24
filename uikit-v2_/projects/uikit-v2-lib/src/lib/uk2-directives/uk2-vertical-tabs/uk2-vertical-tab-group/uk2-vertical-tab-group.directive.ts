import { AfterViewInit, Directive, ElementRef, Input, OnChanges, SimpleChanges, inject } from '@angular/core';

import { IUk2IsLoading, MATERIAL_CLASSES } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';

import { Uk2VerticalTabSizeEnum } from '../enums';

@Directive({
  selector: "mat-tab-group[uk2VerticalTabs][disableRipple][animationDuration='0ms']:not([color]):not([defaultColor])",
})
export class Uk2VerticalTabGroupDirective implements AfterViewInit, OnChanges, IUk2IsLoading {
  @Input() uk2IsLoading = false;
  @Input() uk2TabSize: Uk2VerticalTabSizeEnum = Uk2VerticalTabSizeEnum.small;
  @Input() uk2IsDisabled = false;
  private readonly elementRef = inject(ElementRef);
  private element: HTMLElement = this.elementRef.nativeElement;

  ngAfterViewInit(): void {
    this.addUk2Class();
    this.addUk2ClassesToItems();
    this.changeTabSize();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { uk2IsLoading, uk2TabSize, uk2IsDisabled } = changes;

    if (uk2IsLoading) {
      this.toggleLoading();
    }

    if (uk2IsDisabled) {
      this.toggleDisabled();
    }

    if (uk2TabSize) {
      this.changeTabSize();
    }
  }

  addUk2Class() {
    this.element.classList.add('uk2-vertical-tab-container');
  }

  addUk2ClassesToItems() {
    this.element.querySelectorAll(`.${MATERIAL_CLASSES.mdcTab}.${MATERIAL_CLASSES.matMdcTab}`).forEach(childElement => {
      childElement.classList.add('uk2-vertical-tab');
    });
  }

  toggleLoading() {
    if (this.uk2IsLoading) {
      this.element.classList.add('uk2-skeleton-tab-container');
    } else {
      this.element.classList.remove('uk2-skeleton-tab-container');
    }
  }

  toggleDisabled() {
    if (this.uk2IsDisabled) {
      this.element.classList.add('uk2-vertical-tab-container-disabled');
    } else {
      this.element.classList.remove('uk2-vertical-tab-container-disabled');
    }
  }

  changeTabSize() {
    switch (this.uk2TabSize) {
      case Uk2VerticalTabSizeEnum.small:
        this.element.classList.add('uk2-vertical-tab-container-small');
        this.element.classList.remove('uk2-vertical-tab-container-medium');
        break;
      case Uk2VerticalTabSizeEnum.medium:
        this.element.classList.add('uk2-vertical-tab-container-medium');
        this.element.classList.remove('uk2-vertical-tab-container-small');
        break;
      default:
        this.element.classList.add('uk2-vertical-tab-container-medium');
        this.element.classList.remove('uk2-vertical-tab-container-small');
        break;
    }
  }
}
