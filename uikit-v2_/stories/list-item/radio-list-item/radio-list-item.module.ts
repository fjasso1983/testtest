import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';

import { Uk2ListItemModule } from '@axos/uikit-v2-lib';

import { StoriesCommonModule } from 'stories/stories-common.module';
import { RadioListItemComponent } from './radio-list-item.component';

@NgModule({
  declarations: [RadioListItemComponent],
  imports: [
    StoriesCommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
    MatRadioModule,
    Uk2ListItemModule,
  ],
  exports: [
    StoriesCommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
    MatRadioModule,
    Uk2ListItemModule,
    RadioListItemComponent,
  ],
})
export class ListItemRadioModule {}
