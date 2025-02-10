import { NgModule } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Uk2CurrencyDirective } from './uk2-currency.directive';

@NgModule({
  declarations: [Uk2CurrencyDirective],
  exports: [Uk2CurrencyDirective],
  providers: [CurrencyPipe],
})
export class Uk2CurrencyModule {}
