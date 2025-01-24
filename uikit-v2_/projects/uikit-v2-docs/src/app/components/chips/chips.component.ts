import { Component, ViewEncapsulation } from '@angular/core';
import { Uk2ChipSizesEnum, Uk2ChipTypesEnum, Uk2Tier1AlertsEnum } from '@axos/uikit-v2-lib';

@Component({
  selector: 'app-chip',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ChipsComponent {
  chipSize = Uk2ChipSizesEnum;
  leadingIcon = Uk2Tier1AlertsEnum.infoCircle;
  trailingIcon = Uk2Tier1AlertsEnum.infoCircle;
  disableChip = false;
  activeChip = false;
  isLoading = false;
  chipType = Uk2ChipTypesEnum.square;
  hasChipIndicator = false;

  numberOfClicks = 0;

  constructor() {}

  chipClick() {
    this.numberOfClicks++;
    console.log('On click');
  }

  toggleChipType() {
    this.chipType = this.chipType === Uk2ChipTypesEnum.square ? Uk2ChipTypesEnum.rounded : Uk2ChipTypesEnum.square;
  }
}
