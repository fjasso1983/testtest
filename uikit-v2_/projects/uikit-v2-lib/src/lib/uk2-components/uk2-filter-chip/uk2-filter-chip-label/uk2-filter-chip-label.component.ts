import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Uk2Tier1NavigationEnum, Uk2FilterChipStateService } from '@axos/uikit-v2-lib/src/lib/uk2-services';
import { Uk2FilterChipState } from '@axos/uikit-v2-lib/src/lib/uk2-shared';

@Component({
  selector: 'uk2-filter-chip-label',
  templateUrl: './uk2-filter-chip-label.component.html',
})
export class Uk2FilterChipLabelComponent implements OnInit, OnDestroy {
  @ViewChild('conditionalCloneEl') conditionalEl!: ElementRef<HTMLElement>;
  uk2FilterChipStateService = inject(Uk2FilterChipStateService);
  chevronDownIcon = Uk2Tier1NavigationEnum.chevronDown;
  showNumberOfItems = false;
  state$ = this.uk2FilterChipStateService.filterChipState$;
  private cdr = inject(ChangeDetectorRef);

  private optionSelected$ = this.uk2FilterChipStateService.filterValue$;
  private destroyed$ = new Subject<void>();

  ngOnInit(): void {
    this.optionSelected$.pipe(takeUntil(this.destroyed$)).subscribe(() => {
      setTimeout(() => {
        this.processShowNumberOfItems();
        this.cdr.markForCheck();
      });
    });
    setTimeout(() => {
      this.processShowNumberOfItems();
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  formatIdentifierNumberOfItems(state: Uk2FilterChipState): string {
    let identifier = state.identifier;

    return state.isActive ? `${identifier} (${state.value.length})` : identifier;
  }

  private processShowNumberOfItems() {
    if (this.calculateConditionsWidthOverflow()) {
      this.showNumberOfItems = true;
    } else {
      this.showNumberOfItems = false;
    }
  }

  private calculateConditionsWidthOverflow() {
    const EXTRA_SPACING = 18;
    const MAX_WIDTH = this.uk2FilterChipStateService.getFilterChipMaxWidth();
    if (!this.uk2FilterChipStateService.getIsMultiple()) return false;

    return this.conditionalEl?.nativeElement.clientWidth + EXTRA_SPACING > MAX_WIDTH;
  }
}
