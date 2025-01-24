import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Uk2ModalModule, Uk2ServicesModule } from '@axos/uikit-v2-lib';
import { BrowserModule } from '@angular/platform-browser';
import { ModalComponent } from './modal-basic-usage.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { StoriesCommonModule } from 'stories/stories-common.module';

@NgModule({
  declarations: [ModalComponent],
  imports: [
    StoriesCommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    Uk2ModalModule,
    Uk2ServicesModule,
    HttpClientModule,
  ],
  exports: [ModalComponent],
})
export class ModalModule {}
