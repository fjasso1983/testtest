import { SimpleChange } from '@angular/core';

export interface Uk2LoadingSkeletonSimpleChange<T> extends SimpleChange {
  previousValue: T;
  currentValue: T;
}
