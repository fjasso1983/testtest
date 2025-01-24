import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { Uk2BottomSheetModule } from '@axos/uikit-v2-lib';

import { DropdownComponent } from './dropdown-basic-usage.component';
import { StoriesCommonModule } from 'stories/stories-common.module';

@NgModule({
  declarations: [DropdownComponent],
  imports: [
    StoriesCommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    Uk2BottomSheetModule,
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
    DropdownComponent,
  ],
})
export class Module {}
