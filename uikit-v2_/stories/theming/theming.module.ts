import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BrowserModule } from '@angular/platform-browser';
import { ThemingComponent } from './theming.component';
import { StoriesCommonModule } from 'stories/stories-common.module';

@NgModule({
  declarations: [ThemingComponent],
  imports: [StoriesCommonModule, BrowserModule, BrowserAnimationsModule],
  exports: [ThemingComponent],
})
export class ThemingModule {}
