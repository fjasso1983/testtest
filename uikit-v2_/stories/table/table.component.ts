import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

import {
  Uk2TableBorderStyleEnum,
  Uk2TableDensityEnum,
  Uk2TableTextBehaviorEnum,
  Uk2Tier1NavigationEnum,
} from '@axos/uikit-v2-lib';

@Component({
  selector: 'storybook-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnChanges {
  @Input() isLoading!: boolean;
  @Input() tableDensity!: Uk2TableDensityEnum;
  @Input() tableBorderType!: Uk2TableBorderStyleEnum;
  @Input() tableTextBehavior!: Uk2TableTextBehaviorEnum;
  @Input() noData!: boolean;
  @Input() isGroupedBy: boolean =  false;

  displayedColumns: string[] = [
    'checkbox',
    'record',
    'propertyA',
    'propertyB',
    'propertyC',
    'amount',
    'longColumn',
    'options',
  ];
  dataSource = new MatTableDataSource<RecordTable>(TableData);
  ellipsisIcon = Uk2Tier1NavigationEnum.ellipsesVertical;
  selection = new SelectionModel<RecordTable>(true, []);

  ngOnChanges(changes: SimpleChanges): void {
    const { noData, isGroupedBy } = changes;

    if (noData || isGroupedBy) {
      this.setDataSource();
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  groupBy(data: RecordTable[], key: string): GroupedResult {
    let new_data = data.reduce((rv: Record<string, RecordTable[]>, x: RecordTable) => {
      if (!rv[x[key]]) {
        rv[x[key]] = [];
      }
      rv[x[key]].push(x);
      return rv;
    }, {});

    let grouped_data_source: GroupedResult = [];
    Object.keys(new_data).forEach(groupKey => {
      grouped_data_source.push({ group: groupKey, isGroupBy: true });

      let values: RecordTable[] = new_data[groupKey];
      values.forEach((element: RecordTable) => {
        grouped_data_source.push(element);
      });
    });

    return grouped_data_source;
  }
  isGroup(index:any, item:any):boolean{
    return item.isGroupBy;
  }

  checkboxLabel(row?: RecordTable): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.record + 1}`;
  }

  private setDataSource() {
    if (this.noData) {
      this.dataSource.data = [];
      this.selection.clear();
    } else if (this.isGroupedBy){
      let newDataSource:any[] = this.groupBy(TableData, 'propertyA');
      this.dataSource.data = newDataSource;
      this.selection.clear();
    } else {
      this.dataSource.data = TableData;
      this.selection.clear();
    }
  }
}

interface RecordTable {
  record: number;
  propertyA: string;
  propertyB: string;
  propertyC: string;
  longColumn: string;
  amount: number;
  [key: string]: any;
}
interface GroupedItem {
  group: string;
  isGroupBy: boolean;
}

type GroupedResult = (RecordTable | GroupedItem)[];

const TableData: RecordTable[] = [
  {
    record: 1,
    propertyA: 'Lorem ',
    propertyB: 'Lorem Ipsum',
    propertyC: 'Lorem Ipsum',
    longColumn: 'Lorem Ipsum with more text to show the text behavior truncation ellipsis and word wrapping',
    amount: 1234.56,
  },
  {
    record: 2,
    propertyA: 'Lorem ',
    propertyB: 'Lorem Ipsum',
    propertyC: 'Lorem Ipsum',
    longColumn: 'Lorem Ipsum with more text to show the text behavior truncation ellipsis and word wrapping',
    amount: 1234.56,
  },
  {
    record: 3,
    propertyA: 'Lorem ',
    propertyB: 'Lorem Ipsum',
    propertyC: 'Lorem Ipsum',
    longColumn: 'Lorem Ipsum with more text to show the text behavior truncation ellipsis and word wrapping',
    amount: 1234.56,
  },
  {
    record: 4,
    propertyA: 'Lorem ',
    propertyB: 'Lorem Ipsum',
    propertyC: 'Lorem Ipsum',
    longColumn: 'Lorem Ipsum with more text to show the text behavior truncation ellipsis and word wrapping',
    amount: 1234.56,
  },
  {
    record: 5,
    propertyA: 'Ipsum',
    propertyB: 'Lorem Ipsum',
    propertyC: 'Lorem Ipsum',
    longColumn: 'Lorem Ipsum with more text to show the text behavior truncation ellipsis and word wrapping',
    amount: 1234.56,
  },
  {
    record: 6,
    propertyA: 'Ipsum',
    propertyB: 'Lorem Ipsum',
    propertyC: 'Lorem Ipsum',
    longColumn: 'Lorem Ipsum with more text to show the text behavior truncation ellipsis and word wrapping',
    amount: 1234.56,
  },
  {
    record: 7,
    propertyA: 'Ipsum',
    propertyB: 'Lorem Ipsum',
    propertyC: 'Lorem Ipsum',
    longColumn: 'Lorem Ipsum with more text to show the text behavior truncation ellipsis and word wrapping',
    amount: 1234.56,
  },
  {
    record: 8,
    propertyA: 'Ipsum',
    propertyB: 'Lorem Ipsum',
    propertyC: 'Lorem Ipsum',
    longColumn: 'Lorem Ipsum with more text to show the text behavior truncation ellipsis and word wrapping',
    amount: 1234.56,
  },
  {
    record: 9,
    propertyA: 'Lorem Ipsum',
    propertyB: 'Lorem Ipsum',
    propertyC: 'Lorem Ipsum',
    longColumn: 'Lorem Ipsum with more text to show the text behavior truncation ellipsis and word wrapping',
    amount: 1234.56,
  },
  {
    record: 10,
    propertyA: 'Lorem Ipsum',
    propertyB: 'Lorem Ipsum',
    propertyC: 'Lorem Ipsum',
    longColumn: 'Lorem Ipsum with more text to show the text behavior truncation ellipsis and word wrapping',
    amount: 1234.56,
  },
];
