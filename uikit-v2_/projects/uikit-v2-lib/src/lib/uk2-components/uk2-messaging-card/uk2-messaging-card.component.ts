import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Uk2MessagingCardTypeEnum } from './enums';
import { Uk2MessagingCardConfigModel } from './models';
import { IUk2IsLoading } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';
import { uk2MessagingCardErrorConstants } from './constants';
import { Uk2Tier1NavigationEnum } from '@axos/uikit-v2-lib/src/lib/uk2-services';

@Component({
  selector: 'uk2-messaging-card',
  templateUrl: './uk2-messaging-card.component.html',
})
export class Uk2MessagingCardComponent implements OnInit, OnChanges, IUk2IsLoading {
  @Input() uk2MessagingCardSvgIconName = '';
  @Input() uk2MessagingCardShowIcon = true;
  @Input() uk2MessagingCardHeaderText = '';
  @Input() uk2MessagingCardType: Uk2MessagingCardTypeEnum = Uk2MessagingCardTypeEnum.default;
  @Input() uk2IsLoading = false;
  @Input() uk2MessagingCardIsExpandable = true;
  @Input() uk2MessagingCardIsExpanded = false;
  hideToggle = true;
  configMessagingCard: Uk2MessagingCardConfigModel = new Uk2MessagingCardConfigModel();
  chevronDown: Uk2Tier1NavigationEnum = Uk2Tier1NavigationEnum.chevronDown;

  constructor() {}

  ngOnInit() {
    this.validateInput();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.applyTheme();
    if (changes.uk2MessagingCardIsExpandable) {
      this.uk2MessagingCardIsExpandable = changes.uk2MessagingCardIsExpandable.currentValue;
      if (!this.uk2MessagingCardIsExpandable) {
        this.uk2MessagingCardIsExpanded = false;
      }
    }

    if (changes.uk2MessagingCardIsExpanded) {
      if (!this.uk2MessagingCardIsExpandable) {
        this.uk2MessagingCardIsExpanded = false;
      }
    }
  }

  applyTheme() {
    this.configMessagingCard = new Uk2MessagingCardConfigModel(this.uk2MessagingCardType);
    if (this.uk2MessagingCardSvgIconName != '' && this.uk2MessagingCardType != Uk2MessagingCardTypeEnum.alert) {
      this.configMessagingCard.svgIconName = this.uk2MessagingCardSvgIconName;
    }

    if (this.uk2MessagingCardType == Uk2MessagingCardTypeEnum.alert) {
      this.uk2MessagingCardShowIcon = true;
    }
  }

  toggleExpand() {
    this.uk2MessagingCardIsExpanded = !this.uk2MessagingCardIsExpanded;
  }

  validateInput() {
    if (this.uk2MessagingCardHeaderText.length < 1) {
      throw new Error(uk2MessagingCardErrorConstants.errorEmptyTitle);
    }

    if (this.uk2MessagingCardSvgIconName != '' && this.uk2MessagingCardType == Uk2MessagingCardTypeEnum.alert) {
      throw new Error(uk2MessagingCardErrorConstants.errorIconAlert);
    }
  }
}
