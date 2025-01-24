import { Component } from '@angular/core';
import { Uk2ButtonSizeEnum } from '@axos/uikit-v2-lib';

@Component({
  selector: 'app-secondary-button',
  templateUrl: './secondary-button.component.html',
  styleUrls: ['./secondary-button.component.scss'],
})
export class SecondaryButtonComponent {
  buttonSize = Uk2ButtonSizeEnum;
  isLoading = false;
  isDisable = false;
  buttonState = 'Disable Button';

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

  get smallSize(): string {
    return '<button uk2SecondaryButton disableRipple mat-stroked-button [uk2ButtonSize]="buttonSize.small" [uk2IsLoading]="isLoading">Add</button>';
  }

  get mediumSize(): string {
    return '<button uk2SecondaryButton disableRipple mat-stroked-button [uk2ButtonSize]="buttonSize.medium" [uk2IsLoading]="isLoading">Add</button>';
  }

  get largeSize(): string {
    return '<button uk2SecondaryButton disableRipple mat-stroked-button [uk2ButtonSize]="buttonSize.large" [uk2IsLoading]="isLoading">Add</button>';
  }
}
