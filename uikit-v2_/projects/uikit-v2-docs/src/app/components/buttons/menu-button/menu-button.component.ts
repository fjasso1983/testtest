import { Component } from '@angular/core';
import {
  Uk2FlyoutMenuDirective,
  Uk2MenuButtonItem,
  Uk2MenuButtonSelectionTypeEnum,
  Uk2Tier1UtilityEnum,
} from '@axos/uikit-v2-lib';

@Component({
  selector: 'app-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.scss'],
  providers: [Uk2FlyoutMenuDirective],
})
export class MenuButtonComponent {
  buttonState = 'Disable Button';
  filterIcon: any = Uk2Tier1UtilityEnum.filterFunnel;
  sortIcon: any = Uk2Tier1UtilityEnum.filterSlider;
  singleType: Uk2MenuButtonSelectionTypeEnum = Uk2MenuButtonSelectionTypeEnum.single;
  multipleType: Uk2MenuButtonSelectionTypeEnum = Uk2MenuButtonSelectionTypeEnum.multiple;
  receivedItems: Uk2MenuButtonItem[] = [];
  testItems1: Uk2MenuButtonItem[] = [
    {
      text: 'Lorem Ipsum 1',
      isSelected: false,
      value: '1',
    },
    {
      text: 'Lorem Ipsum 2',
      isSelected: false,
      value: '2',
    },
    {
      text: 'Lorem Ipsum 3',
      isSelected: false,
      value: '3',
    },
    {
      text: 'Lorem Ipsum 4',
      isSelected: false,
      value: '4',
    },
    {
      text: 'Lorem Ipsum 5',
      isSelected: false,
      value: '5',
    },
    {
      text: 'Lorem Ipsum 6',
      isSelected: false,
      value: '6',
    },
  ];

  testItems2 = [
    {
      text: 'Consectetur adipiscing elit 1',
      isSelected: false,
      value: '1',
    },
    {
      text: 'Consectetur adipiscing elit 2',
      isSelected: false,
      value: '2',
    },
    {
      text: 'Consectetur adipiscing elit 3',
      isSelected: false,
      value: '3',
    },
  ];

  //Deep clone for the multiple selection example
  testItems1Small = JSON.parse(JSON.stringify(this.testItems1));
  testItems1Medium = JSON.parse(JSON.stringify(this.testItems1));
  testItems1Large = JSON.parse(JSON.stringify(this.testItems1));
  testItemsTruncate = JSON.parse(JSON.stringify(this.testItems2));

  isLoading = false;
  isDisabled = false;

  constructor() {}

  toggleLoading() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }

  toggleButtonState() {
    if (this.isDisabled) this.buttonState = 'Disable Button';
    else this.buttonState = 'Enable Button';

    this.isDisabled = !this.isDisabled;
  }

  receiveItems(itemSelection: Uk2MenuButtonItem[]) {
    this.receivedItems = itemSelection;
  }
}
