import { Component, ViewEncapsulation } from '@angular/core';

import { Uk2BadgeTypeEnum } from '@axos/uikit-v2-lib';

@Component({
  selector: 'storybook-notification-badge',
  templateUrl: './notification-badge.component.html',
  styleUrls: ['./notification-badge.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NotificationBadgeComponent {
  text = '';
  isLoading = false;
  isHidden = false;
  type: Uk2BadgeTypeEnum = Uk2BadgeTypeEnum.notification;
  isSelected = false;
  hasHover = false;
}
