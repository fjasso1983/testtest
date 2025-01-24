import { Component } from '@angular/core';
import { Uk2MessagingCardTypeEnum } from '@axos/uikit-v2-lib';

@Component({
  selector: 'app-messaging-card',
  templateUrl: './messaging-card.component.html',
  styleUrls: ['./messaging-card.component.scss'],
})
export class MessagingCardComponent {
  alertType: Uk2MessagingCardTypeEnum = Uk2MessagingCardTypeEnum.alert;
  informType: Uk2MessagingCardTypeEnum = Uk2MessagingCardTypeEnum.inform;
  isExpandable = false;
  isLoading = true;
  showIcon = true;
  headerText =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

  setExpandable() {
    this.isExpandable = !this.isExpandable;
  }

  setLoading() {
    this.isLoading = !this.isLoading;
  }

  setShowIcon() {
    this.showIcon = !this.showIcon;
  }
}
