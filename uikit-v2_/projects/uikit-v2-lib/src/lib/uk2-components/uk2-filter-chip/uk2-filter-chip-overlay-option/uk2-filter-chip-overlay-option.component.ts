import { Component, ElementRef, Input, OnDestroy, inject } from '@angular/core';

import { FocusableOption } from '@angular/cdk/a11y';

import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { Uk2FilterChipStateService } from '@axos/uikit-v2-lib/src/lib/uk2-services';

@Component({
  selector: 'uk2-filter-chip-overlay-option',
  templateUrl: './uk2-filter-chip-overlay-option.component.html',
})
export class Uk2FilterChipOverlayOptionComponent implements OnDestroy, FocusableOption {
  @Input() uk2Multiple: boolean = false;
  @Input() uk2Value: string = '';

  uk2FilterChipState = inject(Uk2FilterChipStateService);
  elementRef = inject(ElementRef);
  value$ = this.uk2FilterChipState.filterChipState$.pipe(map(state => state.value));
  stateValue!: string | string[];
  checked!: boolean;
  private destroy$ = new Subject<void>();

  constructor() {
    this.value$?.pipe(takeUntil(this.destroy$)).subscribe(value => {
      this.stateValue = value;
      this.checked = this.checkSelected();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onClick(): void {
    this.uk2FilterChipState?.setActive(true);

    if (this.uk2Multiple) {
      // Check if the value is already in the array
      const state = this.stateValue as string[];
      if (state?.includes(this.uk2Value)) {
        this.uk2FilterChipState?.setValue(state.filter((value: string) => value !== this.uk2Value));
        this.uk2FilterChipState?.optionSelected();
        return;
      }

      // Value is not selected, add it to the array
      const currentState = this.stateValue instanceof Array ? this.stateValue : [];
      this.uk2FilterChipState?.setValue([...currentState, this.uk2Value]);
      this.uk2FilterChipState?.optionSelected();

      return;
    }
    this.uk2FilterChipState?.setValue(this.uk2Value);
    this.uk2FilterChipState?.optionSelected();
  }

  focus(): void {
    this.elementRef.nativeElement.querySelector('div').focus();
  }

  private checkSelected(): boolean {
    if (this.uk2Multiple) {
      return this.stateValue?.includes(this.uk2Value);
    }
    return this.stateValue === this.uk2Value;
  }
}
