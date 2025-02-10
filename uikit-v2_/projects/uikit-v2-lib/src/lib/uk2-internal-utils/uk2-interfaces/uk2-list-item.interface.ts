export interface IUk2ListItem {
  showControl?: boolean;
  svgIconName?: string;
  imageUrl?: string;
  headerLabelName?: string;
  headerLabelIdentifier?: string;
  moneyAmount?: number;
  bodyText?: string;
  uk2IsPending?: boolean;
  uk2IsDisabled?: boolean;
  uk2ShowDividerLine?: boolean;
  uk2IsLoading?: boolean;
  uk2CurrencyOptions?: IUk2ListItemCurrencyOptions;
  uk2IsSelected?: boolean;
  value: any;
}

export interface IUk2ListItemCurrencyOptions {
  currencyCode?: string;
  display?: string;
  digitsInfo?: string;
  locale?: string;
}
