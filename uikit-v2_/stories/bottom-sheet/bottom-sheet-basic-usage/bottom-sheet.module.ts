import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';

import { Uk2BottomSheetModule } from '@axos/uikit-v2-lib';

import { BottomSheetComponent } from './bottom-sheet.component';
import { StoriesCommonModule } from 'stories/stories-common.module';

@NgModule({
  declarations: [BottomSheetComponent],
  imports: [
    StoriesCommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    Uk2BottomSheetModule,
    MatRadioModule,
  ],
  exports: [BottomSheetComponent],
})
export class BottomSheetModule {}
