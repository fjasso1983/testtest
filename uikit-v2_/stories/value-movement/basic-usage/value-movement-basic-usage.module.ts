import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ValueMovementBasicUsageComponent } from './value-movement-basic-usage.component';
import { Uk2ValueMovementModule, Uk2ServicesModule } from '@axos/uikit-v2-lib';
import { StoriesCommonModule } from 'stories/stories-common.module';

@NgModule({
  declarations: [ValueMovementBasicUsageComponent],
  imports: [StoriesCommonModule, Uk2ValueMovementModule, Uk2ServicesModule, MatIconModule, HttpClientModule],
  exports: [ValueMovementBasicUsageComponent],
})
export class ValueMovementBasicUsageModule {}
