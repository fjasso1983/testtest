import { Component, Input } from '@angular/core';
import { Uk2ButtonSizeEnum, Uk2TextButtonVariant } from '@axos/uikit-v2-lib';

@Component({
  selector: 'storybook-text-button',
  templateUrl: './text-button.component.html',
  styleUrls: ['./text-button.component.css'],
})
export class TextButtonComponent {
  @Input() uk2ButtonSize: Uk2ButtonSizeEnum = Uk2ButtonSizeEnum.large;
  @Input() uk2TextButtonVariant: Uk2TextButtonVariant = Uk2TextButtonVariant.button;
  @Input() uk2IsLoading = false;
  @Input() isDisabled = false;
  @Input() text = 'Add';
  uk2InlineLoading = false;
  uk2InlineLoadingText = 'Adding';
}
