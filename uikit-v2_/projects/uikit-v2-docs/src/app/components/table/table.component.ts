import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import {
  Uk2SortChangeEvent,
  Uk2TableBorderStyleEnum,
  Uk2TableDensityEnum,
  Uk2TableTextBehaviorEnum,
} from '@axos/uikit-v2-lib';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnDestroy {
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  borderType = Uk2TableBorderStyleEnum.borderRadius8;

  tableBorderRadius: Uk2TableBorderStyleEnum = Uk2TableBorderStyleEnum.borderRadius8;
  tableDensity: Uk2TableDensityEnum = Uk2TableDensityEnum.medium;
  tableTextBehavior: Uk2TableTextBehaviorEnum = Uk2TableTextBehaviorEnum.wrap;
  destroy$ = new Subject<void>();

  //form controls
  borderRadiusControl = new FormControl('borderRadius8');
  tableDensityControl = new FormControl('medium');
  isLoadingControl = new FormControl(false);
  textBehaviorControl = new FormControl('wrap');
  disabledSortHeaders = new FormControl(false);
  disabledSortTable = new FormControl(false);

  ngOnInit(): void {
    this.borderRadiusControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => {
      switch (value) {
        case 'borderRadius8':
          this.tableBorderRadius = Uk2TableBorderStyleEnum.borderRadius8;
          break;
        case 'borderRadius16':
          this.tableBorderRadius = Uk2TableBorderStyleEnum.borderRadius16;
          break;
        default:
          this.tableBorderRadius = Uk2TableBorderStyleEnum.none;
          break;
      }
    });
    this.tableDensityControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => {
      switch (value) {
        case 'small':
          this.tableDensity = Uk2TableDensityEnum.small;
          break;
        case 'medium':
          this.tableDensity = Uk2TableDensityEnum.medium;
          break;
        default:
          this.tableDensity = Uk2TableDensityEnum.large;
          break;
      }
    });
    this.textBehaviorControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => {
      switch (value) {
        case 'wrap':
          this.tableTextBehavior = Uk2TableTextBehaviorEnum.wrap;
          break;
        case 'truncate':
          this.tableTextBehavior = Uk2TableTextBehaviorEnum.truncate;
          break;
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSortChange(sortChange: Uk2SortChangeEvent) {
    const { column, direction } = sortChange;

    const isAsc = direction === 'asc';

    this.dataSource.data = this.dataSource.data.sort((a, b) => {
      const valueA = a[column as keyof PeriodicElement];
      const valueB = b[column as keyof PeriodicElement];

      if (typeof valueA === 'number' && typeof valueB === 'number') return isAsc ? valueA - valueB : valueB - valueA;

      if (typeof valueA === 'string' && typeof valueB === 'string')
        return isAsc ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);

      return 0;
    });
  }
}

interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1,
    name: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
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
