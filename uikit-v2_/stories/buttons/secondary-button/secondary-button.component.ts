import { Component, Input } from '@angular/core';
import { Uk2ButtonSizeEnum } from '@axos/uikit-v2-lib';

@Component({
  selector: 'storybook-secondary-button',
  templateUrl: './secondary-button.component.html',
  styleUrls: ['./secondary-button.component.css'],
})
export class SecondaryButtonComponent {
  @Input() uk2ButtonSize: Uk2ButtonSizeEnum = Uk2ButtonSizeEnum.large;
  @Input() uk2IsLoading = false;
  @Input() isDisabled = false;
  @Input() text = 'Add';
  uk2InlineLoading = false;
  uk2InlineLoadingText = 'Adding';
}
