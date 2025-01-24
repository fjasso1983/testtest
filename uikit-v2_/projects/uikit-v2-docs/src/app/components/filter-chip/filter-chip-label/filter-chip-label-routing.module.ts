import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FilterChipLabelComponent } from './filter-chip-label.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: FilterChipLabelComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class FilterChipLabelRoutingModule {}
