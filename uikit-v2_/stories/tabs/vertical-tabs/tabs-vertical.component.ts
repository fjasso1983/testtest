import { Component, ViewEncapsulation } from '@angular/core';

import { Uk2VerticalTabSizeEnum } from '@axos/uikit-v2-lib';

@Component({
  selector: 'tabs-vertical',
  templateUrl: './tabs-vertical.component.html',
  styleUrls: ['./tabs-vertical.component.scss', './custom-styles.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TabsVerticalComponent {
  sizeTabs: Uk2VerticalTabSizeEnum = Uk2VerticalTabSizeEnum.medium;
  isLoading = false;
  isDisabled = false;
  isBadgeHidden = false;
}
