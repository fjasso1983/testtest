import {
  AfterViewInit,
  Directive,
  DoCheck,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

import { IUk2IsLoading, Uk2FormField, MATERIAL_CLASSES } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';

import { Uk2InputSizeEnum } from './enums';

@Directive({
  selector: 'input[matInput][uk2Input]',
})
export class Uk2InputDirective
  extends Uk2FormField
  implements OnInit, OnChanges, DoCheck, AfterViewInit, IUk2IsLoading
{
  @Input() uk2IsLoading = false;
  @Input() mask = '';
  @Input() prefix = '';
  @Input() uk2InputSize: Uk2InputSizeEnum = Uk2InputSizeEnum.large;

  matFormField: HTMLElement = this.elementRef.nativeElement.closest(`.${MATERIAL_CLASSES.formField}`);
  uk2InputSkeletonTemplate: HTMLElement = this.renderer.createElement('div');
  ableToReset = false;
  placeholderMask = '';
  placeholderMask_ = '';
  placeholderMaskX = '';

  constructor(elementRef: ElementRef, renderer: Renderer2) {
    super(renderer, elementRef);
  }

  ngOnInit(): void {
    this.addClasses();
  }

  ngDoCheck() {
    this.generatePlaceHolderMask();
    if (
      (this.elementRef.nativeElement.value == '' ||
        this.elementRef.nativeElement.value == this.placeholderMask_ ||
        this.elementRef.nativeElement.value == this.placeholderMaskX) &&
      this.ableToReset
    ) {
      this.matFormField.classList.remove('uk2-input-filled');
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const { uk2InputSize, uk2IsLoading } = changes;

    if (uk2IsLoading || this.uk2IsLoading) {
      this.handleSkeleton(this.uk2IsLoading, this.uk2InputSize);
    }

    if (uk2InputSize) {
      this.updateInputSizeClass();
    }
  }

  ngAfterViewInit(): void {
    this.validate();
    this.matFormField = this.elementRef.nativeElement.closest(`.${MATERIAL_CLASSES.formField}`);
    this.toggleIsFilled(
      this.elementRef.nativeElement.value || this.elementRef.nativeElement.getAttribute('ng-reflect-model'),
      this.elementRef.nativeElement.disabled
    );
    if (this.elementRef.nativeElement.value) {
      this.ableToReset = true;
    }
  }

  @HostListener('blur') onBlur() {
    this.ableToReset = true;
    this.toggleIsFilled(
      this.elementRef.nativeElement.value || this.elementRef.nativeElement.getAttribute('ng-reflect-model'),
      this.elementRef.nativeElement.disabled
    );
  }

  @HostListener('focus') onFocus() {
    this.ableToReset = false;
  }

  @HostListener('keyup', ['$event']) onkeyup(event: any) {
    if (event.keyCode == 13) {
      this.ableToReset = true;
      this.elementRef.nativeElement.blur();
    }
  }
  private toggleIsFilled(value: ElementRef, disabled: ElementRef) {
    if (value && !disabled) {
      this.matFormField.classList.add('uk2-input-filled');
    } else {
      this.matFormField.classList.remove('uk2-input-filled');
    }
  }

  private generatePlaceHolderMask() {
    const maskExpression = this.mask ?? '';
    if (maskExpression != '') {
      const maskPrefix = this.prefix ?? '';
      this.placeholderMask = maskPrefix + maskExpression;
      this.placeholderMask_ = this.placeholderMask
        .replace(new RegExp('0', 'g'), '_')
        .replace(new RegExp('A', 'g'), '_');
      this.placeholderMaskX = this.placeholderMask_.replace(new RegExp('_', 'g'), 'X');
    }
  }

  private addClasses() {
    this.elementRef.nativeElement.classList.add('uk2-input');
    this.elementRef.nativeElement.closest(`.${MATERIAL_CLASSES.formField}`).classList.add('uk2-form-field');
    if (this.uk2InputSize) this.getFormField().classList.add('uk2-form-field-size-' + this.uk2InputSize);
  }

  private updateInputSizeClass(): void {
    const formField = this.getFormField();
    const partialClassName = 'uk2-form-field-size-';
    const tagInputSizeClass = Array.from(formField.classList).find(className => className.startsWith(partialClassName));
    if (tagInputSizeClass) formField.classList.remove(tagInputSizeClass);
    if (this.uk2InputSize) formField.classList.add(partialClassName + this.uk2InputSize);
  }
}
