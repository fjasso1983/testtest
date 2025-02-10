import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Uk2FlyoutMenuDirective, Uk2IconRegistryService } from '@axos/uikit-v2-lib';

@Component({
  selector: 'app-table-header-flyout',
  templateUrl: './table-header-flyout.component.html',
})
export class TableHeaderFlyoutComponent {
  @Output() onFlyoutItemClicked = new EventEmitter<any>();

  displayedColumns: string[] = ['record', 'propertyA', 'propertyB', 'propertyC', 'propertyD'];
  activeColumnIndex = 0;
  flyoutIsOpen = false;

  flyoutListItems: MenuItem[] = [
    {
      bodyText: 'Sort ascending',
      svgIconName: 'uk2-arrow-up',
      value: 'sort_ascending',
    },
    {
      bodyText: 'Sort descending',
      svgIconName: 'uk2-arrow-down',
      value: 'sort_descending',
    },
    {
      bodyText: 'Filter',
      svgIconName: 'uk2-filter-funnel',
      hasBorder: true,
      value: 'filter',
    },
    {
      bodyText: 'Hide column',
      svgIconName: 'uk2-eye-hide',
      value: 'hide_column',
    },
  ];

  tableData: RecordTable[] = [
    {
      record: 'Lorem ipsum',
      propertyA: 'Lorem ipsum',
      propertyB: 'Lorem Ipsum',
      propertyC: 'Lorem Ipsum',
      propertyD: 1235,
    },
    {
      record: 'Lorem ipsum',
      propertyA: 'Lorem ipsum',
      propertyB: 'Lorem Ipsum',
      propertyC: 'Lorem Ipsum',
      propertyD: 1235,
    },
    {
      record: 'Lorem ipsum',
      propertyA: 'Lorem ipsum',
      propertyB: 'Lorem Ipsum',
      propertyC: 'Lorem Ipsum',
      propertyD: 1235,
    },
    {
      record: 'Lorem ipsum',
      propertyA: 'Lorem ipsum',
      propertyB: 'Lorem Ipsum',
      propertyC: 'Lorem Ipsum',
      propertyD: 1235,
    },
  ];

  private currentFlyoutInstance: Uk2FlyoutMenuDirective | undefined;

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
    this.currentFlyoutInstance?.close();
    this.onFlyoutItemClicked.emit({ column: this.displayedColumns[this.activeColumnIndex], option: item });
  }

  constructor(private iconRegistryService: Uk2IconRegistryService) {
    this.iconRegistryService.registerAllCategories();
  }
}

interface MenuItem {
  bodyText: string;
  svgIconName?: string;
  hasBorder?: boolean;
  value: any;
}

interface RecordTable {
  record: string;
  propertyA: string;
  propertyB: string;
  propertyC: string;
  propertyD: number;
}
