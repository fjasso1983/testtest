import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TextTileBasicUsageComponent } from './text-tile-basic-usage.component';
import { Uk2ServicesModule, Uk2TextTileModule } from '@axos/uikit-v2-lib';
import { StoriesCommonModule } from 'stories/stories-common.module';

@NgModule({
  declarations: [TextTileBasicUsageComponent],
  imports: [StoriesCommonModule, Uk2TextTileModule, Uk2ServicesModule, MatIconModule, HttpClientModule],
  exports: [TextTileBasicUsageComponent],
})
export class TextTileBasicUsageModule {}
