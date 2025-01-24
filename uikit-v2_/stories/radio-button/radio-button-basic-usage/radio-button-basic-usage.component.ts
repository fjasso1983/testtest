import { Component, Input } from '@angular/core';
import { Uk2RadioButtonAlignmentEnum, Uk2RadioButtonSizeEnum } from '@axos/uikit-v2-lib';

@Component({
  selector: 'radio-button-basic-usage',
  templateUrl: './radio-button-basic-usage.component.html',
  styleUrls: ['./radio-button-basic-usage.component.scss'],
})
export class RadioButtonBasicUsageComponent {
  @Input() isDisabled = false;
  @Input() isLoading = false;
  @Input() labelText = 'Example label';
  @Input() size!: Uk2RadioButtonSizeEnum;
  @Input() alignment!: Uk2RadioButtonAlignmentEnum;
  @Input() linkText = 'agreements';
  @Input() linkVisible = false;
  @Input() isHorizontalLayout = false;
  @Input() spaceBetweenRadios = 0;

  linkClicked(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  calculateGap(): string {
    if (this.isHorizontalLayout) {
      return `5px ${this.spaceBetweenRadios}px`;
    } else {
      return `${this.spaceBetweenRadios}px`;
    }
  }
}
