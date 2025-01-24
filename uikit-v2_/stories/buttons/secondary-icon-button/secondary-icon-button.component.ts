import { Component, Input } from '@angular/core';
import { Uk2ButtonSizeEnum, Uk2IconRegistryService } from '@axos/uikit-v2-lib';

@Component({
  selector: 'storybook-secondary-icon-button',
  templateUrl: './secondary-icon-button.component.html',
  styleUrls: ['./secondary-icon-button.component.css'],
})
export class SecondaryIconButtonComponent {
  @Input() uk2ButtonSize: Uk2ButtonSizeEnum = Uk2ButtonSizeEnum.large;
  @Input() uk2IsLoading = false;
  @Input() isDisabled = false;
  @Input() svgIconName = 'uk2-printer';

  constructor(private iconRegistryService: Uk2IconRegistryService) {
    this.iconRegistryService.registerAllCategories();
  }
}
