import { NgModule } from '@angular/core';
import { MessagingCardBasicUsageComponent } from './messaging-card-basic-usage.component';
import { Uk2MessagingCardModule, Uk2ServicesModule } from '@axos/uikit-v2-lib';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { StoriesCommonModule } from 'stories/stories-common.module';

@NgModule({
  declarations: [MessagingCardBasicUsageComponent],
  imports: [
    StoriesCommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    Uk2MessagingCardModule,
    Uk2ServicesModule,
    HttpClientModule,
  ],
  exports: [MessagingCardBasicUsageComponent],
})
export class MessagingCardBasicUsageModule {}
