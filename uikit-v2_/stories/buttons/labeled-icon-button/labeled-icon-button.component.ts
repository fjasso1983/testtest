import { Component, Input } from '@angular/core';
import { Uk2ButtonSizeEnum, Uk2IconRegistryService, Uk2LabeledIconPositionEnum } from '@axos/uikit-v2-lib';

@Component({
  selector: 'storybook-labeled-icon-button',
  templateUrl: './labeled-icon-button.component.html',
})
export class LabeledIconButtonComponent {
  @Input() uk2ButtonSize: Uk2ButtonSizeEnum = Uk2ButtonSizeEnum.small;
  @Input() uk2IsLoading = false;
  @Input() isDisabled = false;
  @Input() uk2LabeledIconPosition: Uk2LabeledIconPositionEnum = Uk2LabeledIconPositionEnum.left;
  @Input() svgIconName = 'uk2-pencil';
  @Input() label = 'edit';

  constructor(private iconRegistryService: Uk2IconRegistryService) {
    this.iconRegistryService.registerAllCategories();
  }
}
