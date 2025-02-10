import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { SingleOptionButtonComponent } from './single-option-button.component';
import { StoriesCommonModule } from 'stories/stories-common.module';
import {
  Uk2DirectivesModule,
  Uk2FlyoutMenuDirective,
  Uk2MenuButtonModule,
  Uk2ServicesModule,
} from '@axos/uikit-v2-lib';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { PortalModule } from '@angular/cdk/portal';

@NgModule({
  declarations: [SingleOptionButtonComponent],
  imports: [
    StoriesCommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    PortalModule,
    Uk2MenuButtonModule,
    Uk2ServicesModule,
    Uk2DirectivesModule,
    HttpClientModule,
    MatIconModule,
  ],
  providers: [Uk2FlyoutMenuDirective],
  exports: [SingleOptionButtonComponent],
})
export class SingleOptionButtonModule {}
