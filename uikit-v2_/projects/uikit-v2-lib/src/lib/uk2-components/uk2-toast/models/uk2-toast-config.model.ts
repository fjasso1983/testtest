import { uk2ToastConfigConstants } from '../constants/constants';
import { Uk2ToastTypeEnum } from '../enums';
export class Uk2ToastConfigModel {
  class = '';
  iconName = '';
  message = '';

  constructor(data?: any) {
    data = data || {};
    switch (data.type) {
      case Uk2ToastTypeEnum.success:
        this.class = uk2ToastConfigConstants.successClass;
        this.iconName = uk2ToastConfigConstants.successIconName;
        this.message = data.message;
        break;
      case Uk2ToastTypeEnum.alert:
        this.class = uk2ToastConfigConstants.alertClass;
        this.iconName = uk2ToastConfigConstants.alertIconName;
        this.message = data.message;
        break;
      default:
        this.class = uk2ToastConfigConstants.loadingClass;
        break;
    }
  }
}
