import { ChangeDetectorRef, Component } from '@angular/core';
import { Uk2ButtonSizeEnum, Uk2TextButtonVariant } from '@axos/uikit-v2-lib';

@Component({
  selector: 'app-text-button',
  templateUrl: './text-button.component.html',
  styleUrls: ['./text-button.component.scss'],
})
export class TextButtonComponent {
  buttonSize = Uk2ButtonSizeEnum;
  isLoading = false;
  isDisable = false;
  buttonState = 'Disable Button';
  svgIconName = 'uk2-printer';
  uk2TextButtonVariant = Uk2TextButtonVariant;

  constructor(private cd: ChangeDetectorRef) {}

  toggleLoading() {
    this.isLoading = !this.isLoading;
    setTimeout(() => {
      this.isLoading = false;
      this.cd.markForCheck();
    }, 3000);
  }

  toggleButtonState() {
    if (this.isDisable) this.buttonState = 'Disable Button';
    else this.buttonState = 'Enable Button';

    this.isDisable = !this.isDisable;
  }

  get smallSize(): string {
    return '<button uk2TextButton disableRipple [uk2ButtonSize]="buttonSize.small" [uk2IsLoading]="isLoading" mat-button>Add</button>';
  }

  get mediumSize(): string {
    return '<button uk2TextButton disableRipple [uk2ButtonSize]="buttonSize.medium" [uk2IsLoading]="isLoading" mat-button>Add</button>';
  }

  get largeSize(): string {
    return '<button uk2TextButton disableRipple [uk2ButtonSize]="buttonSize.large" [uk2IsLoading]="isLoading" mat-button>Add</button>';
  }

  get smallTextIconSize(): string {
    return '<button uk2TextIconButton disableRipple [uk2ButtonSize]="buttonSize.small" [uk2IsLoading]="isLoading" mat-button><mat-icon [svgIcon]="svgIconName"></mat-icon></button>';
  }

  get mediumTextIconSize(): string {
    return '<button uk2TextIconButton disableRipple [uk2ButtonSize]="buttonSize.medium" [uk2IsLoading]="isLoading" mat-button><mat-icon [svgIcon]="svgIconName"></mat-icon></button>';
  }

  get largeTextIconSize(): string {
    return '<button uk2TextIconButton disableRipple [uk2ButtonSize]="buttonSize.large" [uk2IsLoading]="isLoading" mat-button><mat-icon [svgIcon]="svgIconName"></mat-icon></button>';
  }
}
