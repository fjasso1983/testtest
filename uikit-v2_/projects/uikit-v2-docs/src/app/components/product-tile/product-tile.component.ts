import { Component, ViewEncapsulation } from '@angular/core';

import {
  Uk2AlertBannerBehaviorEnum,
  Uk2AlertBannerTypeEnum,
  Uk2ButtonSizeEnum,
  Uk2MenuButtonItem,
  Uk2MenuButtonSelectionTypeEnum,
  Uk2ProductTileComponentPositionEnum,
  Uk2StretchTabsSizeEnum,
  Uk2Tier1UtilityEnum,
  Uk2TileHeaderTextBehaviorEnum,
} from '@axos/uikit-v2-lib';

@Component({
  templateUrl: './product-tile.component.html',
  styleUrls: ['./product-tile.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductTileDocsComponent {
  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;
  loading = false;
  smallSize = Uk2ButtonSizeEnum.small;
  componentPosition: Uk2ProductTileComponentPositionEnum = Uk2ProductTileComponentPositionEnum.bottom;
  componentPositionTop = Uk2ProductTileComponentPositionEnum.top;
  showTooltip = false;
  bannerLoading = false;
  isFixedHeight = true;
  alertType: Uk2AlertBannerTypeEnum = Uk2AlertBannerTypeEnum.inform;
  alertPersistent: Uk2AlertBannerBehaviorEnum = Uk2AlertBannerBehaviorEnum.persistent;
  topComponentPosition = Uk2ProductTileComponentPositionEnum.top;
  tabSizeSmall = Uk2StretchTabsSizeEnum.small;
  tileSquareBorder = false;
  isHeightFixed = false;
  multipleType: Uk2MenuButtonSelectionTypeEnum = Uk2MenuButtonSelectionTypeEnum.multiple;
  testItems1: Uk2MenuButtonItem[] = [
    {
      text: 'RIA',
      isSelected: false,
      value: '1',
    },
    {
      text: 'Invest',
      isSelected: false,
      value: '2',
    },
  ];
  filterIcon: any = Uk2Tier1UtilityEnum.filterFunnel;
  showAnchor = false;
  textBehavior = Uk2TileHeaderTextBehaviorEnum.truncate;
  fixedHeightCodeSnippet = `<mat-card
  style="height: 300px"
  uk2ProductTile
>
...
</mat-card>`;
  clickEventsCodeSnippet = `<uk2-tile-header-link
  uk2ProductTileHeader
  uk2TooltipIconName="uk2-info-circle"
  [uk2ShowTooltip]="true"
  // Output will trigger when chevron icon is clicked
  (uk2ChevronClick)="chevronClicked()"
>
  <div class="uk2-tile-header">
    <a
      uk2Anchor
      // Client can add click event in projected title element
      (click)="linkClicked()"
    >
      Lorem ipsum long title (1234)
    </a>
    <br />
  </div>
</uk2-tile-header-link>`;
  titleSectionCodeSnippet = `<uk2-tile-header-link uk2ProductTileHeader>
  // Create a div with the exact class name to project the title
  <div class="uk2-tile-header">[TILE HEADER ELEMENTS]</div>
</uk2-tile-header-link>`;
  subLineSectionCodeSnippet = `<uk2-tile-header-link uk2ProductTileHeader>
// Create a div with the exact class name to project the sub-line
<div class="uk2-tile-header-sub-line">[SUB-LINE ELEMENTS]</div>
</uk2-tile-header-link>`;
  tooltipSectionCodeSnippet = `<uk2-tile-header-link uk2ProductTileHeader>
  // Create a div with the exact class name to project the tooltip content
  <div class="uk2-tile-tooltip-content">[TOOLTIP ELEMENTS]</div>
</uk2-tile-header-link>`;

  handleLoadingClick() {
    this.loading = !this.loading;
  }

  toggleComponentPosition() {
    this.componentPosition =
      this.componentPosition === Uk2ProductTileComponentPositionEnum.bottom
        ? Uk2ProductTileComponentPositionEnum.top
        : Uk2ProductTileComponentPositionEnum.bottom;
  }

  toggleTextBehavior() {
    this.textBehavior =
      this.textBehavior === Uk2TileHeaderTextBehaviorEnum.truncate
        ? Uk2TileHeaderTextBehaviorEnum.wrap
        : Uk2TileHeaderTextBehaviorEnum.truncate;
  }

  chevronClicked() {
    alert('Chevron clicked');
  }

  linkClicked() {
    alert('Link clicked');
  }
}
