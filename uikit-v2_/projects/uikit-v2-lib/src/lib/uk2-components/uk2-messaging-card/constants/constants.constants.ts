import { Uk2Tier1AlertsEnum } from '@axos/uikit-v2-lib/src/lib/uk2-services';

export const uk2MessagingCardDefaultConfig = {
  svgIconName: undefined,
  class: 'uk2-messaging-card-default',
};

export const uk2MessagingCardInformConfig = {
  svgIconName: Uk2Tier1AlertsEnum.infoCircle,
  class: 'uk2-messaging-card-inform',
};

export const uk2MessagingCardAlertConfig = {
  svgIconName: Uk2Tier1AlertsEnum.exclamationTriangle,
  class: 'uk2-messaging-card-alert',
};

export const uk2MessagingCardErrorConstants = {
  errorIconAlert:
    "If uk2MessagingCardType == Uk2MessagingCardTypeEnum.alert, it's not possible to use custom Icon for uk2MessagingCardSvgIconName",
  errorEmptyTitle: 'uk2MessagingCardHeaderText cannot be null or empty',
};
