import { Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IUk2IsLoading } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';
import { ButtonAbstractDirective } from '../button-abstract-directive';
import { Uk2ButtonSizeEnum, Uk2TextButtonVariant } from '../enums';

@Directive({
  selector: 'button[uk2TextIconButton][mat-button][disableRipple]:not([color])',
})
export class Uk2TextIconButtonDirective extends ButtonAbstractDirective implements OnInit, OnChanges, IUk2IsLoading {
  @Input() uk2ButtonSize: Uk2ButtonSizeEnum = Uk2ButtonSizeEnum.large;
  @Input() uk2TextButtonVariant: Uk2TextButtonVariant = Uk2TextButtonVariant.button;
  @Input() uk2NeutralColor: boolean = false;
  @Input() uk2IsLoading!: boolean;

  constructor(el: ElementRef<HTMLButtonElement>) {
    super(
      el,
      'uk2-text-icon-button-small',
      'uk2-text-icon-button-medium',
      'uk2-text-icon-button-large',
      'uk2-text-icon-button-skeleton'
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { uk2TextButtonVariant, uk2NeutralColor } = changes;

    this.toggleIsLoading(changes, this.uk2IsLoading);
    this.changeButtonSize(changes, this.uk2ButtonSize);
    if (uk2TextButtonVariant) {
      this.changeTextButtonVariant();
    }

    if (uk2NeutralColor) {
      this.changeColorVariant();
    }
  }

  ngOnInit(): void {
    this.applyButtonSize(this.uk2ButtonSize);
  }

  private changeTextButtonVariant() {
    if (this.uk2TextButtonVariant === Uk2TextButtonVariant.text) {
      // Apply class that modify text button
      this.el.nativeElement.classList.add('uk2-text-variant');
    } else {
      // Remove class that modify text button
      this.el.nativeElement.classList.remove('uk2-text-variant');
    }
  }

  private changeColorVariant() {
    if (this.uk2NeutralColor) {
      this.el.nativeElement.classList.add('uk2-neutral-color');
    } else {
      this.el.nativeElement.classList.remove('uk2-neutral-color');
    }
  }
}
