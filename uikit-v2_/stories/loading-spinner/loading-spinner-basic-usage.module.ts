import { NgModule } from '@angular/core';
import { Uk2LoadingSpinnerModule } from '@axos/uikit-v2-lib';
import { LoadingSpinnerBasicUsageComponent } from './loading-spinner-basic-usage.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [LoadingSpinnerBasicUsageComponent],
  imports: [Uk2LoadingSpinnerModule, MatProgressSpinnerModule],
  exports: [LoadingSpinnerBasicUsageComponent],
})
export class LoadingSpinnerBasicUsageModule {}
