import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { Uk2BottomSheetModule, Uk2ListItemModule } from '@axos/uikit-v2-lib';

import { ListItemChevronComponent } from './list-item-chevron.component';
import { StoriesCommonModule } from 'stories/stories-common.module';

@NgModule({
  declarations: [ListItemChevronComponent],
  imports: [
    StoriesCommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    Uk2BottomSheetModule,
    Uk2ListItemModule,
  ],
  exports: [
    StoriesCommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    Uk2BottomSheetModule,
    ListItemChevronComponent,
  ],
})
export class Module {}
