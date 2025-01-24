import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { TagInputComponent } from './tag-input.component';
import { MatChipsModule } from '@angular/material/chips';
import { Uk2ServicesModule } from '@axos/uikit-v2-lib';
import { HttpClientModule } from '@angular/common/http';
import { Module } from 'stories/dropdown/basic-usage/module';

@NgModule({
  declarations: [TagInputComponent],
  imports: [BrowserModule, Module, MatChipsModule, Uk2ServicesModule, HttpClientModule],
  exports: [TagInputComponent],
})
export class TagInputModule {}
