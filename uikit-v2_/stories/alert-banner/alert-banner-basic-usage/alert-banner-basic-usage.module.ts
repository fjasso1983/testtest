import { NgModule } from '@angular/core';
import { AlertBannerBasicUsageComponent } from './alert-banner-basic-usage.component';
import { Uk2AlertBannerModule, Uk2ServicesModule } from '@axos/uikit-v2-lib';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { StoriesCommonModule } from 'stories/stories-common.module';

@NgModule({
  declarations: [AlertBannerBasicUsageComponent],
  imports: [
    StoriesCommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    Uk2AlertBannerModule,
    Uk2ServicesModule,
    HttpClientModule,
    MatButtonModule,
  ],
  exports: [AlertBannerBasicUsageComponent],
})
export class AlertBannerBasicUsageModule {}
