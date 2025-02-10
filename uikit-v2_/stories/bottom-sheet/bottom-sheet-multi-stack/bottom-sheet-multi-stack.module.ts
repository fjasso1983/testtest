import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

import { MatButtonModule } from '@angular/material/button';

import { Uk2BottomSheetModule, Uk2DirectivesModule, Uk2ListItemModule } from '@axos/uikit-v2-lib';

import { StoriesCommonModule } from 'stories/stories-common.module';
import { BottomSheetMultiStackComponent } from './bottom-sheet-multi-stack.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [BottomSheetMultiStackComponent],
  imports: [
    StoriesCommonModule,
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    Uk2BottomSheetModule,
    Uk2DirectivesModule,
    Uk2ListItemModule,
  ],
  exports: [
    StoriesCommonModule,
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    Uk2BottomSheetModule,
    Uk2DirectivesModule,
    Uk2ListItemModule,
  ],
})
export class BottomSheetModule {}
