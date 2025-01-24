import {
  uk2MessagingCardDefaultConfig,
  uk2MessagingCardAlertConfig,
  uk2MessagingCardInformConfig,
} from '../constants/constants.constants';
import { Uk2MessagingCardTypeEnum } from '../enums';
export class Uk2MessagingCardConfigModel {
  class = '';
  svgIconName: string | undefined = '';

  constructor(type?: any) {
    switch (type) {
      case Uk2MessagingCardTypeEnum.default:
        this.class = uk2MessagingCardDefaultConfig.class;
        this.svgIconName = uk2MessagingCardDefaultConfig.svgIconName;
        break;
      case Uk2MessagingCardTypeEnum.inform:
        this.class = uk2MessagingCardInformConfig.class;
        this.svgIconName = uk2MessagingCardInformConfig.svgIconName;
        break;
      case Uk2MessagingCardTypeEnum.alert:
        this.class = uk2MessagingCardAlertConfig.class;
        this.svgIconName = uk2MessagingCardAlertConfig.svgIconName;
        break;
      default:
        this.class = uk2MessagingCardDefaultConfig.class;
        this.svgIconName = uk2MessagingCardDefaultConfig.svgIconName;
        break;
    }
  }
}
