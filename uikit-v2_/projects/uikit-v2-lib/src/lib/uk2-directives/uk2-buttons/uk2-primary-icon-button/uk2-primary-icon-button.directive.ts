import { Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IUk2IsLoading } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';
import { Uk2ButtonSizeEnum } from '../enums';
import { ButtonAbstractDirective } from '../button-abstract-directive';

@Directive({
  selector: 'button[uk2PrimaryIconButton][mat-icon-button][disableRipple]:not([color])',
})
export class Uk2PrimaryIconButtonDirective extends ButtonAbstractDirective implements OnInit, OnChanges, IUk2IsLoading {
  @Input() uk2ButtonSize: Uk2ButtonSizeEnum = Uk2ButtonSizeEnum.large;
  @Input() uk2IsLoading = false;

  constructor(el: ElementRef<HTMLButtonElement>) {
    super(
      el,
      'uk2-primary-icon-button-small',
      'uk2-primary-icon-button-medium',
      'uk2-primary-icon-button-large',
      'uk2-primary-icon-button-skeleton'
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.toggleIsLoading(changes, this.uk2IsLoading);
    this.changeButtonSize(changes, this.uk2ButtonSize);
  }

  ngOnInit(): void {
    this.applyButtonSize(this.uk2ButtonSize);
  }
}
