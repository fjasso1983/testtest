import { NgModule } from '@angular/core';
import { StoriesCommonModule } from 'stories/stories-common.module';
import { CurrencyBasicUsageComponent } from './currency-basic-usage.component';
import { Uk2CurrencyModule } from '@axos/uikit-v2-lib';

@NgModule({
  declarations: [CurrencyBasicUsageComponent],
  imports: [StoriesCommonModule, Uk2CurrencyModule],
  exports: [CurrencyBasicUsageComponent],
})
export class CurrencyBasicUsageModule {}
