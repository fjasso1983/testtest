import { NgModule } from '@angular/core';
import { DeterminateProgressBarBasicUsageComponent } from './determinate-progress-bar.component';
import { BrowserModule } from '@angular/platform-browser';
import { StoriesCommonModule } from 'stories/stories-common.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [DeterminateProgressBarBasicUsageComponent],
  imports: [StoriesCommonModule, BrowserModule, MatProgressBarModule],
  exports: [DeterminateProgressBarBasicUsageComponent],
})
export class DeterminateProgressBarBasicUsageModule {}
