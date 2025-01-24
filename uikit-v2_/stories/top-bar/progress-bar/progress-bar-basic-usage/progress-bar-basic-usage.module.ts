import { NgModule } from '@angular/core';
import { ProgressBarBasicUsageComponent } from './progress-bar-basic-usage.component';

import { Uk2BrandTopBarModule, Uk2ProgressBarModule, Uk2ServicesModule } from '@axos/uikit-v2-lib';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { StoriesCommonModule } from 'stories/stories-common.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [ProgressBarBasicUsageComponent],
  imports: [
    StoriesCommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    Uk2BrandTopBarModule,
    Uk2ServicesModule,
    HttpClientModule,
    MatProgressBarModule,
    Uk2ProgressBarModule,
  ],
  exports: [ProgressBarBasicUsageComponent],
})
export class ProgressBarBasicUsageModule {}
