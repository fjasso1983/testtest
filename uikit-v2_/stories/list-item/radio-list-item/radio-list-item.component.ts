import { Component, Input, OnChanges } from '@angular/core';

import { Uk2IconRegistryService, Uk2ListItem, Uk2ListItemCurrencyOptions } from '@axos/uikit-v2-lib';

@Component({
  selector: 'lib-radio-list-item',
  templateUrl: './radio-list-item.component.html',
  styleUrls: ['./radio-list-item.component.scss'],
})
export class RadioListItemComponent implements OnChanges {
  @Input() isLoading!: boolean;
  @Input() disabled = false;
  @Input() pending = false;
  @Input() imageUrl = '';
  @Input() moneyAmount = 0;
  @Input() svgIconName = 'uk2-face-id';
  @Input() bodyText = '';
  @Input() headerLabelName = 'Face ID';
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
    value: 'option1',
  };

  secondListItem: Uk2ListItem = {
    imageUrl: '',
    moneyAmount: 0,
    svgIconName: 'uk2-finger-print',
    bodyText: '',
    headerLabelName: 'Finger print',
    headerLabelIdentifier: '',
    value: 'option2',
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
