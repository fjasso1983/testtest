import { Component, Input } from '@angular/core';

import { Uk2ButtonSizeEnum, Uk2IconRegistryService, Uk2TextButtonVariant } from '@axos/uikit-v2-lib';

@Component({
  selector: 'storybook-text-icon-button',
  templateUrl: './text-icon-button.component.html',
  styleUrls: ['./text-icon-button.component.css'],
})
export class TextIconButtonComponent {
  @Input() uk2ButtonSize: Uk2ButtonSizeEnum = Uk2ButtonSizeEnum.large;
  @Input() uk2TextButtonVariant: Uk2TextButtonVariant = Uk2TextButtonVariant.button;
  @Input() uk2NeutralColor = false;
  @Input() uk2IsLoading = false;
  @Input() isDisabled = false;
  @Input() svgIconName = 'uk2-printer';

  constructor(private iconRegistryService: Uk2IconRegistryService) {
    this.iconRegistryService.registerAllCategories();
  }
}
