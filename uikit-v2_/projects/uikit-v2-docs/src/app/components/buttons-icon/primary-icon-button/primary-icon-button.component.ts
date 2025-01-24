import { Component } from '@angular/core';
import { Uk2ButtonSizeEnum, Uk2Tier1FilesEnum } from '@axos/uikit-v2-lib';

@Component({
  selector: 'app-primary-icon-button',
  templateUrl: './primary-icon-button.component.html',
  styleUrls: ['./primary-icon-button.component.scss'],
})
export class PrimaryIconButtonComponent {
  buttonSize = Uk2ButtonSizeEnum;
  isLoading = false;
  isDisable = false;
  buttonState = 'Disable Button';
  icon = Uk2Tier1FilesEnum.printer;

  toggleLoading() {
    this.isLoading = !this.isLoading;
  }

  toggleButtonState() {
    if (this.isDisable) this.buttonState = 'Disable Button';
    else this.buttonState = 'Enable Button';

    this.isDisable = !this.isDisable;
  }

  get smallSize(): string {
    return '<button uk2PrimaryIconButton mat-icon-button disableRipple [uk2ButtonSize]="buttonSize.small"[uk2IsLoading]="isLoading"[disabled]="isDisable"><mat-icon [svgIcon]="icon"></mat-icon></button>';
  }

  get mediumSize(): string {
    return '<button uk2PrimaryIconButton mat-icon-button disableRipple [uk2ButtonSize]="buttonSize.medium"[uk2IsLoading]="isLoading"[disabled]="isDisable"><mat-icon [svgIcon]="icon"></mat-icon></button>';
  }

  get largeSize(): string {
    return '<button uk2PrimaryIconButton mat-icon-button disableRipple [uk2ButtonSize]="buttonSize.large"[uk2IsLoading]="isLoading"[disabled]="isDisable"><mat-icon [svgIcon]="icon"></mat-icon></button>';
  }
}
