import { NgModule } from '@angular/core';
import { ToastBasicUsageComponent } from './toast-basic-usage.component';
import { Uk2ToastModule, Uk2ServicesModule } from '@axos/uikit-v2-lib';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { StoriesCommonModule } from 'stories/stories-common.module';

@NgModule({
  declarations: [ToastBasicUsageComponent],
  imports: [
    StoriesCommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    Uk2ToastModule,
    Uk2ServicesModule,
    HttpClientModule,
    MatSnackBarModule,
    MatButtonModule,
  ],
  exports: [ToastBasicUsageComponent],
})
export class ToastBasicUsageModule {}
