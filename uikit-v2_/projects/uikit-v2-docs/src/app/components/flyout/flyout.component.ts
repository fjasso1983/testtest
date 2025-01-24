import { Component, ViewChild } from '@angular/core';
import {
  Uk2ButtonSizeEnum,
  Uk2FlyoutMenuDirective,
  Uk2ListItem,
  Uk2TextButtonVariant,
  Uk2FlyoutMenuXPosition,
} from '@axos/uikit-v2-lib';

@Component({
  selector: 'app-flyout',
  templateUrl: './flyout.component.html',
  styleUrls: ['./flyout.component.scss'],
})
export class FlyoutComponent {
  @ViewChild('flyoutMenu') flyoutMenu!: Uk2FlyoutMenuDirective;
  buttonSize = Uk2ButtonSizeEnum;
  uk2TextButtonVariant: Uk2TextButtonVariant = Uk2TextButtonVariant.button;
  startPosition: Uk2FlyoutMenuXPosition = Uk2FlyoutMenuXPosition.start;
  selectedItem = 'no selection';
  isLoadingItems = false;
  disableItems = false;

  flyoutList: Uk2ListItem[] = [
    {
      showControl: false,
      bodyText: 'Print',
      svgIconName: 'uk2-printer',
      value: 'Print button',
    },
    {
      showControl: false,
      bodyText: 'Download',
      svgIconName: 'uk2-download',
      value: 'Download button',
    },
    {
      showControl: false,
      bodyText: 'Share',
      svgIconName: 'uk2-share',
      value: 'Share button',
    },
    {
      showControl: false,
      bodyText: 'Upload',
      svgIconName: 'uk2-upload',
      value: 'Upload button',
    },
    {
      showControl: false,
      bodyText: 'Delete',
      svgIconName: 'uk2-trash',
      value: 'Delete button',
    },
  ];

  selectedItems = [false, false, false, false, false];

  constructor() {}

  clickOption(option: Uk2ListItem) {
    this.flyoutMenu.close();
    this.selectedItem = option.value;
  }

  clickCheckboxOption(index: number) {
    this.selectedItems[index] = !this.selectedItems[index];
  }
}
