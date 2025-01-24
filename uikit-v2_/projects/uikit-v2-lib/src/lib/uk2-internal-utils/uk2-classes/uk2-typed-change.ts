import { SimpleChange } from '@angular/core';

export declare class Uk2TypedChange<T extends any> extends SimpleChange {
  previousValue: T | undefined;
  currentValue: T;
  constructor(previousValue: T, currentValue: T, firstChange: boolean);
}
