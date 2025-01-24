import { Component } from '@angular/core';
import { Uk2ButtonSizeEnum } from '@axos/uikit-v2-lib';

@Component({
  selector: 'app-primary-button',
  templateUrl: './primary-button.component.html',
  styleUrls: ['./primary-button.component.scss'],
})
export class PrimaryButtonComponent {
  buttonSize = Uk2ButtonSizeEnum;
  isLoading = false;
  isDisable = false;
  buttonState = 'Disable Button';
  uk2InlineLoading = false;

  toggleLoading() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }

  toggleButtonState() {
    if (this.isDisable) this.buttonState = 'Disable Button';
    else this.buttonState = 'Enable Button';

    this.isDisable = !this.isDisable;
  }

  toggleInlineLoading() {
    this.uk2InlineLoading = !this.uk2InlineLoading;
  }

  get smallSize(): string {
    return '<button uk2PrimaryButton disableRipple mat-raised-button [uk2ButtonSize]="buttonSize.small" [uk2IsLoading]="isLoading">Add</button>';
  }

  get mediumSize(): string {
    return '<button uk2PrimaryButton disableRipple mat-raised-button [uk2ButtonSize]="buttonSize.medium" [uk2IsLoading]="isLoading">Add</button>';
  }

  get largeSize(): string {
    return '<button uk2PrimaryButton disableRipple mat-raised-button [uk2ButtonSize]="buttonSize.large" [uk2IsLoading]="isLoading">Add</button>';
  }
}
