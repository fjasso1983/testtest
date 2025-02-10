import { Uk2Condition, Uk2FilterChipState, Uk2FilterValue } from '@axos/uikit-v2-lib/src/lib/uk2-shared';

import { Observable } from 'rxjs';

export interface IUk2FilterChipService {
  filterChipState$: Observable<Uk2FilterChipState>;
  openOverlay$: Observable<void>;
  filterDeleted$: Observable<void>;
  filterValue$: Observable<Uk2FilterValue>;

  setConditional(conditional: Uk2Condition): void;
  setIdentifier(identifier: string): void;
  setActive(active: boolean): void;
  setValue(value: any): void;
  setPressed(pressed: boolean): void;
  setOverlayMinWidth(overlayMinWidth: string): void;
  setCloseOverlayAfterClear(closeOverlayAfterClear: boolean): void;
  setIsMultiple(isMultiple: boolean): void;
  setFilterChipMaxWidth(filterChipMaxWidth: number): void;
  setShowClearSelection(showClearSelection: boolean): void;
  getIdentifier(): void;
  getConditional(): void;
  getActive(): void;
  getValue(): void;
  getPressed(): void;
  getOverlayMinWidth(): void;
  getFilterValue(): Uk2FilterValue;
  getCloseOverlayAfterClear(): boolean;
  getIsMultiple(): boolean;
  getFilterChipMaxWidth(): number;
  getShowClearSelection(): boolean;
  openOverlay(): void;
  deleteFilter(): void;
  optionSelected(): void;
}
