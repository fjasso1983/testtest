import { Component, Input, ViewEncapsulation } from '@angular/core';

import {
  Uk2ElementPositionEnum,
  Uk2FlyoutMenuXPosition,
  Uk2FlyoutMenuYPosition,
  Uk2IconRegistryService,
  Uk2Tier1NavigationEnum,
} from '@axos/uikit-v2-lib';

@Component({
  selector: 'app-flyout-menu',
  templateUrl: './flyout-menu.component.html',
  styleUrls: ['./flyout-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FlyoutMenuComponent {
  @Input() flyoutOriginXPosition: Uk2FlyoutMenuXPosition = Uk2FlyoutMenuXPosition.start;
  @Input() flyoutOverlayXPosition: Uk2FlyoutMenuXPosition = Uk2FlyoutMenuXPosition.start;
  @Input() flyoutOriginYPosition: Uk2FlyoutMenuYPosition = Uk2FlyoutMenuYPosition.bottom;
  @Input() flyoutOverlayYPosition: Uk2FlyoutMenuYPosition = Uk2FlyoutMenuYPosition.top;
  @Input() flyoutOverlayYOffset: number = 4;
  @Input() flyoutOverlayHasBackdrop = true;
  @Input() closeOnClickBackdrop: boolean = true;
  @Input() flyoutOverlayBackdropClass = 'none';
  @Input() showVerticalTabs = false;
  @Input() showHeader = true;
  @Input() showFooter = true;
  elementPosition = Uk2ElementPositionEnum;
  chevronIcon = Uk2Tier1NavigationEnum.chevronDown;
  ellipsisIcon = Uk2Tier1NavigationEnum.ellipsesHorizontal;
  timePeriodOptions = ['This Month', 'Last Month', 'Last 3 Months', 'Last 12 Months', '2023', '2022', '2021'];
  documentTypeOptions = ['PDF', 'DOCX', 'JPEG', 'PNG'];
  selectedTimePeriod = '';
  selectedDocumentType = '';

  constructor(private iconRegistryService: Uk2IconRegistryService) {
    this.iconRegistryService.registerAllCategories();
  }
}
