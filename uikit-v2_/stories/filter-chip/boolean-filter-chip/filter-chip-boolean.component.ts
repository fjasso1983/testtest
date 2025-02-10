import { Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';

import { Uk2Condition, Uk2FilterChipBooleanComponent, Uk2FilterValue, Uk2ListItem } from '@axos/uikit-v2-lib';

@Component({
  selector: 'filter-chip-boolean',
  templateUrl: './filter-chip-boolean.component.html',
  styleUrls: ['./filter-chip-boolean.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FilterChipBooleanComponent {
  @Input() identifier: string = 'Name';
  @Input() isMultiple = false;
  @Input() isLoading: boolean = false;
  @Input() overlayMinWidth = 'auto';
  @Input() closeOverlayAfterClearSelection = false;
  @Input() filterChipMaxWidth = 327;
  @Input() showClearSelection = true;
  @Output() removeFilter = new EventEmitter<void>();
  @Output() filterChanged = new EventEmitter<Uk2FilterValue>();
  @ViewChild(Uk2FilterChipBooleanComponent) filterChipBooleanComponent!: Uk2FilterChipBooleanComponent;
  options: Uk2ListItem[] = [
    {
      showControl: this.isMultiple,
      headerLabelName: 'Alexander the Great',
      value: 'Alexander the Great',
      uk2IsSelected: true,
      svgIconName: 'uk2-location-pin',
    },
    {
      showControl: this.isMultiple,
      headerLabelName: 'Benjamin Franklin',
      value: 'Benjamin Franklin',
      svgIconName: 'uk2-exclamation-triangle',
    },
    {
      showControl: this.isMultiple,
      headerLabelName: 'John',
      value: 'John',
      uk2IsDisabled: true,
    },
    {
      showControl: this.isMultiple,
      headerLabelName: 'Katherine Johnson',
      value: 'Katherine Johnson',
      uk2IsLoading: true,
    },
    {
      showControl: this.isMultiple,
      headerLabelName: 'Sebastian the Crab',
      value: 'Sebastian the Crab',
      imageUrl: 'https://v15.angular.io/assets/images/logos/angular/shield-large.svg',
      moneyAmount: 926122.99,
      svgIconName: 'uk2-location-pin',
      bodyText: 'Consecutar sit perlabum',
      headerLabelIdentifier: '1234',
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

  handleOptionClick() {
    if (this.isMultiple) {
      return;
    }
    this.filterChipBooleanComponent.closeOverlay();
  }
}
