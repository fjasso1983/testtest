import { Directive, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { IUk2IsLoading } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';

@Directive({
  selector: 'mat-checkbox[uk2Checkbox][disableRipple]:not([color])',
})
export class Uk2CheckboxDirective implements OnInit, OnChanges, IUk2IsLoading {
  @Input() uk2IsLoading = false;

  uk2CheckboxSkeletonTemplate: HTMLElement = this.renderer.createElement('div');

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.elementRef.nativeElement.classList.add('uk2-checkbox');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.uk2CheckboxSkeletonTemplate.classList.contains('uk2-skeleton-checkbox')) {
      this.uk2CheckboxSkeletonTemplate = this.createSkeletonTemplate(this.elementRef.nativeElement as HTMLElement);
    }

    this.toggleIsLoading(
      changes.uk2IsLoading.currentValue,
      this.elementRef.nativeElement as HTMLElement,
      this.uk2CheckboxSkeletonTemplate
    );
  }

  private toggleIsLoading(uk2IsLoading: Boolean, target: HTMLElement, template: HTMLElement) {
    if (uk2IsLoading) {
      if (this.elementRef.nativeElement.parentElement.classList.contains('uk2-checkbox-container')) {
        this.elementRef.nativeElement.parentElement.classList.add('uk2-checkbox-container-skeleton');
      }
      this.renderer.addClass(target, 'uk2-hidden');
      this.renderer.removeClass(template, 'uk2-hidden');
    } else {
      if (this.elementRef.nativeElement.parentElement.classList.contains('uk2-checkbox-container')) {
        this.elementRef.nativeElement.parentElement.classList.remove('uk2-checkbox-container-skeleton');
      }
      this.renderer.removeClass(target, 'uk2-hidden');
      this.renderer.addClass(template, 'uk2-hidden');
    }
  }

  private createSkeletonTemplate(target: HTMLElement) {
    const template = this.renderer.createElement('div');
    this.renderer.addClass(template, 'uk2-skeleton-checkbox');
    this.renderer.addClass(template, 'uk2-hidden');
    this.renderer.insertBefore(this.renderer.parentNode(target), template, target);

    return template;
  }
}
