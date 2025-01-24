import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Uk2BaseFilterChip } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';
import { Uk2FilterChipStateService } from '@axos/uikit-v2-lib/src/lib/uk2-services';
import { Uk2Condition, Uk2FilterChipOption, Uk2FilterValue } from '@axos/uikit-v2-lib/src/lib/uk2-shared';

import { Uk2FilterChipOverlayComponent } from '../uk2-filter-chip-overlay';
import { Uk2FilterChipOverlayLabelComponent } from '../uk2-filter-chip-overlay-label';

@Component({
  selector: 'uk2-filter-chip-boolean',
  templateUrl: './uk2-filter-chip-boolean.component.html',
  providers: [
    Uk2FilterChipStateService,
    {
      provide: Uk2BaseFilterChip,
      useExisting: Uk2FilterChipBooleanComponent,
    },
  ],
})
export class Uk2FilterChipBooleanComponent extends Uk2BaseFilterChip<string> implements OnInit, OnDestroy, OnChanges {
  @ViewChild('filterChipOverlay') filterChipOverlay?: Uk2FilterChipOverlayComponent;
  @ViewChild('filterChipOverlayLabel') filterChipOverlayLabel?: Uk2FilterChipOverlayLabelComponent;
  @Input() uk2Conditions: Uk2Condition[] = [
    {
      label: 'Is',
      buttonLabel: 'Is',
    },
    {
      label: 'Is not',
      buttonLabel: 'Not',
    },
  ];
  @Input() uk2Options: Uk2FilterChipOption[] = [];
  @Input() uk2Identifier!: string;
  @Input() uk2IsMultiple = false;
  @Input()
  override get uk2IsLoading(): boolean {
    return this._uk2IsLoading;
  }
  override set uk2IsLoading(value: boolean) {
    this._uk2IsLoading = value;
    if (value) {
      this.closeOverlay();
    }
  }
  @Input() uk2FilterValue? = '';
  @Input() uk2OverlayMinWidth = 'auto';
  @Output() uk2DeleteFilter = new EventEmitter<void>();
  @Output() uk2FilterValueChanges = new EventEmitter<Uk2FilterValue>();

  private _uk2IsLoading = false;
  private destroy$ = new Subject<void>();

  constructor(public uk2FilterChipStateService: Uk2FilterChipStateService) {
    super();

    this.uk2FilterChipStateService.setConditional(this.uk2Conditions[0]);
    this.uk2FilterChipStateService.setActive(false);
    this.uk2FilterChipStateService.setOverlayMinWidth(this.uk2OverlayMinWidth);
  }

  ngOnInit(): void {
    this.uk2FilterChipStateService.filterDeleted$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.uk2DeleteFilter.emit();
    });

    this.uk2FilterChipStateService.filterValue$.pipe(takeUntil(this.destroy$)).subscribe(filterValue => {
      this.uk2FilterValueChanges.emit(filterValue);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { uk2OverlayMinWidth, uk2Options, uk2Identifier, uk2Conditions } = changes;

    if (uk2Identifier) {
      this.uk2FilterChipStateService.setIdentifier(this.uk2Identifier);
    }
    if (uk2Conditions) {
      this.uk2Conditions.length && this.uk2FilterChipStateService.setConditional(this.uk2Conditions[0]);
    }
    if (uk2OverlayMinWidth) {
      this.uk2FilterChipStateService.setOverlayMinWidth(this.uk2OverlayMinWidth);
    }
    if (uk2Options && this.uk2Options.length) {
      this.setValueUsingOption();
    }
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
   * Handle option selected if is multiple it wont close overlay.
   * @memberof Uk2FilterChipBooleanComponent
   * @param {void} - No parameters.
   * @returns {void}
   * @example
   * handleOptionSelected();
   */
  handleOptionSelected(): void {
    if (!this.uk2IsMultiple) {
      this.closeOverlay();
    }
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

  private setValueUsingOption() {
    const selectedOptions: string[] = this.uk2Options.filter(option => option.selected).map(option => option.value);

    if (!this.uk2IsMultiple && selectedOptions.length) {
      this.uk2FilterChipStateService.setValue(selectedOptions[0]);
    } else {
      this.uk2FilterChipStateService.setValue(selectedOptions);
    }
  }
}
