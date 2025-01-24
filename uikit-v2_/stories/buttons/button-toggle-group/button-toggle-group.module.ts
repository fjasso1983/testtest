import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Uk2DirectivesModule } from '@axos/uikit-v2-lib';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonToggleGroupComponent } from './button-toggle-group.component';
import { CommonModule } from '@angular/common';
import { StoriesCommonModule } from 'stories/stories-common.module';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@NgModule({
  declarations: [ButtonToggleGroupComponent],
  imports: [
    Uk2DirectivesModule,
    StoriesCommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    MatButtonToggleModule,
  ],
  exports: [ButtonToggleGroupComponent],
})
export class ButtonToggleGroupModule {}
