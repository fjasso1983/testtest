import { Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { IUk2IsLoading } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';

import { Uk2ButtonSizeEnum, Uk2TextButtonVariant } from '../enums';
import { ButtonAbstractDirective } from '../button-abstract-directive';

@Directive({
  selector: 'button[uk2TextButton][mat-button][disableRipple]:not([color])',
})
export class Uk2TextButtonDirective extends ButtonAbstractDirective implements OnInit, OnChanges, IUk2IsLoading {
  @Input() uk2ButtonSize: Uk2ButtonSizeEnum = Uk2ButtonSizeEnum.large;
  @Input() uk2IsLoading = false;
  @Input() uk2TextButtonVariant: Uk2TextButtonVariant = Uk2TextButtonVariant.button;

  constructor(el: ElementRef<HTMLButtonElement>) {
    super(el, 'uk2-text-button-small', 'uk2-text-button-medium', 'uk2-text-button-large', 'uk2-text-button-skeleton');
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { uk2TextButtonVariant } = changes;
    this.toggleIsLoading(changes, this.uk2IsLoading);
    this.changeButtonSize(changes, this.uk2ButtonSize);

    if (uk2TextButtonVariant) {
      this.changeTextButtonVariant();
    }
  }

  ngOnInit(): void {
    this.applyButtonSize(this.uk2ButtonSize);
  }

  changeTextButtonVariant() {
    if (this.uk2TextButtonVariant === Uk2TextButtonVariant.text) {
      this.el.nativeElement.classList.add('uk2-text-variant');
    } else {
      this.el.nativeElement.classList.remove('uk2-text-variant');
    }
  }
}
