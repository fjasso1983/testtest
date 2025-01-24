import { NgModule } from '@angular/core';
import { TooltipBasicUsageComponent } from './tooltip-basic-usage.component';

import { Uk2TooltipModule, Uk2ServicesModule } from '@axos/uikit-v2-lib';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { StoriesCommonModule } from 'stories/stories-common.module';

@NgModule({
  declarations: [TooltipBasicUsageComponent],
  imports: [
    StoriesCommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    Uk2TooltipModule,
    Uk2ServicesModule,
    HttpClientModule,
  ],
  exports: [TooltipBasicUsageComponent],
})
export class TooltipBasicUsageModule {}
