import { EventEmitter } from '@angular/core';

import { Uk2Condition, Uk2FilterValue } from '@axos/uikit-v2-lib/src/lib/uk2-shared';

import { IUk2FilterChipService, IUk2IsLoading } from '../uk2-interfaces';

export abstract class Uk2BaseFilterChip<T> implements IUk2IsLoading {
  abstract uk2IsLoading: boolean;
  abstract uk2FilterValue?: T;
  abstract uk2FilterChipStateService: IUk2FilterChipService;
  abstract uk2Conditions: Uk2Condition[];
  abstract uk2Identifier: string;
  abstract uk2FilterValueChanges: EventEmitter<Uk2FilterValue>;
  abstract uk2DeleteFilter?: EventEmitter<void>;

  abstract closeOverlay(): void;
  abstract openOverlay(): void;
  abstract clearValue(): void;
}
