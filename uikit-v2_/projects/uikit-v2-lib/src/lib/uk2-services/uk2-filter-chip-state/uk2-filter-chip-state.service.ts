import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Uk2Condition, Uk2FilterChipState, Uk2FilterValue } from '@axos/uikit-v2-lib/src/lib/uk2-shared';

@Injectable()
export class Uk2FilterChipStateService {
  // The current state of the filter chip.
  filterChipState$: Observable<Uk2FilterChipState>;
  // Observable that emits when the overlay opens.
  openOverlay$: Observable<void>;
  // Observable that emits when the filter is deleted.
  filterDeleted$: Observable<void>;
  // Observable that emits the filter value when an option is selected or filter chip is clear.
  filterValue$: Observable<Uk2FilterValue>;

  private _optionSelected$ = new Subject<void>();
  private _filterChipState$ = new BehaviorSubject<Uk2FilterChipState>({
    conditional: {
      buttonLabel: '',
      label: '',
    },
    value: null,
    identifier: '',
    isActive: false,
    isPressed: false,
    formattedIdentifier: '',
    formattedCondition: '',
    overlayMinWidth: 'auto',
    closeOverlayAfterClear: true,
    isMultiple: false,
    filterChipMaxWidth: 327,
    showClearSelection: true,
  });
  private _openOverlay = new Subject<void>();
  private _deleted$ = new Subject<void>();

  constructor() {
    // expose observables as public properties
    this.filterChipState$ = this._filterChipState$.asObservable().pipe(
      map(state => ({
        ...state,
        formattedIdentifier: this.getFormattedIdentifier(state),
        formattedCondition: this.getFormattedCondition(state),
      }))
    );
    this.openOverlay$ = this._openOverlay.asObservable();
    this.filterDeleted$ = this._deleted$.asObservable();
    this.filterValue$ = this._optionSelected$.pipe(map(() => this.getFilterValue()));
  }

  /**
   * Sets the conditional for the filter chip.
   *  @memberof Uk2FilterChipStateService
   * @param {Uk2Condition} conditional - The conditional to set.
   * @returns {void}
   * @example
   * setConditional({ buttonLabel: 'Is', label: 'Is' });
   */
  setConditional(conditional: Uk2Condition) {
    const state = this._filterChipState$.value;
    this._filterChipState$.next({
      ...state,
      conditional,
    });
  }

  /**
   * Sets the identifier for the filter chip.
   * @memberof Uk2FilterChipStateService
   * @param {string} identifier - The identifier to set.
   * @returns {void}
   * @example
   * setIdentifier('Name');
   */
  setIdentifier(identifier: string) {
    const state = this._filterChipState$.value;
    this._filterChipState$.next({
      ...state,
      identifier,
    });
  }

  /**
   * Sets the active state of the filter chip.
   * @memberof Uk2FilterChipStateService
   * @param {boolean} active - The active state to set.
   * @returns {void}
   * @example
   * setActive(true);
   */
  setActive(active: boolean) {
    const state = this._filterChipState$.value;
    this._filterChipState$.next({
      ...state,
      isActive: active,
    });
  }

  /**
   * Sets the value for the filter chip.
   * @memberof Uk2FilterChipStateService
   * @param {any} value - The value to set.
   * @returns {void}
   * @example
   * setValue('Option 1');
   */
  setValue(value: any) {
    const state = this._filterChipState$.value;
    let active = false;

    if (value === null || value === undefined) {
      this._filterChipState$.next({
        ...state,
        isActive: false,
        value,
      });

      return;
    }

    if (value instanceof Array) {
      active = value.length > 0;
    } else {
      active = value !== '';
    }

    this._filterChipState$.next({
      ...state,
      isActive: active,
      value,
    });
  }

  /**
   * Sets the pressed state for the filter chip.
   * @memberof Uk2FilterChipStateService
   * @param {boolean} pressed - The pressed state to set.
   * @returns {void}
   * @example
   * setPressed(true);
   */
  setPressed(pressed: boolean) {
    const state = this._filterChipState$.value;
    this._filterChipState$.next({
      ...state,
      isPressed: pressed,
    });
  }

  /**
   * Sets the overlay min width for the filter chip.
   * @memberof Uk2FilterChipStateService
   * @param {string} overlayMinWidth - The overlay min width to set.
   * @returns {void}
   * @example
   * setOverlayMinWidth('200px');
   */
  setOverlayMinWidth(overlayMinWidth: string) {
    const state = this._filterChipState$.value;
    this._filterChipState$.next({
      ...state,
      overlayMinWidth,
    });
  }

  /**
   * Sets the close overlay after clear state for the filter chip.
   * @memberof Uk2FilterChipStateService
   * @param {boolean} closeOverlayAfterClear - The close overlay after clear state to set.
   * @returns {void}
   * @example
   * setCloseOverlayAfterClear(false);
   */
  setCloseOverlayAfterClear(closeOverlayAfterClear: boolean) {
    const state = this._filterChipState$.value;
    this._filterChipState$.next({
      ...state,
      closeOverlayAfterClear,
    });
  }

  /**
   * Sets the multiple state for the filter chip.
   * @memberof Uk2FilterChipStateService
   * @param {boolean} isMultiple - The multiple state to set.
   * @returns {void}
   * @example
   * setIsMultiple(true);
   */
  setIsMultiple(isMultiple: boolean) {
    const state = this._filterChipState$.value;
    this._filterChipState$.next({
      ...state,
      isMultiple,
    });
  }

  /**
   * Sets the max width for the filter chip.
   * @memberof Uk2FilterChipStateService
   * @param {number} maxWidth - The max width to set.
   * @returns {void}
   * @example
   * setFilterChipMaxWidth(327);
   */
  setFilterChipMaxWidth(maxWidth: number) {
    const state = this._filterChipState$.value;
    this._filterChipState$.next({
      ...state,
      filterChipMaxWidth: maxWidth,
    });
  }

  /**
   * Sets the clear selection state for the filter chip.
   * @memberof Uk2FilterChipStateService
   * @param {boolean} showClearSelection - The clear selection state to set.
   * @returns {void}
   * @example
   * setClearSelection(true);
   */
  setShowClearSelection(showClearSelection: boolean) {
    const state = this._filterChipState$.value;
    this._filterChipState$.next({
      ...state,
      showClearSelection,
    });
  }

  /**
   * Gets the identifier for the filter chip.
   * @memberof Uk2FilterChipStateService
   * @returns {string}
   * @example
   * getIdentifier();
   * // returns 'Name'
   */
  getIdentifier() {
    return this._filterChipState$.value.identifier;
  }

  /**
   * Gets the conditional for the filter chip.
   * @memberof Uk2FilterChipStateService
   * @returns {Uk2Condition}
   * @example
   * getConditional();
   * // returns { buttonLabel: 'Is', label: 'Is' }
   */
  getConditional() {
    return this._filterChipState$.value.conditional;
  }

  /**
   * Gets the active state for the filter chip.
   * @memberof Uk2FilterChipStateService
   * @returns {boolean}
   * @example
   * getActive();
   * // returns true
   */
  getActive() {
    return this._filterChipState$.value.isActive;
  }

  /**
   * Gets the value for the filter chip.
   * @memberof Uk2FilterChipStateService
   * @returns {any}
   * @example
   * getValue();
   * // returns 'Option 1'
   */
  getValue() {
    return this._filterChipState$.value.value;
  }

  /**
   * Gets the pressed state for the filter chip.
   * @memberof Uk2FilterChipStateService
   * @returns {boolean}
   * @example
   * getPressed();
   * // returns true
   */
  getPressed() {
    return this._filterChipState$.value.isPressed;
  }

  /**
   * Gets the overlay min width for the filter chip.
   * @memberof Uk2FilterChipStateService
   * @returns {string}
   * @example
   * getOverlayMinWidth();
   * // returns '200px'
   */
  getOverlayMinWidth() {
    return this._filterChipState$.value.overlayMinWidth;
  }

  /**
   * Gets the filter value for the filter chip.
   * @memberof Uk2FilterChipStateService
   * @returns {Uk2FilterValue}
   * @example
   * getFilterValue();
   * returns { conditional: { buttonLabel: 'Is', label: 'Is' }, identifier: 'Name', value: 'Option' }
   */
  getFilterValue(): Uk2FilterValue {
    const { conditional, identifier, value } = this._filterChipState$.value;
    return {
      conditional,
      identifier,
      value,
    };
  }

  /**
   * Gets the close overlay after clear state for the filter chip.
   * @memberof Uk2FilterChipStateService
   * @returns {boolean}
   * @example
   * getCloseOverlayAfterClear();
   * returns true
   */
  getCloseOverlayAfterClear(): boolean {
    return this._filterChipState$.value.closeOverlayAfterClear;
  }

  /**
   * Gets the multiple state for the filter chip.
   * @memberof Uk2FilterChipStateService
   * @returns {boolean}
   * @example
   * getIsMultiple();
   * returns true
   */
  getIsMultiple(): boolean {
    return this._filterChipState$.value.isMultiple;
  }

  /**
   * Gets the max width for the filter chip.
   * @memberof Uk2FilterChipStateService
   * @returns {number}
   * @example
   * getMaxWidth();
   * returns 327
   */
  getFilterChipMaxWidth(): number {
    return this._filterChipState$.value.filterChipMaxWidth;
  }

  /**
   * Gets the clear selection state for the filter chip.
   * @memberof Uk2FilterChipStateService
   * @returns {boolean}
   * @example
   * getClearSelection();
   * returns true
   */
  getShowClearSelection(): boolean {
    return this._filterChipState$.value.showClearSelection;
  }

  /**
   * Notifies the service that the overlay is open.
   * Used by overlay component to set focus on the first option when overlay is open.
   * @memberof Uk2FilterChipStateService
   * @returns {void}
   */
  openOverlay() {
    this._openOverlay.next();
  }

  /**
   * Notifies the service that the filter chip has been deleted.
   * Used by filter chip component to emit the delete output.
   * @memberof Uk2FilterChipStateService
   * @returns {void}
   */
  deleteFilter() {
    this._deleted$.next();
  }

  /**
   * Notifies the service that an option has been selected.
   * Used by filter chip components to emit output when value changes or when chip is cleared.
   * @memberof Uk2FilterChipStateService
   * @returns {void}
   */
  optionSelected() {
    this._optionSelected$.next();
  }

  private getFormattedIdentifier(state: Uk2FilterChipState): string {
    const { identifier, isActive: active } = state;
    return `${identifier}${active ? ': ' : ''}`;
  }

  private getFormattedCondition(state: Uk2FilterChipState): string {
    let { conditional, isActive: active, value } = state;

    if (value instanceof Array) {
      value = value.join(', ');
    }

    return active ? `${conditional.buttonLabel} ${value}` : '';
  }
}
