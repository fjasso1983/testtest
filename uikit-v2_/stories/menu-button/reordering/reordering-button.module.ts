import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { ReorderingButtonComponent } from './reordering-button.component';
import { StoriesCommonModule } from 'stories/stories-common.module';
import {
  Uk2FlyoutMenuDirective,
  Uk2MenuButtonModule,
  Uk2MenuListItemModule,
  Uk2ServicesModule,
} from '@axos/uikit-v2-lib';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ReorderingButtonComponent],
  imports: [
    StoriesCommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    Uk2MenuButtonModule,
    Uk2ServicesModule,
    HttpClientModule,
    MatIconModule,
    Uk2MenuListItemModule,
  ],
  exports: [ReorderingButtonComponent],
  providers: [Uk2FlyoutMenuDirective],
})
export class MultipleOptionButtonModule {}
