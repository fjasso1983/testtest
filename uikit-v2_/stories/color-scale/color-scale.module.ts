import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BrowserModule } from '@angular/platform-browser';
import { ColorScaleComponent } from './color-scale.component';
import { StoriesCommonModule } from 'stories/stories-common.module';

@NgModule({
  declarations: [ColorScaleComponent],
  imports: [StoriesCommonModule, BrowserModule, BrowserAnimationsModule],
  exports: [ColorScaleComponent],
})
export class ColorScaleModule {}
