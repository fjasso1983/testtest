import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Uk2TableBorderStyleEnum, Uk2Tier1NavigationEnum } from '@axos/uikit-v2-lib';

@Component({
  selector: 'app-table-scrolling-resize',
  templateUrl: './table-scrolling-resize.component.html',
  styleUrls: ['./table-scrolling-resize.component.scss'],
})
export class TableScrollingResizeComponent {
  displayedColumns: string[] = [
    'checkbox',
    'record',
    'propertyA',
    'propertyB',
    'propertyC',
    'propertyD',
    'propertyE',
    'propertyF',
    'propertyG',
    'propertyH',
    'amount',
    'fillColumn',
    'options',
  ];

  columnWidth = {
    checkbox: '90px',
    record: '100px',
    propertyA: '250px',
    propertyB: '250px',
    propertyC: '250px',
    propertyD: '250px',
    propertyE: '250px',
    propertyF: '250px',
    propertyG: '250px',
    propertyH: '250px',
    amount: '100px',
    options: '50px',
    fillColumn: '',
  };

  borderRadius = Uk2TableBorderStyleEnum.borderRadius16;
  ellipsisIcon = Uk2Tier1NavigationEnum.ellipsesVertical;
  tableData: RecordTable[] = [];
  dataSource = new MatTableDataSource<RecordTable>(this.tableData);

  constructor() {
    this.fillTableData();
  }

  fillTableData() {
    for (let index = 0; index < 25; index++) {
      this.tableData.push({
        checkbox: false,
        record: index + 1,
        propertyA: 'Lorem Ipsum dolor sit amet',
        propertyB: 'Lorem Ipsum dolor sit amet',
        propertyC: 'Lorem Ipsum dolor sit amet',
        propertyD: 'Lorem Ipsum dolor sit amet',
        propertyE: 'Lorem Ipsum dolor sit amet',
        propertyF: 'Lorem Ipsum dolor sit amet',
        propertyG: 'Lorem Ipsum dolor sit amet',
        propertyH: 'Lorem Ipsum dolor sit amet',
        amount: 1234.56,
      });
    }
  }
}

interface RecordTable {
  checkbox: boolean;
  record: number;
  propertyA: string;
  propertyB: string;
  propertyC: string;
  propertyD: string;
  propertyE: string;
  propertyF: string;
  propertyG: string;
  propertyH: string;
  amount: number;
}
