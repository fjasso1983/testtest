import { Component } from '@angular/core';
import { Uk2ButtonSizeEnum, Uk2Tier1FilesEnum, Uk2Tier3Enum, Uk2LabeledIconPositionEnum } from '@axos/uikit-v2-lib';

@Component({
  selector: 'app-labeled-icon-button',
  templateUrl: './labeled-icon-button.component.html',
  styleUrls: ['./labeled-icon-button.component.scss'],
})
export class LabeledIconButtonComponent {
  buttonSize = Uk2ButtonSizeEnum.small;
  isLoading = false;
  isDisable = false;
  labeledIconPosition: Uk2LabeledIconPositionEnum = Uk2LabeledIconPositionEnum.right;
  buttonState = 'Disable Button';
  icon: any = Uk2Tier1FilesEnum.pencil;

  toggleLoading() {
    this.isLoading = !this.isLoading;
  }

  toggleIsRightIcon() {
    if (this.labeledIconPosition == Uk2LabeledIconPositionEnum.right) {
      this.labeledIconPosition = Uk2LabeledIconPositionEnum.left;
    } else {
      this.labeledIconPosition = Uk2LabeledIconPositionEnum.right;
    }
  }

  toggleButtonState() {
    if (this.isDisable) this.buttonState = 'Disable Button';
    else this.buttonState = 'Enable Button';

    this.isDisable = !this.isDisable;
  }

  setIcon(tierNumber: number) {
    if (tierNumber == 1) {
      this.icon = Uk2Tier1FilesEnum.pencil;
    } else {
      this.icon = Uk2Tier3Enum.bagHand;
    }
  }

  setSize(sizeNumber: number) {
    if (sizeNumber == 1) {
      this.buttonSize = Uk2ButtonSizeEnum.small;
    } else if (sizeNumber == 2) {
      this.buttonSize = Uk2ButtonSizeEnum.medium;
    } else {
      this.buttonSize = Uk2ButtonSizeEnum.large;
    }
  }

  get smallSize(): string {
    return '<button uk2LabeledIconButton mat-icon-button disableRipple [uk2ButtonSize]="buttonSize.small"[uk2IsLoading]="isLoading"[disabled]="isDisable"><mat-icon [svgIcon]="icon"></mat-icon></button>';
  }

  get mediumSize(): string {
    return '<button uk2LabeledIconButton mat-icon-button disableRipple [uk2ButtonSize]="buttonSize.medium"[uk2IsLoading]="isLoading"[disabled]="isDisable"><mat-icon [svgIcon]="icon"></mat-icon></button>';
  }

  get largeSize(): string {
    return '<button uk2LabeledIconButton mat-icon-button disableRipple [uk2ButtonSize]="buttonSize.large"[uk2IsLoading]="isLoading"[disabled]="isDisable"><mat-icon [svgIcon]="icon"></mat-icon></button>';
  }
}
