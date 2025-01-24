import { Component, Input, OnChanges } from '@angular/core';

import { Uk2IconRegistryService, Uk2ListItem, Uk2ListItemCurrencyOptions } from '@axos/uikit-v2-lib';

@Component({
  selector: 'lib-checkbox-list-item',
  templateUrl: './checkbox-list-item.component.html',
  styleUrls: ['./checkbox-list-item.component.scss'],
})
export class CheckListItemComponent implements OnChanges {
  @Input() isLoading!: boolean;
  @Input() disabled = false;
  @Input() pending = false;
  @Input() imageUrl = '';
  @Input() moneyAmount = 0;
  @Input() svgIconName = '';
  @Input() bodyText = '';
  @Input() headerLabelName = '';
  @Input() headerLabelIdentifier = '';
  @Input() currencyOptions: Uk2ListItemCurrencyOptions = {
    currencyCode: 'USD',
    display: 'symbol',
    digitsInfo: '1.2-2',
  };

  listItem: Uk2ListItem = {
    imageUrl: this.imageUrl,
    moneyAmount: this.moneyAmount,
    svgIconName: this.svgIconName,
    bodyText: this.bodyText,
    headerLabelName: this.headerLabelName,
    headerLabelIdentifier: this.headerLabelIdentifier,
    value: 'CalendarNotifications',
  };

  secondListItem: Uk2ListItem = {
    svgIconName: 'uk2-envelope',
    headerLabelName: 'Receive emails notifications',
    value: 'EmailNotifications',
  };

  constructor(private iconRegistryService: Uk2IconRegistryService) {
    this.iconRegistryService.registerAllCategories();
  }

  ngOnChanges(): void {
    this.updateCustomOption();
  }

  private updateCustomOption() {
    this.listItem = {
      imageUrl: this.imageUrl,
      moneyAmount: this.moneyAmount,
      svgIconName: this.svgIconName,
      bodyText: this.bodyText,
      headerLabelName: this.headerLabelName === '' ? 'Empty' : this.headerLabelName,
      headerLabelIdentifier: this.headerLabelIdentifier,
      value: 'Lorem Ipsum',
    };
  }
}
