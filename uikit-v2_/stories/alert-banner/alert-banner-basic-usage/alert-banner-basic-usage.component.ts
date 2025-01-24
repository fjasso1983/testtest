import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {
  Uk2AlertBannerBehaviorEnum,
  Uk2AlertBannerTypeEnum,
  Uk2IconRegistryService,
  Uk2Tier1AlertsEnum,
} from '@axos/uikit-v2-lib';

@Component({
  selector: 'app-alert-banner',
  templateUrl: './alert-banner-basic-usage.component.html',
})
export class AlertBannerBasicUsageComponent implements OnInit, OnChanges {
  @Input() alertType: Uk2AlertBannerTypeEnum = Uk2AlertBannerTypeEnum.inform;
  @Input() alertBehavior: Uk2AlertBannerBehaviorEnum = Uk2AlertBannerBehaviorEnum.dismissible;
  @Input() isLoading = false;
  @Input() bodyText =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
  @Input() headerText = 'Lorem Ipsum Dolor';
  @Input() svgIconName = '';
  @Input() hyperLink = 'Learn More';
  @Input() showBanner = true;
  @Input() animateAlertBanner = true;

  constructor(private iconRegistryService: Uk2IconRegistryService) {}

  ngOnInit() {
    this.iconRegistryService.registerAllCategories();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes.alertType &&
      (this.svgIconName == Uk2Tier1AlertsEnum.exclamationTriangle || this.svgIconName == Uk2Tier1AlertsEnum.infoCircle)
    ) {
      this.typeChanged();
    }
  }

  urlClick() {
    alert('Action catched by client app' + '\n' + 'Click on Hyperlink, action TODO will be handled by client app.');
  }

  // Empty method to catch event in storybook control to update value:
  typeChanged() {}
  dismissButtonClick() {}
}
