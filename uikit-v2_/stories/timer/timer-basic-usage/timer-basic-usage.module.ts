import { NgModule } from '@angular/core';
import { TimerBasicUsageComponent } from './timer-basic-usage.component';
import { Uk2TimerModule } from '@axos/uikit-v2-lib';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { StoriesCommonModule } from 'stories/stories-common.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [TimerBasicUsageComponent],
  imports: [StoriesCommonModule, BrowserModule, BrowserAnimationsModule, Uk2TimerModule, MatButtonModule],
  exports: [TimerBasicUsageComponent],
})
export class TimerBasicUsageModule {}
