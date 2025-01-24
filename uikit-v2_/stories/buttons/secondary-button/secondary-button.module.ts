import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { SecondaryButtonComponent } from './secondary-button.component';
import { StoriesCommonModule } from 'stories/stories-common.module';

@NgModule({
  declarations: [SecondaryButtonComponent],
  imports: [StoriesCommonModule, BrowserModule, BrowserAnimationsModule, MatButtonModule],
  exports: [SecondaryButtonComponent],
})
export class SecondaryButtonModule {}
