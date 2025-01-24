import { Component, inject } from '@angular/core';

import { Uk2Tier1NavigationEnum, Uk2FilterChipStateService } from '@axos/uikit-v2-lib/src/lib/uk2-services';

@Component({
  selector: 'uk2-filter-chip-label',
  templateUrl: './uk2-filter-chip-label.component.html',
})
export class Uk2FilterChipLabelComponent {
  uk2FilterChipStateService = inject(Uk2FilterChipStateService);
  chevronDownIcon = Uk2Tier1NavigationEnum.chevronDown;
  state$ = this.uk2FilterChipStateService.filterChipState$;
}
