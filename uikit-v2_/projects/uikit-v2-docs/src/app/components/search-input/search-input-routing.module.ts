import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchInputComponent } from './search-input.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: SearchInputComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class SearchInputRoutingModule {}
