import { AfterViewInit, Directive, ElementRef, HostListener, Input, OnChanges } from '@angular/core';

import { Uk2InputValidationsService, MATERIAL_CLASSES } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';

import { Uk2FormFieldHintDisplayPatternEnum } from './enums/uk2-form-field-hint-display-pattern.enum';

@Directive({
  selector: 'input[matInput][uk2HintDisplayPattern], mat-select[uk2HintDisplayPattern]',
  providers: [Uk2InputValidationsService],
})
export class Uk2HintDisplayPatternDirective implements AfterViewInit, OnChanges {
  @Input() uk2HintDisplayPattern: Uk2FormFieldHintDisplayPatternEnum = Uk2FormFieldHintDisplayPatternEnum.alwaysVisible;

  constructor(private el: ElementRef<HTMLElement>, private uk2InputValidations: Uk2InputValidationsService) {
    uk2InputValidations.setStrategy(el.nativeElement);
  }

  ngAfterViewInit(): void {
    this.el.nativeElement.classList.add('uk2HintDisplayPattern');
    setTimeout(() => {
      this.toggleHintVisibility(this.uk2HintDisplayPattern == Uk2FormFieldHintDisplayPatternEnum.alwaysVisible);
    });
  }

  ngOnChanges(): void {
    this.toggleHintVisibility(this.uk2HintDisplayPattern == Uk2FormFieldHintDisplayPatternEnum.alwaysVisible);
  }

  @HostListener('blur') onBlur() {
    this.toggleHintVisibility(this.uk2HintDisplayPattern == Uk2FormFieldHintDisplayPatternEnum.alwaysVisible);
  }
  @HostListener('focus') onFocus() {
    const isDisabled = this.uk2InputValidations.isInputDisabled();
    if (isDisabled) return;
    this.toggleHintVisibility(true);
  }

  toggleHintVisibility(isVisible: boolean = true) {
    const formField = this.el.nativeElement.closest(`.${MATERIAL_CLASSES.formField}`);
    if (!formField) throw new Error('Field must be wrapped in mat-form-field');
    if (this.uk2InputValidations.isInputFilled()) {
      formField.classList.remove('uk2-form-field-hint-hidden');

      return;
    }
    this.toggleClass(formField, isVisible);
  }

  private toggleClass(formField: Element, isVisible: boolean) {
    if (isVisible) {
      formField.classList.remove('uk2-form-field-hint-hidden');
    } else {
      formField.classList.add('uk2-form-field-hint-hidden');
    }
  }
}
