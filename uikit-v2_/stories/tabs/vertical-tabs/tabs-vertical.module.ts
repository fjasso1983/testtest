import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';

import { Uk2DirectivesModule, Uk2IconRegistryService } from '@axos/uikit-v2-lib';

import { TabsVerticalComponent } from './tabs-vertical.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [TabsVerticalComponent],
  exports: [TabsVerticalComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
    MatBadgeModule,
    MatTabsModule,
    Uk2DirectivesModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (service: Uk2IconRegistryService) => {
        service.registerAllCategories();
      },
      deps: [Uk2IconRegistryService],
    },
  ],
})
export class TabsVerticalModule {}
