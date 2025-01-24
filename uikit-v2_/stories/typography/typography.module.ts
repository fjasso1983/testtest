import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { Uk2ServicesModule } from '@axos/uikit-v2-lib';
import { TypographyComponent } from './typography.component';
import { StoriesCommonModule } from 'stories/stories-common.module';

@NgModule({
  declarations: [TypographyComponent],
  imports: [
    StoriesCommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    Uk2ServicesModule,
    HttpClientModule,
  ],
  exports: [TypographyComponent],
})
export class TypographyModule {}
