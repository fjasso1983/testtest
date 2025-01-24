import { Component } from '@angular/core';
import { Uk2AlertBannerTypeEnum, Uk2AlertBannerBehaviorEnum, Uk2Tier1UtilityEnum } from '@axos/uikit-v2-lib';

@Component({
  selector: 'app-alert-banner',
  templateUrl: './alert-banner.component.html',
  styleUrls: ['./alert-banner.component.scss'],
})
export class AlertBannerComponent {
  urlClickCounter = 0;
  showBanner = true;
  alertType: Uk2AlertBannerTypeEnum = Uk2AlertBannerTypeEnum.alert;
  informType: Uk2AlertBannerTypeEnum = Uk2AlertBannerTypeEnum.inform;
  persistentBehavior: Uk2AlertBannerBehaviorEnum = Uk2AlertBannerBehaviorEnum.persistent;
  dismissibleBehavior: Uk2AlertBannerBehaviorEnum = Uk2AlertBannerBehaviorEnum.dismissible;
  bodyText =
    'Maintenance is currently underway for advisor-managed accounts. Access to these accounts, including viewing and retrieving details, is temporarily unavailable. We apologize for any inconvenience and appreciate your patience.';
  largebodyText =
    'Maintenance is currently underway for advisor-managed accounts. Access to these accounts, including viewing and retrieving details, is temporarily unavailable. We apologize for any inconvenience and appreciate your patience.Maintenance is currently underway for advisor-managed accounts. Access to these accounts, including viewing and retrieving details, is temporarily unavailable. We apologize for any inconvenience and appreciate your patience.';
  headerText = 'Maintenance in Progress';
  cogIcon = Uk2Tier1UtilityEnum.cog;
  hyperLink = 'Learn More';
  isLoading = true;

  showBannerStatus(showBanner: boolean) {
    this.showBanner = showBanner;
  }

  urlClick() {
    this.urlClickCounter++;
  }

  changeSkeleton() {
    this.isLoading = !this.isLoading;
  }
}
