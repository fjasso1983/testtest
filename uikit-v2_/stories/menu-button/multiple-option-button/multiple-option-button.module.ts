import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MultipleOptionButtonComponent } from './multiple-option-button.component';
import { StoriesCommonModule } from 'stories/stories-common.module';
import { Uk2FlyoutMenuDirective, Uk2MenuButtonModule, Uk2ServicesModule } from '@axos/uikit-v2-lib';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [MultipleOptionButtonComponent],
  imports: [
    StoriesCommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    Uk2MenuButtonModule,
    Uk2ServicesModule,
    HttpClientModule,
    MatIconModule,
  ],
  providers: [Uk2FlyoutMenuDirective],
  exports: [MultipleOptionButtonComponent],
})
export class MultipleOptionButtonModule {}
