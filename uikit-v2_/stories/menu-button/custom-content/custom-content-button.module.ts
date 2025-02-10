import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { CustomContentButtonComponent } from './custom-content-button.component';
import { StoriesCommonModule } from 'stories/stories-common.module';
import { Uk2FlyoutMenuModule, Uk2MenuButtonModule, Uk2ServicesModule } from '@axos/uikit-v2-lib';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [CustomContentButtonComponent],
  imports: [
    StoriesCommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    Uk2MenuButtonModule,
    Uk2ServicesModule,
    HttpClientModule,
    MatIconModule,
    Uk2FlyoutMenuModule,
    MatTabsModule,
  ],
  exports: [CustomContentButtonComponent],
})
export class CustomContentButtonModule {}
