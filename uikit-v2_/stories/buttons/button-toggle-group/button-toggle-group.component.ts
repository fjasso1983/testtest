import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Uk2ButtonToggleGroupSizeEnum } from '@axos/uikit-v2-lib';

@Component({
  selector: 'storybook-button-toggle-group',
  templateUrl: './button-toggle-group.component.html',
  styleUrls: ['./button-toggle-group.component.css'],
})
export class ButtonToggleGroupComponent {
  @Input() isLoading = false;
  @Input() size = Uk2ButtonToggleGroupSizeEnum.medium;
  @Output() clickEvent = new EventEmitter<any>();

  constructor() {}

  onValueChange(value: any) {
    this.clickEvent.emit(value);
  }
}
