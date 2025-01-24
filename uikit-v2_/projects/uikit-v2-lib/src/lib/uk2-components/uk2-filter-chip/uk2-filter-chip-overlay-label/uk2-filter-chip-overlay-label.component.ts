import { Component, EventEmitter, Input, Output, inject } from '@angular/core';

import {
  Uk2Tier1NavigationEnum,
  Uk2Tier1UtilityEnum,
  Uk2FilterChipStateService,
} from '@axos/uikit-v2-lib/src/lib/uk2-services';
import { Uk2Condition } from '@axos/uikit-v2-lib/src/lib/uk2-shared';

@Component({
  selector: 'uk2-filter-chip-overlay-label',
  templateUrl: './uk2-filter-chip-overlay-label.component.html',
})
export class Uk2FilterChipOverlayLabelComponent {
  @Input() uk2Conditions: Uk2Condition[] = [];
  @Output() uk2OptionSelected = new EventEmitter<string>();
  flyDownOpen = false;
  ellipsisFlyDownOpen = false;
  chevronDownIcon = Uk2Tier1NavigationEnum.chevronDown;
  ellipsisHorizontalIcon = Uk2Tier1NavigationEnum.ellipsesHorizontal;
  trashIcon = Uk2Tier1UtilityEnum.trash;
  uk2FilterChipStateService = inject(Uk2FilterChipStateService);

  updateCondition(option: Uk2Condition) {
    this.uk2FilterChipStateService.setConditional(option);
    this.uk2OptionSelected.emit(option.label);
    this.flyDownOpen = false;
    this.uk2FilterChipStateService.optionSelected();
  }

  deleteFilter() {
    this.ellipsisFlyDownOpen = false;
    this.uk2FilterChipStateService.deleteFilter();
  }

  closeOverlays() {
    this.ellipsisFlyDownOpen = false;
    this.flyDownOpen = false;
  }
}
