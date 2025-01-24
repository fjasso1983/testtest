import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Uk2ButtonSizeEnum, Uk2FilterChipOption, Uk2FilterValue } from '@axos/uikit-v2-lib';

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
  columns: any = {
    Name: {
      options: ['Luis', 'John', 'Maria', 'Sara'],
    },
    'Last name': {
      options: ['Doe', 'Smith', 'Johnson', 'Garcia'],
    },
    'Is admin': {
      options: ['Yes', 'No'],
    },
    'Record name': {
      options: ['Record 1', 'Record 2', 'Record 3', 'Record 4'],
    },
    'Money amount': {
      options: ['100', '200', '300', '400'],
    },
    Description: {
      options: ['Description 1', 'Description 2', 'Description 3', 'Description 4'],
    },
  };
  smallSize = Uk2ButtonSizeEnum.small;
  addFilterMenuOpen = false;
  columnOptions = Object.keys(this.columns);

  // filter chip properties
  items: { label: string; options: Uk2FilterChipOption[]; isMultiple: boolean }[] = [
    {
      label: 'Name',
      options: [
        { value: 'Luis', selected: false },
        { value: 'John', selected: false },
        { value: 'Maria', selected: true },
        { value: 'Sara', selected: true },
      ],
      isMultiple: true,
    },
    {
      label: 'Last name',
      options: [
        { value: 'Doe', selected: false },
        { value: 'Smith', selected: true },
        { value: 'Johnson', selected: false },
        { value: 'Garcia', selected: false },
      ],
      isMultiple: false,
    },
    {
      label: 'Is Admin',
      options: [
        { value: 'Yes', selected: false },
        { value: 'No', selected: false },
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
}
