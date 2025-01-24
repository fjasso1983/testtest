import { Directive, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';

import { IUk2IsLoading } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';

import { Uk2StretchTabsSizeEnum } from './enums';
import { uk2StretchTabsErrorConstants } from './constants/constants';

@Directive({
  selector:
    "mat-tab-group[uk2StretchTabs][mat-stretch-tabs][disableRipple][animationDuration='0ms']:not([color]):not([defaultColor])",
})
export class Uk2StretchTabsDirective implements OnInit, OnChanges, IUk2IsLoading {
  @Input() uk2IsLoading = false;
  @Input() uk2StretchTabsSize = Uk2StretchTabsSizeEnum.medium;

  uk2StretchTabsSkeletonTemplate: HTMLElement = this.renderer.createElement('div');

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.elementRef.nativeElement.classList.add('uk2-stretch-tabs');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.uk2StretchTabsSkeletonTemplate.classList.contains('uk2-stretch-tabs-skeleton')) {
      this.uk2StretchTabsSkeletonTemplate = this.createSkeletonTemplate(this.elementRef.nativeElement as HTMLElement);
    }

    if (changes.uk2StretchTabsSize) {
      if (!Object.values(Uk2StretchTabsSizeEnum).includes(changes.uk2StretchTabsSize.currentValue)) {
        throw new Error(uk2StretchTabsErrorConstants.errorSize);
      }

      if (changes.uk2StretchTabsSize.currentValue == Uk2StretchTabsSizeEnum.small) {
        this.elementRef.nativeElement.classList.remove('uk2-stretch-tabs-medium');
        this.elementRef.nativeElement.classList.add('uk2-stretch-tabs-small');
        this.uk2StretchTabsSkeletonTemplate.classList.remove('uk2-stretch-tabs-medium');
        this.uk2StretchTabsSkeletonTemplate.classList.add('uk2-stretch-tabs-small');
      } else {
        this.elementRef.nativeElement.classList.remove('uk2-stretch-tabs-small');
        this.elementRef.nativeElement.classList.add('uk2-stretch-tabs-medium');
        this.uk2StretchTabsSkeletonTemplate.classList.remove('uk2-stretch-tabs-small');
        this.uk2StretchTabsSkeletonTemplate.classList.add('uk2-stretch-tabs-medium');
      }
    }

    if (changes.uk2IsLoading) {
      this.toggleIsLoading(
        changes.uk2IsLoading.currentValue,
        this.elementRef.nativeElement as HTMLElement,
        this.uk2StretchTabsSkeletonTemplate
      );
    }
  }

  private toggleIsLoading(uk2IsLoading: Boolean, target: HTMLElement, template: HTMLElement) {
    if (uk2IsLoading) {
      this.renderer.addClass(target, 'uk2-hidden');
      this.renderer.removeClass(template, 'uk2-hidden');
    } else {
      this.renderer.removeClass(target, 'uk2-hidden');
      this.renderer.addClass(template, 'uk2-hidden');
    }
  }

  private createSkeletonTemplate(target: HTMLElement) {
    const template = this.renderer.createElement('div');
    this.renderer.addClass(template, 'uk2-stretch-tabs-skeleton');
    this.renderer.addClass(template, 'uk2-hidden');
    this.renderer.insertBefore(this.renderer.parentNode(target), template, target);

    return template;
  }
}
