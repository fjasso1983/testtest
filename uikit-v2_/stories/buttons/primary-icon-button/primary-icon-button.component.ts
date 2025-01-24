import { Component, Input } from '@angular/core';
import { Uk2ButtonSizeEnum, Uk2IconRegistryService, Uk2Tier1FilesEnum } from '@axos/uikit-v2-lib';

@Component({
  selector: 'storybook-primary-icon-button',
  templateUrl: './primary-icon-button.component.html',
  styleUrls: ['./primary-icon-button.component.css'],
})
export class PrimaryIconButtonComponent {
  @Input() uk2ButtonSize: Uk2ButtonSizeEnum = Uk2ButtonSizeEnum.large;
  @Input() uk2IsLoading = false;
  @Input() isDisabled = false;
  @Input() svgIconName = 'uk2-printer';

  constructor(private iconRegistryService: Uk2IconRegistryService) {
    this.iconRegistryService.registerAllCategories();
  }
}
