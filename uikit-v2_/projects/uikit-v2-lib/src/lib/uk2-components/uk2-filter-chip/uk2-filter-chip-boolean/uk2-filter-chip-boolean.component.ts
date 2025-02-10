import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

import { Uk2BaseFilterChipComponent } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';
import { Uk2FilterChipStateService } from '@axos/uikit-v2-lib/src/lib/uk2-services';
import { Uk2Condition, Uk2FilterValue } from '@axos/uikit-v2-lib/src/lib/uk2-shared';

import { Uk2FilterChipOverlayComponent } from '../uk2-filter-chip-overlay';
import { Uk2FilterChipOverlayLabelComponent } from '../uk2-filter-chip-overlay-label';
import { Uk2FilterChipOverlayOptionComponent } from '../uk2-filter-chip-overlay-option';

@Component({
  selector: 'uk2-filter-chip-boolean',
  templateUrl: './uk2-filter-chip-boolean.component.html',
  providers: [
    Uk2FilterChipStateService,
    {
      provide: Uk2BaseFilterChipComponent,
      useExisting: Uk2FilterChipBooleanComponent,
    },
  ],
  exportAs: 'uk2FilterChipBoolean',
})
export class Uk2FilterChipBooleanComponent
  extends Uk2BaseFilterChipComponent<string>
  implements OnInit, OnDestroy, OnChanges, AfterContentInit
{
  @ViewChild('filterChipOverlay') filterChipOverlay?: Uk2FilterChipOverlayComponent;
  @ViewChild('filterChipOverlayLabel') filterChipOverlayLabel?: Uk2FilterChipOverlayLabelComponent;
  @ContentChildren(Uk2FilterChipOverlayOptionComponent, { descendants: true })
  uk2FilterChipOverlayOptions!: QueryList<Uk2FilterChipOverlayOptionComponent>;
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
  @Input() uk2FilterValue? = '';
  @Input() uk2ShowClearSelection = true;
  @Output() uk2DeleteFilter = new EventEmitter<void>();
  @Output() uk2FilterValueChanges = new EventEmitter<Uk2FilterValue>();

  constructor(public uk2FilterChipStateService: Uk2FilterChipStateService) {
    super();

    this.uk2FilterChipStateService.setConditional(this.uk2Conditions[0]);
    this.uk2FilterChipStateService.setActive(false);
    this.uk2FilterChipStateService.setOverlayMinWidth(this.uk2OverlayMinWidth);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
  }

  ngAfterContentInit(): void {
    super.ngAfterContentInit();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
