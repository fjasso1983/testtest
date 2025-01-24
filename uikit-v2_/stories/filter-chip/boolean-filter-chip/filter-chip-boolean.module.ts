import { APP_INITIALIZER, NgModule } from '@angular/core';

import { Uk2FilterChipBooleanModule, Uk2IconRegistryService } from '@axos/uikit-v2-lib';

import { FilterChipBooleanComponent } from './filter-chip-boolean.component';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [FilterChipBooleanComponent],
  imports: [HttpClientModule, Uk2FilterChipBooleanModule, MatIconModule],
  exports: [FilterChipBooleanComponent],
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
export class FilterChipBooleanModule {}
