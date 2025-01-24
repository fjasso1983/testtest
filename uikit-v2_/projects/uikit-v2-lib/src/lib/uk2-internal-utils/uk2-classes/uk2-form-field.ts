import { ElementRef, Renderer2 } from '@angular/core';

import { MATERIAL_CLASSES } from '../uk2-constants';

import { Uk2InputSizeEnum } from '../uk2-enums';

const FORM_FIELD_CLASS = `.${MATERIAL_CLASSES.formField}`;

export class Uk2FormField {
  uk2InputSkeletonTemplate: HTMLElement = this.renderer.createElement('div');

  constructor(protected renderer: Renderer2, protected elementRef: ElementRef) {}

  handleSkeleton(uk2IsLoading: boolean, uk2InputSize?: string) {
    if (!this.uk2InputSkeletonTemplate.classList.contains('uk2-skeleton-input')) {
      this.uk2InputSkeletonTemplate = this.createSkeletonTemplate(uk2InputSize);
    } else {
      this.updateSkeletonTemplate(uk2InputSize);
    }
    this.toggleIsLoading(uk2IsLoading);
  }

  validate() {
    this.validateParentElement();
    this.validateAttributes();
  }

  getFormField(): HTMLElement {
    return this.elementRef.nativeElement.closest(FORM_FIELD_CLASS) as HTMLElement;
  }

  private validateParentElement() {
    const formField = this.getFormField();
    if (!formField) throw new Error('Element must be wrapped by <mat-form-field>');
  }

  private validateAttributes() {
    const formField = this.getFormField();
    const appearanceOutline = formField.classList.contains(MATERIAL_CLASSES.outlineField);
    const floatLabel = formField.classList.contains(MATERIAL_CLASSES.floatLabelField);
    if (!appearanceOutline) throw new Error('appearance should be outline');
    if (!floatLabel) throw new Error('float label should be always');
  }

  private createSkeletonTemplate(uk2InputSize: string | undefined) {
    const inputSize = uk2InputSize ? uk2InputSize : Uk2InputSizeEnum.large;
    const formField = this.getFormField();
    const template = this.renderer.createElement('div');
    this.renderer.addClass(template, 'uk2-skeleton-input');
    this.renderer.addClass(template, `uk2-skeleton-input-size-${inputSize}`);
    this.renderer.addClass(template, 'uk2-hidden');
    this.renderer.insertBefore(this.renderer.parentNode(formField), template, formField);

    return template;
  }

  private updateSkeletonTemplate(uk2InputSize: string | undefined) {
    const inputSize = uk2InputSize ? uk2InputSize : Uk2InputSizeEnum.large;
    const partialClassName = 'uk2-skeleton-input-size-';
    const skeletonSizeClass = Array.from(this.uk2InputSkeletonTemplate.classList).find(className =>
      className.startsWith(partialClassName)
    );
    this.uk2InputSkeletonTemplate.classList.replace(skeletonSizeClass!, partialClassName + inputSize);
  }

  private toggleIsLoading(isLoading: boolean) {
    const formField = this.getFormField();
    if (isLoading) {
      this.renderer.addClass(formField, 'uk2-hidden');
      this.renderer.removeClass(this.uk2InputSkeletonTemplate, 'uk2-hidden');
    } else {
      this.renderer.removeClass(formField, 'uk2-hidden');
      this.renderer.addClass(this.uk2InputSkeletonTemplate, 'uk2-hidden');
    }
  }
}
