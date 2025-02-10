import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Uk2ButtonSizeEnum, Uk2FilterChipBooleanComponent, Uk2FilterValue, Uk2ListItem } from '@axos/uikit-v2-lib';

@Component({
  selector: 'filter-bar-docs',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss'],
})
export class FilterBarComponent {
  @Input() isLoading = false;
  @Input() showAddFilterButton = true;
  @Input() showClearFiltersButton = true;
  @Output() filterChanged = new EventEmitter<Uk2FilterValue>();
  relatedContainer?: HTMLElement;
  columns: { [key: string]: { options: Uk2ListItem[] } } = {
    Name: {
      options: [
        {
          value: 'Luis',
          headerLabelName: 'Luis',
          uk2IsSelected: false,
        },
        {
          value: 'John',
          headerLabelName: 'John',
          uk2IsSelected: false,
        },
        {
          value: 'Maria',
          headerLabelName: 'Maria',
          uk2IsSelected: false,
        },
        {
          value: 'Sara',
          headerLabelName: 'Sara',
          uk2IsSelected: false,
        },
      ],
    },
    'Last name': {
      options: [
        {
          value: 'Doe',
          headerLabelName: 'Doe',
          uk2IsSelected: false,
        },
        {
          value: 'Smith',
          headerLabelName: 'Smith',
          uk2IsSelected: false,
        },
        {
          value: 'Johnson',
          headerLabelName: 'Johnson',
          uk2IsSelected: false,
        },
        {
          value: 'Garcia',
          headerLabelName: 'Garcia',
          uk2IsSelected: false,
        },
      ],
    },
    'Is admin': {
      options: [
        {
          value: 'Yes',
          headerLabelName: 'Yes',
          uk2IsSelected: false,
        },
        {
          value: 'No',
          headerLabelName: 'No',
          uk2IsSelected: false,
        },
      ],
    },
    'Record name': {
      options: [
        {
          value: 'Record 1',
          headerLabelName: 'Record 1',
          uk2IsSelected: false,
        },
        {
          value: 'Record 2',
          headerLabelName: 'Record 2',
          uk2IsSelected: false,
        },
        {
          value: 'Record 3',
          headerLabelName: 'Record 3',
          uk2IsSelected: false,
        },
        {
          value: 'Record 4',
          headerLabelName: 'Record 4',
          uk2IsSelected: false,
        },
      ],
    },
    'Money amount': {
      options: [
        {
          value: '100',
          headerLabelName: '100',
          uk2IsSelected: false,
        },
        {
          value: '200',
          headerLabelName: '200',
          uk2IsSelected: false,
        },
        {
          value: '300',
          headerLabelName: '300',
          uk2IsSelected: false,
        },
        {
          value: '400',
          headerLabelName: '400',
          uk2IsSelected: false,
        },
      ],
    },
    Description: {
      options: [
        {
          value: 'Description 1',
          headerLabelName: 'Description 1',
          uk2IsSelected: false,
        },
        {
          value: 'Description 2',
          headerLabelName: 'Description 2',
          uk2IsSelected: false,
        },
        {
          value: 'Description 3',
          headerLabelName: 'Description 3',
          uk2IsSelected: false,
        },
        {
          value: 'Description 4',
          headerLabelName: 'Description 4',
          uk2IsSelected: false,
        },
      ],
    },
  };
  smallSize = Uk2ButtonSizeEnum.small;
  addFilterMenuOpen = false;
  columnOptions = Object.keys(this.columns);

  // filter chip properties
  items: { label: string; options: Uk2ListItem[]; isMultiple: boolean }[] = [
    {
      label: 'Name',
      options: [
        {
          value: 'Luis',
          headerLabelName: 'Luis',
          uk2IsSelected: false,
        },
        {
          value: 'John',
          headerLabelName: 'John',
          uk2IsSelected: false,
        },
        {
          value: 'Maria',
          headerLabelName: 'Maria',
          uk2IsSelected: true,
        },
        {
          value: 'Sara',
          headerLabelName: 'Sara',
          uk2IsSelected: false,
        },
      ],
      isMultiple: true,
    },
    {
      label: 'Last name',
      options: [
        {
          value: 'Doe',
          headerLabelName: 'Doe',
          uk2IsSelected: false,
        },
        {
          value: 'Smith',
          headerLabelName: 'Smith',
          uk2IsSelected: true,
        },
        {
          value: 'Johnson',
          headerLabelName: 'Johnson',
          uk2IsSelected: false,
        },
        {
          value: 'Garcia',
          headerLabelName: 'Garcia',
          uk2IsSelected: false,
        },
      ],
      isMultiple: false,
    },
    {
      label: 'Is Admin',
      options: [
        {
          value: 'Yes',
          headerLabelName: 'Yes',
          uk2IsSelected: false,
        },
        {
          value: 'No',
          headerLabelName: 'No',
          uk2IsSelected: false,
        },
      ],
      isMultiple: false,
    },
  ];

  handleDropEvent(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  }

  addFilter(column: string) {
    this.items.push({
      label: column,
      options: this.columns[column].options,
      isMultiple: false,
    });
  }

  removeFilter(item: any) {
    this.items = this.items.filter(i => i !== item);
  }

  handleOptionClick(filterChipBoolean: Uk2FilterChipBooleanComponent) {
    if (filterChipBoolean.uk2IsMultiple) return;
    filterChipBoolean.closeOverlay();
  }
}
