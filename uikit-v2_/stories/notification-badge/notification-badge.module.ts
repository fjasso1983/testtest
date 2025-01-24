import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';

import { Uk2IconRegistryService } from '@axos/uikit-v2-lib';

import { NotificationBadgeComponent } from './notification-badge.component';
import { StoriesCommonModule } from 'stories/stories-common.module';

@NgModule({
  declarations: [NotificationBadgeComponent],
  imports: [StoriesCommonModule, HttpClientModule, MatIconModule, BrowserModule, MatBadgeModule],
  exports: [NotificationBadgeComponent],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (iconRegistryService: Uk2IconRegistryService) => {
        iconRegistryService.registerAllCategories();
      },
      deps: [Uk2IconRegistryService],
    },
  ],
})
export class NotificationBadgeModule {}
