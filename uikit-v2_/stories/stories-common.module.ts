import { NgModule } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { Uk2DirectivesModule } from '@axos/uikit-v2-lib';

@NgModule({
  declarations: [],
  imports: [Uk2DirectivesModule],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'outline',
        subscriptSizing: 'dynamic',
      },
    },
  ],
  exports: [Uk2DirectivesModule],
})
export class StoriesCommonModule {}
