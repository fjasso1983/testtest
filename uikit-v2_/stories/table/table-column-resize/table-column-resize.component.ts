import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table-column-resize',
  templateUrl: './table-column-resize.component.html',
  styleUrls: ['./table-column-resize.component.scss', '../../../projects/uikit-v2-lib/src/styles/uk2.scss'],
})
export class TableColumnResizeComponent {
  @Input() firstColumnWidth: string = '80px';
  @Input() disableFirstColumnResize: boolean = false;

  displayedColumns: string[] = ['record', 'propertyA', 'propertyB', 'propertyC', 'propertyD', 'amount'];
  dataSource = new MatTableDataSource<RecordTable>(TableData);

  constructor() {}

  onColumnResize(newSize: string) {}
}

const TableData: RecordTable[] = [
  {
    record: 1,
    propertyA: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    propertyB: 'Lorem Ipsum dolor sit amet',
    propertyC: 'Lorem Ipsum',
    propertyD: 'Lorem Ipsum',
    amount: 1234.56,
  },
  {
    record: 2,
    propertyA: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    propertyB: 'Lorem Ipsum dolor sit amet',
    propertyC: 'Lorem Ipsum',
    propertyD: 'Lorem Ipsum',
    amount: 1234.56,
  },
  {
    record: 3,
    propertyA: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    propertyB: 'Lorem Ipsum dolor sit amet',
    propertyC: 'Lorem Ipsum',
    propertyD: 'Lorem Ipsum',
    amount: 1234.56,
  },
  {
    record: 4,
    propertyA: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    propertyB: 'Lorem Ipsum dolor sit amet',
    propertyC: 'Lorem Ipsum',
    propertyD: 'Lorem Ipsum',
    amount: 1234.56,
  },
  {
    record: 5,
    propertyA: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    propertyB: 'Lorem Ipsum dolor sit amet',
    propertyC: 'Lorem Ipsum',
    propertyD: 'Lorem Ipsum',
    amount: 1234.56,
  },
  {
    record: 6,
    propertyA: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    propertyB: 'Lorem Ipsum dolor sit amet',
    propertyC: 'Lorem Ipsum',
    propertyD: 'Lorem Ipsum',
    amount: 1234.56,
  },
];

interface RecordTable {
  record: number;
  propertyA: string;
  propertyB: string;
  propertyC: string;
  propertyD: string;
  amount: number;
}
