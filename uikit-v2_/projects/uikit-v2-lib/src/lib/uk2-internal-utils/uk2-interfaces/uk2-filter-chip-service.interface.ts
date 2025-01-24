import { Uk2Condition, Uk2FilterChipState } from '@axos/uikit-v2-lib/src/lib/uk2-shared';

import { Observable } from 'rxjs';

export interface IUk2FilterChipService {
  filterChipState$: Observable<Uk2FilterChipState>;
  openOverlay$: Observable<void>;

  setActive(active: boolean): void;
  setIdentifier(identifier: string): void;
  setConditional(conditional: Uk2Condition): void;
  setOverlayMinWidth(overlayMinWidth: string): void;
  setPressed(pressed: boolean): void;
  setValue(value: any): void;
  getIdentifier(): void;
  getConditional(): void;
  getActive(): void;
  getValue(): void;
  getPressed(): void;
  getOverlayMinWidth(): void;
  openOverlay(): void;
}
