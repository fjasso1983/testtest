import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { LabeledIconButtonComponent } from './labeled-icon-button.component';
import { MatButtonModule } from '@angular/material/button';
import { StoriesCommonModule } from 'stories/stories-common.module';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { Uk2DirectivesModule, Uk2ServicesModule } from '@axos/uikit-v2-lib';

@NgModule({
  declarations: [LabeledIconButtonComponent],
  imports: [
    StoriesCommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    Uk2DirectivesModule,
    Uk2ServicesModule,
  ],
  exports: [LabeledIconButtonComponent],
})
export class LabeledIconButtonModule {}
