import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Uk2SortChangeEvent, Uk2SortDirectionEnum } from '@axos/uikit-v2-lib';

@Component({
  selector: 'app-table-header-sorting',
  templateUrl: './table-sorting.component.html',
  styleUrls: ['./table-sorting.component.scss', '../../../projects/uikit-v2-lib/src/styles/uk2.scss'],
})
export class TableSortingComponent {
  @Input() disableTableSorting: boolean = false;
  @Input() disableFirstColumnSorting: boolean = false;
  @Input() initSortFirstColumn: boolean = true;
  @Input() initSortDirection: Uk2SortDirectionEnum = Uk2SortDirectionEnum.ascending;

  displayedColumns: string[] = ['record', 'propertyA', 'propertyB', 'propertyC', 'value', 'amount'];
  dataSource = new MatTableDataSource([...TableData]);

  onSortHeaderChange(sortChange: Uk2SortChangeEvent) {
    const { column, direction } = sortChange;

    const isAsc = direction === 'asc';

    this.dataSource.data = this.dataSource.data.sort((a, b) => {
      const valueA = a[column as keyof TableData];
      const valueB = b[column as keyof TableData];

      if (typeof valueA === 'number' && typeof valueB === 'number') return isAsc ? valueA - valueB : valueB - valueA;

      if (typeof valueA === 'string' && typeof valueB === 'string')
        return isAsc ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);

      return 0;
    });
  }
}

const TableData: TableData[] = [
  {
    record: 2,
    propertyA: 'a',
    propertyB: 'f',
    propertyC: 'United States',
    value: 5,
    amount: 1.1,
  },
  {
    record: 1,
    propertyA: 'b',
    propertyB: 'e',
    propertyC: 'Mexico',
    value: 10,
    amount: 1.01,
  },
  {
    record: 3,
    propertyA: 'c',
    propertyB: 'd',
    propertyC: 'Colombia',
    value: 1,
    amount: 1.001,
  },
  {
    record: 4,
    propertyA: 'd',
    propertyB: 'c',
    propertyC: 'Argentina',
    value: 25,
    amount: 0.99,
  },
  {
    record: 5,
    propertyA: 'e',
    propertyB: 'b',
    propertyC: 'Bolivia',
    value: 20,
    amount: 0.89,
  },
  {
    record: 6,
    propertyA: 'f',
    propertyB: 'a',
    propertyC: 'Venezuela',
    value: 3,
    amount: 0.09,
  },
];

interface TableData {
  record: number;
  propertyA: string;
  propertyB: string;
  propertyC: string;
  value: number;
  amount: number;
}
