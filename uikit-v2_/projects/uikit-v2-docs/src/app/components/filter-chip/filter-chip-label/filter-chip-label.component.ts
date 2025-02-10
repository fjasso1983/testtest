import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import {
  Uk2ButtonSizeEnum,
  Uk2ChipSizesEnum,
  Uk2ChipTypesEnum,
  Uk2Condition,
  Uk2FilterValue,
  Uk2ListItem,
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
  options: Uk2ListItem[] = [
    {
      value: 'John',
      headerLabelName: 'John',
      uk2IsSelected: true,
    },
    {
      value: 'Peter',
      headerLabelName: 'Peter',
      uk2IsSelected: false,
    },
    {
      value: 'Karol',
      headerLabelName: 'Karol',
      uk2IsSelected: false,
    },
    {
      value: 'Michael',
      headerLabelName: 'Michae',
      uk2IsSelected: false,
    },
    {
      value: 'George',
      headerLabelName: 'George',
      uk2IsSelected: false,
    },
    {
      value: 'Tom',
      headerLabelName: 'Tom',
      uk2IsSelected: false,
    },
    {
      value: 'Jerry',
      headerLabelName: 'Jerry',
      uk2IsSelected: false,
    },
    {
      value: 'Mickey',
      headerLabelName: 'Mickey',
      uk2IsSelected: false,
    },
    {
      value: 'Donald',
      headerLabelName: 'Donald',
      uk2IsSelected: false,
    },
    {
      value: 'Daffy',
      headerLabelName: 'Daffy',
      uk2IsSelected: false,
    },
  ];
  nameOptions: Uk2ListItem[] = [
    {
      value: 'Hydrogen',
      headerLabelName: 'Hydrog',
      uk2IsSelected: false,
    },
    {
      value: 'Helium',
      headerLabelName: 'Helium',
      uk2IsSelected: false,
    },
    {
      value: 'Lithium',
      headerLabelName: 'Lithiu',
      uk2IsSelected: false,
    },
    {
      value: 'Beryllium',
      headerLabelName: 'Beryll',
      uk2IsSelected: false,
    },
    {
      value: 'Boron',
      headerLabelName: 'Boron',
      uk2IsSelected: false,
    },
  ];
  symbolOptions: Uk2ListItem[] = [
    {
      value: 'H',
      headerLabelName: 'H',
      uk2IsSelected: false,
    },
    {
      value: 'He',
      headerLabelName: 'He',
      uk2IsSelected: false,
    },
    {
      value: 'Li',
      headerLabelName: 'Li',
      uk2IsSelected: false,
    },
    {
      value: 'Be',
      headerLabelName: 'Be',
      uk2IsSelected: false,
    },
    {
      value: 'B',
      headerLabelName: 'B',
      uk2IsSelected: false,
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
      options: [
        {
          value: '1',
          headerLabelName: '1',
          uk2IsSelected: false,
        },
        {
          value: '2',
          headerLabelName: '2',
          uk2IsSelected: false,
        },
        {
          value: '3',
          headerLabelName: '3',
          uk2IsSelected: false,
        },
        {
          value: '4',
          headerLabelName: '4',
          uk2IsSelected: false,
        },
      ],
    },
    name: {
      options: this.nameOptions,
    },
    weight: {
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
