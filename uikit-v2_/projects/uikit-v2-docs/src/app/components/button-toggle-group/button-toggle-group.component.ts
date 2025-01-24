import { Component } from '@angular/core';
import { Uk2ButtonToggleGroupSizeEnum } from '@axos/uikit-v2-lib';

@Component({
  selector: 'app-button-toggle-group',
  templateUrl: './button-toggle-group.component.html',
  styleUrls: ['./button-toggle-group.component.scss'],
})
export class ButtonToggleGroupComponent {
  isLoading = false;
  size = Uk2ButtonToggleGroupSizeEnum.medium;

  constructor() {}

  toggleLoading() {
    this.isLoading = !this.isLoading;
  }

  toggleSize() {
    this.size =
      this.size === Uk2ButtonToggleGroupSizeEnum.medium
        ? Uk2ButtonToggleGroupSizeEnum.small
        : Uk2ButtonToggleGroupSizeEnum.medium;
  }
}
