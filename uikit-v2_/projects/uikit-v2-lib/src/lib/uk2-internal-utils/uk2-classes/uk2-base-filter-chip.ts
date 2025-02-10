import {
  AfterContentInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  QueryList,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Uk2Condition, Uk2FilterValue } from '@axos/uikit-v2-lib/src/lib/uk2-shared';

import {
  IUK2FilterChipOverlayOption,
  IUk2FilterChipOverlay,
  IUk2FilterChipOverlayLabel,
  IUk2FilterChipService,
  IUk2IsLoading,
} from '../uk2-interfaces';

@Component({
  template: '',
})
export abstract class Uk2BaseFilterChipComponent<T>
  implements IUk2IsLoading, OnInit, OnChanges, AfterContentInit, OnDestroy
{
  @Input()
  get uk2IsLoading(): boolean {
    return this._uk2IsLoading;
  }
  set uk2IsLoading(value: boolean) {
    this._uk2IsLoading = value;
    if (value) {
      this.closeOverlay();
    }
  }
  @Input() uk2Identifier!: string;
  @Input() uk2IsMultiple = false;
  @Input() uk2OverlayMinWidth = 'auto';
  @Input() uk2CloseOverlayAfterClear = true;
  @Input() uk2FilterChipMaxWidth = 327;

  abstract uk2FilterValue?: T;
  abstract uk2FilterChipStateService: IUk2FilterChipService;
  abstract uk2Conditions: Uk2Condition[];
  abstract uk2ShowClearSelection: boolean;
  abstract filterChipOverlay?: IUk2FilterChipOverlay;
  abstract filterChipOverlayLabel?: IUk2FilterChipOverlayLabel;
  abstract uk2FilterChipOverlayOptions: QueryList<IUK2FilterChipOverlayOption>;
  abstract uk2FilterValueChanges: EventEmitter<Uk2FilterValue>;
  abstract uk2DeleteFilter: EventEmitter<void>;
  private _uk2IsLoading = false;
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.uk2FilterChipStateService.filterDeleted$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.uk2DeleteFilter.emit();
    });

    this.uk2FilterChipStateService.filterValue$.pipe(takeUntil(this.destroy$)).subscribe(filterValue => {
      this.uk2FilterValueChanges.emit(filterValue);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.handleIdentifierChange(changes.uk2Identifier);
    this.handleConditionsChange(changes.uk2Conditions);
    this.handleOverlayMinWidthChange(changes.uk2OverlayMinWidth);
    this.handleCloseOverlayAfterClearChange(changes.uk2CloseOverlayAfterClear);
    this.handleIsMultipleChange(changes.uk2IsMultiple);
    this.handleFilterChipMaxWidthChange(changes.uk2FilterChipMaxWidth);
    this.handleShowClearSelectionChange(changes.uk2ShowClearSelection);
  }

  ngAfterContentInit(): void {
    this.setValueUsingOption();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Opens filter chip overlay.
   * @memberof Uk2FilterChipBooleanComponent
   * @param {void} - No parameters.
   * @returns {void}
   * @example
   * openOverlay();
   */
  openOverlay(): void {
    if (this.uk2IsLoading) return;
    const overlayRef = this.filterChipOverlay?.open();
    overlayRef?.outsidePointerEvents().subscribe(() => {
      this.filterChipOverlay?.close();
    });
  }

  /**
   * Closes filter chip overlay.
   * @memberof Uk2FilterChipBooleanComponent
   * @param {void} - No parameters.
   * @returns {void}
   * @example
   * closeOverlay();
   */
  closeOverlay(): void {
    this.filterChipOverlay?.close();
    this.filterChipOverlayLabel?.closeOverlays();
  }

  /**
   * Clears the filter chip value.
   * @memberof Uk2FilterChipBooleanComponent
   * @param {void} - No parameters.
   * @returns {void}
   * @example
   * clearValue();
   */
  clearValue(): void {
    this.uk2FilterChipStateService.setValue('');
    this.uk2FilterChipStateService.optionSelected();
  }

  private handleIdentifierChange(change: SimpleChange): void {
    if (change) {
      this.uk2FilterChipStateService.setIdentifier(change.currentValue);
    }
  }

  private handleConditionsChange(change: SimpleChange): void {
    if (change && change.currentValue.length) {
      this.uk2FilterChipStateService.setConditional(change.currentValue[0]);
    }
  }

  private handleOverlayMinWidthChange(change: SimpleChange): void {
    if (change) {
      this.uk2FilterChipStateService.setOverlayMinWidth(change.currentValue);
    }
  }

  private handleCloseOverlayAfterClearChange(change: SimpleChange): void {
    if (change) {
      this.uk2FilterChipStateService.setCloseOverlayAfterClear(change.currentValue);
    }
  }

  private handleIsMultipleChange(change: SimpleChange): void {
    if (change) {
      this.uk2FilterChipStateService.setIsMultiple(change.currentValue);
    }
  }

  private handleFilterChipMaxWidthChange(change: SimpleChange): void {
    if (change) {
      this.uk2FilterChipStateService.setFilterChipMaxWidth(change.currentValue);
    }
  }

  private handleShowClearSelectionChange(change: SimpleChange): void {
    if (change) {
      this.uk2FilterChipStateService.setShowClearSelection(change.currentValue);
    }
  }

  private setValueUsingOption() {
    const selectedOptions = this.uk2FilterChipOverlayOptions
      .filter(option => option.uk2Selected)
      .map(option => option.uk2Value);

    if (!this.uk2FilterChipStateService.getIsMultiple() && selectedOptions.length) {
      this.uk2FilterChipStateService.setValue(selectedOptions[0] || '');
    } else {
      this.uk2FilterChipStateService.setValue(selectedOptions);
    }
  }
}
