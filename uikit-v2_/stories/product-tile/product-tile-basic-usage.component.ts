import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';

import {
  Uk2AlertBannerBehaviorEnum,
  Uk2AlertBannerTypeEnum,
  Uk2ButtonSizeEnum,
  Uk2ListItem,
  Uk2MenuButtonItem,
  Uk2MenuButtonSelectionTypeEnum,
  Uk2ProductTileComponentPositionEnum,
  Uk2StretchTabsSizeEnum,
  Uk2Tier1UtilityEnum,
  Uk2TileHeaderTextBehaviorEnum,
} from '@axos/uikit-v2-lib';

@Component({
  selector: 'app-product-tile-basic-usage',
  templateUrl: './product-tile-basic-usage.component.html',
  styleUrls: ['./product-tile-basic-usage.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductTileBasicUsageComponent implements OnChanges {
  @Input() isLoading = false;
  @Input() tileHeaderComponentPosition: Uk2ProductTileComponentPositionEnum =
    Uk2ProductTileComponentPositionEnum.bottom;
  @Input() headerText = 'Lorem Ipsum';
  @Input() isHeaderAnchor = false;
  @Input() tileBorderSquare = false;
  @Input() fixedHeight = false;
  @Input() showTooltip = false;
  @Input() textBehavior: Uk2TileHeaderTextBehaviorEnum = Uk2TileHeaderTextBehaviorEnum.truncate;
  @Input() subLineText = 'Amet consecutar etum - 1234';
  @Input() tooltipText = 'Quae minus sapiente possimus officia iure!';
  @Input() showHeaderTabBar = true;
  @Input() showTileActions = true;
  @Input() tileActionsType: 'menu-buttons' | 'filter-button' | 'primary-button' = 'primary-button';
  @Input() isTileFullWidth = false;
  @Input() showFooter = true;
  @Input() showHeaderDivider = true;
  @Input() showFooterDivider = true;
  @Output() clickEvent = new EventEmitter<void>();

  multipleType: Uk2MenuButtonSelectionTypeEnum = Uk2MenuButtonSelectionTypeEnum.multiple;
  singleType: Uk2MenuButtonSelectionTypeEnum = Uk2MenuButtonSelectionTypeEnum.single;
  buttonSmallSize: Uk2ButtonSizeEnum = Uk2ButtonSizeEnum.small;
  tabSmallSize: Uk2StretchTabsSizeEnum = Uk2StretchTabsSizeEnum.small;
  menuItems: Uk2MenuButtonItem[] = [
    {
      text: 'Option 1',
      isSelected: false,
      value: '1',
    },
    {
      text: 'Option 2',
      isSelected: false,
      value: '2',
    },
    {
      text: 'Option 3',
      isSelected: false,
      value: '3',
    },
  ];
  menuSingleItems: Uk2MenuButtonItem[] = [
    {
      text: 'Action 1',
      isSelected: false,
      value: '1',
    },
    {
      text: 'Action 2',
      isSelected: false,
      value: '2',
    },
  ];
  filterIcon: any = Uk2Tier1UtilityEnum.filterFunnel;
  listItems: Uk2ListItem[] = [
    {
      imageUrl: '',
      moneyAmount: 100,
      svgIconName: 'uk2-payment-due',
      bodyText: 'Lorem ipsum dolor ',
      headerLabelName: 'Option 1',
      headerLabelIdentifier: '3543',
      value: 'option1',
    },
    {
      imageUrl: '',
      moneyAmount: 50,
      svgIconName: 'uk2-user',
      bodyText: 'Lorem ipsum dolor',
      headerLabelName: 'Option 2',
      headerLabelIdentifier: '7752',
      value: 'option2',
    },
    {
      imageUrl: '',
      moneyAmount: 89,
      svgIconName: 'uk2-home',
      bodyText: 'Lorem ipsum dolor',
      headerLabelName: 'Option 3',
      headerLabelIdentifier: '5100',
      value: 'option3',
    },
  ];
  alertType: Uk2AlertBannerTypeEnum = Uk2AlertBannerTypeEnum.inform;
  alertPersistent: Uk2AlertBannerBehaviorEnum = Uk2AlertBannerBehaviorEnum.persistent;

  ngOnChanges(changes: SimpleChanges): void {
    const { fixedHeight } = changes;

    if (fixedHeight) {
      this.triggerScroll();
    }
  }

  triggerScroll(): void {
    const element = document.querySelector('mat-card-content');
    if (element) {
      setTimeout(() => {
        const scrollEvent = new Event('scroll');
        element.dispatchEvent(scrollEvent);
      });
    }
  }
}
