import { Component } from '@angular/core';
import { Uk2FlyoutMenuDirective } from '@axos/uikit-v2-lib';

@Component({
  selector: 'app-header-flyout',
  templateUrl: './header-flyout.component.html',
  styleUrls: ['./header-flyout.component.scss'],
})
export class HeaderFlyoutComponent {
  displayedColumns: string[] = ['record', 'propertyA', 'propertyB', 'propertyC', 'propertyD'];
  selectedColumnValue: string[] = ['', '', '', '', ''];
  activeColumnIndex = 0;
  flyoutIsOpen = false;
  flyoutList: MenuItem[] = [
    {
      bodyText: 'Sort ascending',
      svgIconName: 'uk2-chevron-up',
      value: 'Sort ascending',
    },
    {
      bodyText: 'Sort descending',
      svgIconName: 'uk2-chevron-down',
      value: 'Sort descending',
    },
    {
      bodyText: 'Filter',
      svgIconName: 'uk2-filter-funnel',
      hasBorder: true,
      value: 'Filter',
    },
    {
      bodyText: 'Hide column',
      svgIconName: 'uk2-eye-hide',
      value: 'Hide column',
    },
  ];

  tableData: RecordTable[] = [
    {
      record: 1,
      propertyA: 'Lorem ipsum',
      propertyB: 'Lorem Ipsum',
      propertyC: 'Lorem Ipsum',
      propertyD: 'Lorem Ipsum',
    },
    {
      record: 2,
      propertyA: 'Lorem ipsum',
      propertyB: 'Lorem Ipsum',
      propertyC: 'Lorem Ipsum',
      propertyD: 'Lorem Ipsum',
    },
    {
      record: 3,
      propertyA: 'Lorem ipsum',
      propertyB: 'Lorem Ipsum',
      propertyC: 'Lorem Ipsum',
      propertyD: 'Lorem Ipsum',
    },
    {
      record: 4,
      propertyA: 'Lorem ipsum',
      propertyB: 'Lorem Ipsum',
      propertyC: 'Lorem Ipsum',
      propertyD: 'Lorem Ipsum',
    },
  ];

  private currentFlyoutInstance: Uk2FlyoutMenuDirective | undefined;

  constructor() {}

  getActiveFlyout(flyout: Uk2FlyoutMenuDirective, index: number) {
    this.activeColumnIndex = index;
    this.currentFlyoutInstance = flyout;
    this.flyoutIsOpen = true;
  }

  onFlyoutClose() {
    this.currentFlyoutInstance = undefined;
    this.flyoutIsOpen = false;
  }

  onFlyoutItemClick(item: string) {
    this.selectedColumnValue[this.activeColumnIndex] = item;
    this.currentFlyoutInstance?.close();
  }
}

interface MenuItem {
  bodyText: string;
  svgIconName?: string;
  hasBorder?: boolean;
  value: any;
}

interface RecordTable {
  record: number;
  propertyA: string;
  propertyB: string;
  propertyC: string;
  propertyD: string;
}
