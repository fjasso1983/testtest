import { Directive, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';

import { IUk2IsLoading } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';

import { Uk2RadioButtonAlignmentEnum, Uk2RadioButtonSizeEnum } from './enums';

@Directive({
  selector: 'mat-radio-button[uk2RadioButton][disableRipple]:not([color])',
})
export class Uk2RadioButtonDirective implements OnInit, OnChanges, IUk2IsLoading {
  @Input() uk2IsLoading = false;
  @Input() uk2RadioButtonSize: Uk2RadioButtonSizeEnum = Uk2RadioButtonSizeEnum.medium;
  @Input() uk2Alignment: Uk2RadioButtonAlignmentEnum = Uk2RadioButtonAlignmentEnum.left;
  private uk2InputSkeletonTemplate = this.renderer.createElement('div');

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.addClass();
    this.handleSkeleton();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.uk2IsLoading) {
      this.handleSkeleton();
    }

    if (changes.uk2RadioButtonSize) {
      this.addDensityClass();
    }

    if (changes.uk2Alignment) {
      this.addAlignmentClass();
    }
  }

  private addClass(): void {
    this.element.classList.add('uk2-radio-button');
  }

  private addDensityClass(): void {
    const density = this.uk2RadioButtonSize === Uk2RadioButtonSizeEnum.medium ? 'medium' : 'small';
    this.element.classList.remove('uk2-radio-button-size-medium');
    this.element.classList.remove('uk2-radio-button-size-small');
    this.element.classList.add(`uk2-radio-button-size-${density}`);
  }

  private addAlignmentClass(): void {
    const direction = this.uk2Alignment === Uk2RadioButtonAlignmentEnum.left ? 'left' : 'right';
    this.element.classList.remove('uk2-radio-button-alignment-left');
    this.element.classList.remove('uk2-radio-button-alignment-right');
    this.element.classList.add(`uk2-radio-button-alignment-${direction}`);
  }

  private get element(): HTMLElement {
    return this.el.nativeElement;
  }

  private createSkeletonTemplate() {
    const formField = this.getFormField();
    const template = this.renderer.createElement('div');
    this.renderer.addClass(template, 'uk2-skeleton-radio');
    this.renderer.addClass(template, 'uk2-hidden');
    const radioSkeleton = this.renderer.createElement('div');
    this.renderer.addClass(radioSkeleton, 'uk2-skeleton-input-radio-button');
    this.renderer.appendChild(template, radioSkeleton);
    const radioTextSkeleton = this.renderer.createElement('div');
    this.renderer.addClass(radioTextSkeleton, 'uk2-skeleton-input-radio-button-text');
    this.renderer.appendChild(template, radioTextSkeleton);
    this.renderer.insertBefore(this.renderer.parentNode(formField), template, formField);

    return template;
  }

  private getFormField(): HTMLElement {
    return this.element.querySelector('.mdc-form-field') as HTMLElement;
  }

  private getSkeletonContainer(): HTMLElement {
    return this.element.querySelector('.uk2-skeleton-radio') as HTMLElement;
  }

  private toggleIsLoading() {
    const formField = this.getFormField();
    const skeletonEl = this.getSkeletonContainer();
    if (this.uk2IsLoading) {
      this.renderer.addClass(formField, 'uk2-hidden');
      this.renderer.removeClass(skeletonEl, 'uk2-hidden');
    } else {
      this.renderer.removeClass(formField, 'uk2-hidden');
      this.renderer.addClass(skeletonEl, 'uk2-hidden');
    }
  }

  private handleSkeleton() {
    if (!this.uk2InputSkeletonTemplate.classList.contains('uk2-skeleton-radio')) {
      this.uk2InputSkeletonTemplate = this.createSkeletonTemplate();
    }
    this.toggleIsLoading();
  }
}
