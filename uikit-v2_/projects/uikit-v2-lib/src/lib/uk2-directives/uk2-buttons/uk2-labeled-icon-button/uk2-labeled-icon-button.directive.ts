import {
  OnInit,
  DoCheck,
  AfterViewChecked,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { IUk2IsLoading, MATERIAL_CLASSES } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';
import { Uk2ButtonSizeEnum } from '../enums';
import { uk2LabeledIconButtonErrorConstants } from './constants';
import { ButtonAbstractDirective } from '../button-abstract-directive';
import { Uk2IconValidationService } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';
import { Uk2LabeledIconPositionEnum } from './enums';

@Directive({
  selector: 'button[uk2LabeledIconButton][mat-button][disableRipple]:not([color])',
  providers: [Uk2IconValidationService],
})
export class Uk2LabeledIconButtonDirective
  extends ButtonAbstractDirective
  implements OnInit, OnChanges, DoCheck, AfterViewChecked, IUk2IsLoading
{
  @Input() uk2ButtonSize: Uk2ButtonSizeEnum = Uk2ButtonSizeEnum.small;
  @Input() uk2IsLoading = false;
  @Input() uk2LabeledIconPosition: Uk2LabeledIconPositionEnum = Uk2LabeledIconPositionEnum.right;

  iconLabeledButton: HTMLElement | null = this.el.nativeElement.querySelector(`.${MATERIAL_CLASSES.matIcon}`);
  textLabeledButton: HTMLElement | null = this.el.nativeElement.querySelector(`.${MATERIAL_CLASSES.buttonLabel}`);

  constructor(el: ElementRef<HTMLButtonElement>, private uk2IconValidationService: Uk2IconValidationService) {
    super(
      el,
      'uk2-labeled-icon-button-small',
      'uk2-labeled-icon-button-medium',
      'uk2-labeled-icon-button-large',
      'uk2-labeled-icon-button-skeleton'
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.toggleIsLoading(changes, this.uk2IsLoading);
    this.changeButtonSize(changes, this.uk2ButtonSize);

    if (changes.uk2ButtonSize) {
      if (changes.uk2ButtonSize.currentValue == Uk2ButtonSizeEnum.large) {
        throw new Error(uk2LabeledIconButtonErrorConstants.errorLarge);
      }
    }

    if (changes.uk2LabeledIconPosition) {
      if (changes.uk2LabeledIconPosition.currentValue == Uk2LabeledIconPositionEnum.right) {
        this.el.nativeElement.classList.add('uk2-labeled-icon-right');
      } else {
        this.el.nativeElement.classList.remove('uk2-labeled-icon-right');
      }
    }
  }

  ngOnInit(): void {
    this.applyButtonSize(this.uk2ButtonSize);
  }

  ngDoCheck() {
    this.el.nativeElement.classList.remove('uk2-hidden');
    this.textLabeledButton = this.el.nativeElement.querySelector(`.${MATERIAL_CLASSES.buttonLabel}`);
    this.iconLabeledButton = this.el.nativeElement.querySelector(`.${MATERIAL_CLASSES.matIcon}`);
  }
  ngAfterViewChecked() {
    let iconName = this.iconLabeledButton?.getAttribute('ng-reflect-svg-icon');
    if (iconName !== undefined && iconName !== null) {
      this.uk2IconValidationService.isValidIconName(iconName);
      if (!this.uk2IconValidationService.isTier1(iconName)) {
        this.el.nativeElement.classList.add('uk2-hidden');
        throw new Error(uk2LabeledIconButtonErrorConstants.errorTierIcon);
      }
    }

    if (this.textLabeledButton?.textContent === '') {
      throw new Error(uk2LabeledIconButtonErrorConstants.errorEmptyText);
    }
  }
}
