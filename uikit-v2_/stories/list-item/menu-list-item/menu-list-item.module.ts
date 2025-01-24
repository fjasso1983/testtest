import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Uk2ChipModule, Uk2DirectivesModule, Uk2MenuListItemModule } from '@axos/uikit-v2-lib';
import { MenuListItemComponent } from './menu-list-item.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [MenuListItemComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    HttpClientModule,
    MatCheckboxModule,
    MatRadioModule,
    Uk2ChipModule,
    Uk2DirectivesModule,
    Uk2MenuListItemModule,
  ],
  exports: [MenuListItemComponent],
})
export class MenuListItemModule {}
