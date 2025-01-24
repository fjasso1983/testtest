import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DisplayPatternComponent } from './display-pattern.component';
import { Uk2ServicesModule } from '@axos/uikit-v2-lib';
import { StoriesCommonModule } from 'stories/stories-common.module';

@NgModule({
  declarations: [DisplayPatternComponent],
  imports: [
    StoriesCommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    HttpClientModule,
    Uk2ServicesModule,
  ],
  exports: [DisplayPatternComponent],
})
export class DisplayPatternModule {}
