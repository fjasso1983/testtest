import {
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  inject,
} from '@angular/core';

import { FocusableOption } from '@angular/cdk/a11y';

import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { Uk2FilterChipStateService } from '@axos/uikit-v2-lib/src/lib/uk2-services';
import { IUK2FilterChipOverlayOption } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';

@Component({
  selector: 'uk2-filter-chip-overlay-option',
  templateUrl: './uk2-filter-chip-overlay-option.component.html',
  exportAs: 'uk2FilterChipOption',
})
export class Uk2FilterChipOverlayOptionComponent
  implements OnChanges, OnDestroy, FocusableOption, IUK2FilterChipOverlayOption
{
  @Input() uk2Multiple: boolean = false;
  @Input() uk2Value: string = '';
  @Input() uk2IsDisabled: boolean = false;
  @Input() uk2Selected = false;
  disabled?: boolean | undefined;
  checked!: boolean;
  elementRef = inject(ElementRef);

  private uk2FilterChipState = inject(Uk2FilterChipStateService);
  private value$ = this.uk2FilterChipState.filterChipState$.pipe(map(state => state.value));
  private stateValue!: string | string[];
  private destroy$ = new Subject<void>();

  constructor() {
    this.value$?.pipe(takeUntil(this.destroy$)).subscribe(value => {
      this.stateValue = value;
      this.checked = this.checkSelected();
    });
  }

  @HostListener('click') uk2ClickListener(): void {
    this.onClick();
  }

  @HostListener('keydown.enter') uk2EnterListener(): void {
    this.onClick();
  }

  @HostListener('keydown.space') uk2SpaceListener(): void {
    this.onClick();
  }

  @HostBinding('class.uk2-filter-chip-overlay-option--disabled') get isDisabled(): boolean {
    return this.uk2IsDisabled;
  }

  @HostBinding('class.uk2-filter-chip-option') get uk2Class(): boolean {
    return true;
  }

  @HostBinding('class.uk2-filter-chip-multiple-option') get uk2MultipleClass(): boolean {
    return this.uk2Multiple;
  }

  @HostBinding('class.uk2-filter-chip-option-active') get uk2ActiveClass(): boolean {
    return this.checked;
  }

  @HostBinding('tabindex') get tabIndex() {
    return 0;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { uk2IsDisabled } = changes;

    if (uk2IsDisabled) {
      this.disabled = uk2IsDisabled.currentValue;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onClick(): void {
    if (this.uk2IsDisabled) return;

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
    this.elementRef.nativeElement.focus();
  }

  private checkSelected(): boolean {
    if (this.uk2Multiple) {
      return this.stateValue?.includes(this.uk2Value);
    }
    return this.stateValue === this.uk2Value;
  }
}
