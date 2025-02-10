import { Uk2Condition } from '@axos/uikit-v2-lib/src/lib/uk2-shared';

export interface IUk2FilterChipOverlayLabel {
  updateCondition(option: Uk2Condition): void;
  deleteFilter(): void;
  closeOverlays(): void;
}
