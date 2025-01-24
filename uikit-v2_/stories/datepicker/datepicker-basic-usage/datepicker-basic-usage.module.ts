import { Uk2DirectivesModule, Uk2ServicesModule } from '@axos/uikit-v2-lib';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MatNativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core';
import { NgModule } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { DatepickerBasicUsageComponent } from './datepicker-basic-usage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

const DATE_FORMAT = {
  parse: {
    dateInput: 'MM/DD/YYYY',
  },
  display: {
    dateInput: 'MM/DD/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@NgModule({
  declarations: [DatepickerBasicUsageComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatDatepickerModule,
    Uk2DirectivesModule,
    Uk2ServicesModule,
    HttpClientModule,
    MatNativeDateModule,
  ],
  exports: [DatepickerBasicUsageComponent, MatDatepickerModule],
  providers: [
    // eslint-disable-next-line object-property-newline
    { provide: MAT_DATE_LOCALE, useValue: 'en-US' },
    // eslint-disable-next-line object-property-newline
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    // eslint-disable-next-line object-property-newline
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMAT },
  ],
})
export class DatepickerBasicUsageModule {}
