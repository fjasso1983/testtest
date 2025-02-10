import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
@Component({
  selector: 'app-currency',
  templateUrl: './currency-basic-usage.component.html',
  styleUrls: ['./currency-basic-usage.component.scss', '../../../projects/uikit-v2-lib/src/styles/uk2.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrencyBasicUsageComponent {
  @Input() amount = 123456.999;
  @Input() currencySymbol? = 'USD';
  @Input() showCurrencySymbol? = true;
  @Input() truncate? = true;
  @Input() digitsInfo? = '1.2-2';

  constructor() {}
}
