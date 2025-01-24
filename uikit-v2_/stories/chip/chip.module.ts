import { NgModule } from '@angular/core';
import { ChipComponent } from './chip.component';
import { StoriesCommonModule } from 'stories/stories-common.module';
import { Uk2ChipModule } from '@axos/uikit-v2-lib';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ChipComponent],
  imports: [StoriesCommonModule, HttpClientModule, Uk2ChipModule, CommonModule],
  exports: [ChipComponent],
})
export class ChipBasicUsageModule {}
