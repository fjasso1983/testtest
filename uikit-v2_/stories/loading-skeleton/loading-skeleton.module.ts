import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoriesCommonModule } from 'stories/stories-common.module';
import { LoadingSkeletonComponent } from './loading-skeleton.component';

@NgModule({
  declarations: [LoadingSkeletonComponent],
  imports: [
    StoriesCommonModule,
    BrowserModule,
  ],
  exports: [LoadingSkeletonComponent],
})
export class LoadingSkeletonModule {}
