import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoteCardComponent } from './note-card.component';
import { NgModule } from '@angular/core';
import { StoriesCommonModule } from 'stories/stories-common.module';

@NgModule({
  declarations: [NoteCardComponent],
  imports: [StoriesCommonModule, BrowserModule, BrowserAnimationsModule, MatCheckboxModule, MatCardModule],
  exports: [NoteCardComponent],
})
export class NoteCardModule {}
