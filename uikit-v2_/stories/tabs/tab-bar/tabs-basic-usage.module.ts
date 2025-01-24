import { NgModule } from '@angular/core';
import { TabsBasicUsageComponent } from './tabs-basic-usage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { StoriesCommonModule } from 'stories/stories-common.module';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [TabsBasicUsageComponent],
  imports: [StoriesCommonModule, BrowserModule, BrowserAnimationsModule, MatTabsModule],
  exports: [TabsBasicUsageComponent],
})
export class TabsBasicUsageModule {}
