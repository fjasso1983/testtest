import { Component, Input } from '@angular/core';

import { Uk2StretchTabsSizeEnum } from '@axos/uikit-v2-lib';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs-basic-usage.component.html',
  styleUrls: ['./tabs-basic-usage.component.scss'],
})
export class TabsBasicUsageComponent {
  @Input() isLoading = false;
  @Input() sizeTabs = Uk2StretchTabsSizeEnum.medium;

  constructor() {}
}
