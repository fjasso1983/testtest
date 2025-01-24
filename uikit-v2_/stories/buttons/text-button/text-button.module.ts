import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { TextButtonComponent } from './text-button.component';
import { StoriesCommonModule } from 'stories/stories-common.module';

@NgModule({
  declarations: [TextButtonComponent],
  imports: [StoriesCommonModule, BrowserModule, BrowserAnimationsModule, MatButtonModule],
  exports: [TextButtonComponent],
})
export class TextButtonModule {}
