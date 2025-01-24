import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SearchInputRoutingModule } from './search-input-routing.module';
import { SearchInputMaterialModule } from './search-input-material.module';
import { SearchInputUk2Module } from './search-input-uk2.module';

import { SearchInputComponent } from './search-input.component';

@NgModule({
  declarations: [SearchInputComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SearchInputUk2Module,
    SearchInputRoutingModule,
    SearchInputMaterialModule,
  ],
})
export class SearchInputModule {}
