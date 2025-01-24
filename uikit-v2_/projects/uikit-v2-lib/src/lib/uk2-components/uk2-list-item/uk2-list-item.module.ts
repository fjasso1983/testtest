import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';

import { Uk2ListItemComponent } from './uk2-list-item.component';
import { Uk2DropdownListItemChevronComponent } from './dropdown-list-items';
import { Uk2ListItemClickableDirective, Uk2ListItemSelectedDirective } from './directives';

@NgModule({
  imports: [CommonModule, MatIconModule],
  declarations: [
    Uk2ListItemComponent,
    Uk2DropdownListItemChevronComponent,
    Uk2ListItemClickableDirective,
    Uk2ListItemSelectedDirective,
  ],
  exports: [
    Uk2ListItemComponent,
    Uk2DropdownListItemChevronComponent,
    Uk2ListItemClickableDirective,
    Uk2ListItemSelectedDirective,
  ],
})
export class Uk2ListItemModule {}
