import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Uk2Condition, Uk2FilterChipOption, Uk2FilterValue } from '@axos/uikit-v2-lib';

@Component({
  selector: 'filter-chip-boolean',
  templateUrl: './filter-chip-boolean.component.html',
  styleUrls: ['./filter-chip-boolean.component.scss'],
})
export class FilterChipBooleanComponent {
  @Input() identifier: string = 'Name';
  @Input() isMultiple = false;
  @Input() isLoading: boolean = false;
  @Input() overlayMinWidth = 'auto';
  @Output() removeFilter = new EventEmitter<void>();
  @Output() filterChanged = new EventEmitter<Uk2FilterValue>();
  options: Uk2FilterChipOption[] = [
    {
      value: 'Luis',
      selected: false,
    },
    {
      value: 'Sara',
      selected: false,
    },
    {
      value: 'John',
      selected: false,
    },
    {
      value: 'Peter',
      selected: false,
    },
  ];
  conditions: Uk2Condition[] = [
    {
      label: 'Is',
      buttonLabel: 'Is',
    },
    {
      label: 'Is not',
      buttonLabel: 'Not',
    },
  ];
}
