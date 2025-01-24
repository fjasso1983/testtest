import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ScrollbarComponent } from './scrollbar.component';
import { StoriesCommonModule } from 'stories/stories-common.module';

@NgModule({
  declarations: [ScrollbarComponent],
  imports: [StoriesCommonModule, BrowserModule, BrowserAnimationsModule],
  exports: [ScrollbarComponent],
})
export class ScrollbarModule {}
