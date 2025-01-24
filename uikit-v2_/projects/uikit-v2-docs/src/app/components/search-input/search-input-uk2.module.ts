import { NgModule } from '@angular/core';

import { Uk2ListItemModule, Uk2DirectivesModule } from '@axos/uikit-v2-lib';

@NgModule({
  imports: [Uk2ListItemModule, Uk2DirectivesModule],
  exports: [Uk2ListItemModule, Uk2DirectivesModule],
})
export class SearchInputUk2Module {}
