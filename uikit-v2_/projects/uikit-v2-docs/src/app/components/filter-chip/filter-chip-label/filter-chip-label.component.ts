import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import {
  Uk2ButtonSizeEnum,
  Uk2ChipSizesEnum,
  Uk2ChipTypesEnum,
  Uk2Condition,
  Uk2FilterChipOption,
  Uk2FilterValue,
} from '@axos/uikit-v2-lib';

interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1,
    name: 'Hydrogen',
    weight: 1.0079,
    symbol: 'H',
  },
  {
    position: 2,
    name: 'Helium',
    weight: 4.0026,
    symbol: 'He',
  },
  {
    position: 3,
    name: 'Lithium',
    weight: 6.941,
    symbol: 'Li',
  },
  {
    position: 4,
    name: 'Beryllium',
    weight: 9.0122,
    symbol: 'Be',
  },
  {
    position: 5,
    name: 'Boron',
    weight: 10.811,
    symbol: 'B',
  },
  {
    position: 6,
    name: 'Carbon',
    weight: 12.0107,
    symbol: 'C',
  },
  {
    position: 7,
    name: 'Nitrogen',
    weight: 14.0067,
    symbol: 'N',
  },
  {
    position: 8,
    name: 'Oxygen',
    weight: 15.9994,
    symbol: 'O',
  },
  {
    position: 9,
    name: 'Fluorine',
    weight: 18.9984,
    symbol: 'F',
  },
  {
    position: 10,
    name: 'Neon',
    weight: 20.1797,
    symbol: 'Ne',
  },
];

@Component({
  selector: 'filter-chip-label',
  templateUrl: './filter-chip-label.component.html',
  styleUrls: ['./filter-chip-label.component.scss'],
})
export class FilterChipLabelComponent {
  fb = inject(FormBuilder);
  group!: FormGroup;
  smallSize = Uk2ButtonSizeEnum.small;
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
  customConditions: Uk2Condition[] = [
    {
      label: "Isn't",
      buttonLabel: "Isn't",
    },
    {
      label: 'Can be',
      buttonLabel: 'Can be',
    },
  ];
  options: Uk2FilterChipOption[] = [
    {
      value: 'John',
      selected: false,
    },
    {
      value: 'Peter',
      selected: false,
    },
    {
      value: 'Karol',
      selected: false,
    },
    {
      value: 'Michael',
      selected: false,
    },
    {
      value: 'George',
      selected: false,
    },
    {
      value: 'Tom',
      selected: false,
    },
    {
      value: 'Jerry',
      selected: false,
    },
    {
      value: 'Mickey',
      selected: false,
    },
    {
      value: 'Donald',
      selected: false,
    },
    {
      value: 'Daffy',
      selected: false,
    },
  ];
  nameOptions: Uk2FilterChipOption[] = [
    {
      value: 'Hydrogen',
      selected: false,
    },
    {
      value: 'Helium',
      selected: false,
    },
    {
      value: 'Lithium',
      selected: false,
    },
    {
      value: 'Beryllium',
      selected: false,
    },
    {
      value: 'Boron',
      selected: false,
    },
  ];
  symbolOptions: Uk2FilterChipOption[] = [
    {
      value: 'H',
      selected: false,
    },
    {
      value: 'He',
      selected: false,
    },
    {
      value: 'Li',
      selected: false,
    },
    {
      value: 'Be',
      selected: false,
    },
    {
      value: 'B',
      selected: false,
    },
  ];
  isMultiple = false;
  isFilterBarLoading = false;
  value?: Uk2FilterValue;
  items: any[] = [
    {
      label: 'Name',
      options: this.nameOptions,
    },
    {
      label: 'Symbol',
      options: this.symbolOptions,
    },
  ];
  columns: any = {
    position: {
      options: ['1', '2', '3', '4', '5'],
    },
    name: {
      options: this.nameOptions,
    },
    weight: {
      options: ['1.0079', '4.0026', '6.941', '9.0122', '10.811'],
    },
    symbol: {
      options: this.symbolOptions,
    },
  };
  columnOptions = ['Position', 'Name', 'Weight', 'Symbol'];
  addFilterMenuOpen = false;

  // table
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  //chip
  chipSize = Uk2ChipSizesEnum.extraSmall;
  chipType = Uk2ChipTypesEnum.rounded;

  constructor() {
    this.group = this.fb.group({
      identifier: 'Last Name',
      value: 'Chavez',
      conditional: 'Is',
      minWidth: 'auto',
    });
  }

  toggleMultipleSelectionOptions() {
    this.isMultiple = !this.isMultiple;
  }

  toggleFilterBarLoading() {
    this.isFilterBarLoading = !this.isFilterBarLoading;
  }

  handleDropEvent(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  }

  addFilter(column: string) {
    this.items.push({
      label: column,
      options: this.columns[column.toLowerCase()].options,
    });
  }

  updateValue(value: Uk2FilterValue) {
    this.value = value;
  }
}
