import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { Uk2ListItemModule } from '@axos/uikit-v2-lib';

import { StoriesCommonModule } from 'stories/stories-common.module';
import { CheckListItemComponent } from './checkbox-list-item.component';

@NgModule({
  declarations: [CheckListItemComponent],
  imports: [
    StoriesCommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
    MatCheckboxModule,
    Uk2ListItemModule,
  ],
  exports: [
    StoriesCommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
    MatCheckboxModule,
    Uk2ListItemModule,
    CheckListItemComponent,
  ],
})
export class ListItemCheckboxModule {}
