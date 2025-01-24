import { Uk2Tier1AlertsEnum } from '@axos/uikit-v2-lib/src/lib/uk2-services';

export const uk2ToastConfigConstants = {
  successIconName: Uk2Tier1AlertsEnum.checkCircle,
  alertIconName: Uk2Tier1AlertsEnum.exclamationTriangle,
  successClass: 'uk2-toast-success',
  alertClass: 'uk2-toast-alert',
  loadingClass: 'uk2-toast-skeleton',
};

export const uk2ToastErrorConstants = {
  errorConfigType: "Please provide a valid type for toast: 'success', 'alert' or 'loading'",
  errorConfigMessage: 'Please provide a message for toast',
};

export const UK2_TOAST_DEFAULT_DURATION = 10 * 1000;
