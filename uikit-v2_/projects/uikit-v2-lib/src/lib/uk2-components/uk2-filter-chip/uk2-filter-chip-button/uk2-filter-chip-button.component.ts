import { Component, ElementRef, Input, inject } from '@angular/core';

import { map } from 'rxjs/operators';

import { IUk2IsLoading } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';
import { Uk2FilterChipStateService } from '@axos/uikit-v2-lib/src/lib/uk2-services';

@Component({
  selector: 'uk2-filter-chip-button',
  templateUrl: './uk2-filter-chip-button.component.html',
})
export class Uk2FilterChipButtonComponent implements IUk2IsLoading {
  @Input() uk2IsLoading = false;
  uk2FilterChipStateService = inject(Uk2FilterChipStateService);
  isPressed$ = this.uk2FilterChipStateService.filterChipState$.pipe(map(state => state.isPressed));
  elementRef = inject(ElementRef);

  openOverlay() {
    this.uk2FilterChipStateService.openOverlay();
  }
}
