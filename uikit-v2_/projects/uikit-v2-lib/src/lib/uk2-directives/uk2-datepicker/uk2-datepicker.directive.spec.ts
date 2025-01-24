import { Component, ElementRef, NO_ERRORS_SCHEMA, Renderer2 } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatDatepickerInputHarness } from '@angular/material/datepicker/testing';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';

import moment from 'moment';

import { Uk2DatePickerDirective } from './uk2-datepicker.directive';

const ADAPTER_DATE_FORMATS = {
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

@Component({
  template: `
    <div>
      <mat-label>Enter date</mat-label>
      <input id="inputWithoutMatInput" uk2DatePicker />
    </div>
    <form [formGroup]="form">
      <h3>Skeleton Datepicker</h3>
      <mat-form-field appearance="outline" floatLabel="always">
        <mat-label>Choose date</mat-label>
        <input
          #inputDate
          name="inputDate"
          matInput
          [formControl]="date1"
          [matDatepicker]="picker"
          uk2DatePicker
          placeholder="MM/DD/YYYY"
          uk2Input
        />
        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-datepicker uk2DatePicker #picker></mat-datepicker>
        <mat-hint>
          <mat-icon svgIcon="uk2-exclamation-triangle"></mat-icon>
          This is an example of date.
        </mat-hint>
      </mat-form-field>
      <h3>Basic Datepicker</h3>
      <mat-form-field appearance="outline" floatLabel="always">
        <mat-label>Choose date</mat-label>
        <input
          id="inputDate2"
          matInput
          [matDatepicker]="picker2"
          [formControl]="date2"
          uk2DatePicker
          placeholder="MM/DD/YYYY"
          uk2Input
          type="text"
        />
        <mat-datepicker-toggle matSuffix [for]="picker2"></mat-datepicker-toggle>
        <mat-datepicker uk2DatePicker #picker2></mat-datepicker>
        <mat-hint>
          <mat-icon svgIcon="uk2-exclamation-triangle"></mat-icon>
          This is an example of date.
        </mat-hint>
      </mat-form-field>
      <mat-form-field color="primary" appearance="outline" floatLabel="always">
        <mat-label>Choose date</mat-label>
        <input
          id="inputDate2"
          matInput
          [matDatepicker]="picker3"
          [formControl]="date3"
          uk2DatePicker
          placeholder="MM/DD/YYYY"
          uk2Input
          type="text"
        />
        <mat-datepicker-toggle matSuffix [for]="picker3"></mat-datepicker-toggle>
        <mat-datepicker class="color-attr" uk2DatePicker #picker3 color="primary"></mat-datepicker>
        <mat-hint>
          <mat-icon svgIcon="uk2-exclamation-triangle"></mat-icon>
          This is an example of date.
        </mat-hint>
      </mat-form-field>
    </form>
  `,
})
class DatepickerTestComponent {
  constructor(private fb: FormBuilder) {}
  isLoadingSkeleton = true;
  form: FormGroup = this.fb.group({
    date1: new FormControl('', [Validators.required]),
    date2: new FormControl('', [Validators.required]),
    date3: new FormControl('', [Validators.required]),
  });

  get date1(): any {
    return this.form.get('date1');
  }
  get date2(): any {
    return this.form.get('date2');
  }
  get date3(): any {
    return this.form.get('date3');
  }
}
describe('Uk2DatepickerDirective Unit Test', () => {
  let fixture: ComponentFixture<DatepickerTestComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatepickerTestComponent, Uk2DatePickerDirective],
      imports: [
        MatNativeDateModule,
        MatDatepickerModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatIconTestingModule,
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'en-US' },
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: ADAPTER_DATE_FORMATS },
        {
          provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS,
          useValue: {
            strict: true,
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerTestComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);

    fixture.detectChanges();
  });

  it("should not be applied on elements that don't have matInput ", () => {
    const input = fixture.debugElement.nativeElement.querySelector('#inputWithoutMatInput');
    expect(input.classList.contains('uk2-datepicker')).toBeFalse();
  });
  it('should be applied on elements that have matDatepicker directive', () => {
    const date = fixture.debugElement.nativeElement.querySelector('mat-datepicker');
    expect(date.classList.contains('uk2-datepicker')).toBeTrue();
  });

  it('should only work on mat-datepicker without color attribute', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let matDateElement: HTMLElement = containerElement.querySelector('.color-attr') ?? new HTMLElement();
    fixture.detectChanges();
    expect(matDateElement.classList.contains('uk2-datepicker')).toBeFalse();
  });

  it('should add "uk2-form-field-datepicker" to mat-form-field onInit', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let matFormField = containerElement.querySelectorAll('.uk2-form-field-datepicker');

    // act
    fixture.detectChanges();

    // assert
    expect(matFormField.length).toBe(2);
  });

  it('should render adjacent dates if user go to a different moth with keyboard', async () => {
    jasmine.clock().mockDate(new Date('2024-09-11'));
    const datepickerHarness = await loader.getHarness(MatDatepickerInputHarness);
    await datepickerHarness.setValue('2024-09-11');
    await datepickerHarness.openCalendar();

    const calendarHarness = await datepickerHarness.getCalendar();

    const calendarEl = await calendarHarness.host();

    const tbodyEl = (calendarEl as any)['element'].querySelector('tbody');
    (calendarEl as any)['element'].querySelector('.mat-calendar-body-active').focus();

    const overlayRefEl = (calendarEl as any)['element'].closest('.cdk-overlay-connected-position-bounding-box');

    tbodyEl.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 38 }));
    tbodyEl.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 38 }));
    tbodyEl.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 38 }));
    fixture.detectChanges();

    overlayRefEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    fixture.detectChanges();

    await delay(1);
    const previousMonthPlaceholderDates = (calendarEl as any)['element']
      .querySelector('tbody')
      .querySelectorAll('.uk2-mat-calendar-body-cell-disabled');

    expect(previousMonthPlaceholderDates.length).toBe(4);
    expect(previousMonthPlaceholderDates[0].textContent).toBe('28');
    expect(previousMonthPlaceholderDates[1].textContent).toBe('29');
    expect(previousMonthPlaceholderDates[2].textContent).toBe('30');
    expect(previousMonthPlaceholderDates[3].textContent).toBe('31');
  });
});

describe('Uk2DatepickerDirective Class Unit Test', () => {
  let hostElementMock: any;
  let elementRefMock: any;
  let hostMock: any;
  let rendererMock: any;
  let matFormFieldMock: any;

  beforeEach(() => {
    hostElementMock = {
      classList: {
        add: jasmine.createSpy(),
        remove: jasmine.createSpy(),
      },
      style: {
        cssText: 'my-style',
      },
      querySelector: jasmine.createSpy(),
      querySelectorAll: jasmine.createSpy().withArgs('td').and.returnValue([]),
      appendChild: jasmine.createSpy(),
    };

    elementRefMock = jasmine.createSpyObj(ElementRef, ['']);
    elementRefMock.nativeElement = {
      closest: jasmine.createSpy(),
    };
    hostMock = jasmine.createSpyObj(MatDatepicker<any>, ['']);
    hostMock._componentRef = {
      instance: {
        _calendar: {
          activeDate: moment(),
        },
      },
    };
    hostMock._overlayRef = {
      _host: {
        querySelector() {
          return hostElementMock;
        },
        querySelectorAll() {
          return [
            {
              colSpan: 1,
              parentElement: {},
              remove: jasmine.createSpy(),
            },
          ] as unknown as HTMLTableCellElement[];
        },
      },
    };
    rendererMock = jasmine.createSpyObj(Renderer2, ['setStyle', 'listen', 'insertBefore']);
    matFormFieldMock = jasmine.createSpyObj(MatFormField, {
      _control: { errorState: false },
    });
  });

  it('should add "uk2-datepicker-popup no-extra-text" classes calling onOpen method', fakeAsync(() => {
    // arrange
    const directive = new Uk2DatePickerDirective(elementRefMock, rendererMock, hostMock, matFormFieldMock);
    const mockEl = document.createElement('div');
    const popUpEl = document.createElement('div');
    const classListSpy = spyOn(popUpEl.classList, 'add');
    spyOn(mockEl, 'querySelector').and.returnValue(popUpEl);
    spyOn(directive, 'getHost').and.returnValue(mockEl);

    // act
    directive.onOpen();
    tick(2);

    // assert
    const calls = classListSpy.calls.allArgs();
    expect(calls.length).toBe(2);
    expect(calls[0]).toEqual(['uk2-datepicker-popup']);
    expect(calls[1]).toEqual(['no-extra-text']);
  }));

  it('should remove "no-extra-text" class calling onOpen method if mat-form-field has hint or mat-error elements', fakeAsync(() => {
    // arrange
    const directive = new Uk2DatePickerDirective(elementRefMock, rendererMock, hostMock, matFormFieldMock);

    spyOn(directive, 'getHint').and.returnValue({
      textContent: 'example hint',
    } as Element);
    spyOn(directive, 'getMatError').and.returnValue({
      textContent: 'example error',
    } as Element);
    matFormFieldMock._control.errorState = true;
    const mockEl = document.createElement('div');
    const popUpEl = document.createElement('div');
    const classListSpy = spyOn(popUpEl.classList, 'remove');
    spyOn(mockEl, 'querySelector').and.returnValue(popUpEl);
    spyOn(directive, 'getHost').and.returnValue(mockEl);

    // act
    directive.onOpen();
    tick(2);

    // assert
    const calls = classListSpy.calls.allArgs();
    expect(calls.length).toBe(1);
    expect(calls[0]).toEqual(['no-extra-text']);
  }));

  it('should call renderer.setStyle invoking addMaskIcon method', () => {
    // arrange
    const directive = new Uk2DatePickerDirective(elementRefMock, rendererMock, hostMock, matFormFieldMock);

    // act
    directive.addMaskIcon();

    // assert
    expect(rendererMock.setStyle).toHaveBeenCalledTimes(4);
  });

  it('should change current date subtracting one month and call addPreviousPlaceholderDates invoking subtractDateAndProcessCells', () => {
    // arrange
    const directive = new Uk2DatePickerDirective(elementRefMock, rendererMock, hostMock, matFormFieldMock);
    const processExtraCellsSpy = spyOn(directive, 'addPreviousPlaceholderDates');
    let previousDate = directive['currentDate'];

    // act
    directive.subtractDateAndProcessCells();

    // assert
    let newDate = directive['currentDate'];
    expect(processExtraCellsSpy).toHaveBeenCalled();
    expect(newDate.month()).toEqual(previousDate.month() === 0 ? 11 : previousDate.month() - 1);
  });

  it('should change current date adding one month and call addPreviousPlaceholderDates invoking addDateAndProcessCells', () => {
    // arrange
    const directive = new Uk2DatePickerDirective(elementRefMock, rendererMock, hostMock, matFormFieldMock);
    const processExtraCellsSpy = spyOn(directive, 'addPreviousPlaceholderDates');
    let previousDate = directive['currentDate'];

    // act
    directive.addDateAndProcessCells();

    // assert
    let newDate = directive['currentDate'];
    expect(processExtraCellsSpy).toHaveBeenCalled();
    expect(newDate.month()).toEqual(previousDate.month() === 11 ? 0 : previousDate.month() + 1);
  });

  it('should return cell styles if cellElement is founded calling getCellStyles', () => {
    // arrange
    const directive = new Uk2DatePickerDirective(elementRefMock, rendererMock, hostMock, matFormFieldMock);
    spyOn(directive, 'getHost').and.returnValue({
      querySelector: jasmine.createSpy().and.returnValue({
        style: {
          cssText: '',
        },
      }),
    } as any);

    // act
    const result = directive.getCellStyles();

    // assert
    expect(result).toEqual('');
  });

  it('should return empty string if cellElement is not founded calling getCellStyles', () => {
    // arrange
    const directive = new Uk2DatePickerDirective(elementRefMock, rendererMock, hostMock, matFormFieldMock);
    spyOn(directive, 'getHost').and.returnValue({
      querySelector: jasmine.createSpy().and.returnValue(null),
    } as any);

    // act
    const result = directive.getCellStyles();

    // assert
    expect(result).toEqual('');
  });

  it('should append table cell if row.completeRow is true calling addCells method', () => {
    // arrange
    const htmlElMock = {
      append: jasmine.createSpy(),
    } as unknown as any;
    const directive = new Uk2DatePickerDirective(elementRefMock, rendererMock, hostMock, matFormFieldMock);

    // act
    directive.addCells({ completeRow: true, cells: 1, styleText: '', element: htmlElMock, row: htmlElMock });

    // assert
    expect(htmlElMock.append).toHaveBeenCalled();
  });

  it('should return an instance of HTMLTableRowElement calling calculateRowsToBeFilled method', () => {
    // arrange
    const directive = new Uk2DatePickerDirective(elementRefMock, rendererMock, hostMock, matFormFieldMock);
    const mockEl = document.createElement('div');
    spyOn(mockEl, 'querySelectorAll').and.returnValue([
      {
        colSpan: 3,
        parentElement: document.createElement('tr'),
      },
    ] as any);
    spyOn(directive, 'getHost').and.returnValue(mockEl);

    // act
    const result = directive.calculateRowsToBeFilled();

    // assert
    expect(result.length).toBe(1);
    expect(result[0].row).toBeInstanceOf(HTMLTableRowElement);
  });

  it('should create a new instance of table row element if parent element is null calling calculateRowsToBeFilled method', () => {
    // arrange
    const directive = new Uk2DatePickerDirective(elementRefMock, rendererMock, hostMock, matFormFieldMock);
    const mockEl = document.createElement('div');
    spyOn(mockEl, 'querySelectorAll').and.returnValue([
      {
        colSpan: 3,
        parentElement: null,
      },
    ] as any);
    spyOn(directive, 'getHost').and.returnValue(mockEl);
    const trEl = document.createElement('tr');
    const createElementSpy = spyOn(document, 'createElement').and.returnValue(trEl);

    // act
    const result = directive.calculateRowsToBeFilled();

    // assert
    expect(result.length).toBe(1);
    expect(result[0].row).toBeInstanceOf(HTMLTableRowElement);
    expect(createElementSpy).toHaveBeenCalled();
  });

  it('should not add cells if there are not missing cells available calling addPlaceholderDates', () => {
    //arrange
    const directive = new Uk2DatePickerDirective(elementRefMock, rendererMock, hostMock, matFormFieldMock);
    const lastRowSpy = spyOn(directive, 'getLastRow').and.returnValue({} as any);
    const missingDatesSpy = spyOn(directive, 'getMissingDates').and.returnValue(0);
    const createDocumentSpy = spyOn(document, 'createElement');

    //act
    directive.addPlaceholderDates();

    //assert
    expect(lastRowSpy).toHaveBeenCalled();
    expect(missingDatesSpy).toHaveBeenCalled();
    expect(createDocumentSpy).not.toHaveBeenCalled();
  });

  it('should exit the method if row is falsy calling addPlaceholderDates', () => {
    //arrange
    const directive = new Uk2DatePickerDirective(elementRefMock, rendererMock, hostMock, matFormFieldMock);
    const lastRowSpy = spyOn(directive, 'getLastRow').and.returnValue(null as any);
    const missingDatesSpy = spyOn(directive, 'getMissingDates');
    const createDocumentSpy = spyOn(document, 'createElement');

    //act
    directive.addPlaceholderDates();

    //assert
    expect(lastRowSpy).toHaveBeenCalled();
    expect(missingDatesSpy).not.toHaveBeenCalled();
    expect(createDocumentSpy).not.toHaveBeenCalled();
  });

  it('should call clearRow if row is totally empty calling addPreviousPlaceholderDates', () => {
    //arrange
    const directive = new Uk2DatePickerDirective(elementRefMock, rendererMock, hostMock, matFormFieldMock);
    const clearRowSpy = spyOn(directive, 'clearRow');
    const cellStylesSpy = spyOn(directive, 'getCellStyles').and.returnValue({} as any);
    const rowsToBeFilledSpy = spyOn(directive, 'calculateRowsToBeFilled').and.returnValue([
      {
        cells: 7,
        completeRow: true,
        element: {} as any,
        row: {} as any,
        styleText: '',
      },
    ]);
    const addCellsSpy = spyOn(directive, 'addCells');

    //act
    directive.addPreviousPlaceholderDates();

    //assert
    expect(cellStylesSpy).toHaveBeenCalled();
    expect(rowsToBeFilledSpy).toHaveBeenCalled();
    expect(addCellsSpy).toHaveBeenCalled();
    expect(clearRowSpy).toHaveBeenCalled();
  });

  it('should process [previous|next] cells calling onMonthSelected', fakeAsync(() => {
    // arrange
    const directive = new Uk2DatePickerDirective(elementRefMock, rendererMock, hostMock, matFormFieldMock);
    const nextCellsSpy = spyOn(directive, 'addPlaceholderDates');
    const previousCellsSpy = spyOn(directive, 'addPreviousPlaceholderDates');
    const cells = [
      {
        remove: jasmine.createSpy(),
      },
    ];
    const getHostSpy = spyOn(directive, 'getHost').and.returnValue({
      querySelectorAll: jasmine.createSpy().and.returnValue(cells),
    } as any);

    // act
    directive.onMonthSelected(moment());
    tick(2);

    // assert
    expect(getHostSpy).toHaveBeenCalled();
    expect(nextCellsSpy).toHaveBeenCalled();
    expect(previousCellsSpy).toHaveBeenCalled();
  }));

  it('should set innerHTML to empty calling clearRow', () => {
    //arrange
    const directive = new Uk2DatePickerDirective(elementRefMock, rendererMock, hostMock, matFormFieldMock);
    const rowEl: any = { innerHTML: '<td>1</td><td>2</td><td>3</td>' };

    // act
    directive.clearRow(rowEl);

    // assert
    expect(rowEl.innerHTML).toEqual('');
  });

  it('should return DEFAULT_SPACE if no hint found calling getHintHeight', () => {
    //arrange
    const hintEl = null;
    const formFieldEl = {
      querySelector() {
        return hintEl;
      },
    };
    elementRefMock.nativeElement.closest.and.returnValue(formFieldEl);
    const directive = new Uk2DatePickerDirective(elementRefMock, rendererMock, hostMock, matFormFieldMock);
    let hintHeight = 0;

    //act
    hintHeight = directive.getHintHeight();

    //assert
    expect(hintHeight).toBe(25);
  });

  it('should return hint real height if hint is available calling getHintHeight', () => {
    //arrange
    const clientHeight = 40;
    const hintEl = {
      clientHeight,
    };
    const formFieldEl = {
      querySelector() {
        return hintEl;
      },
    };
    elementRefMock.nativeElement.closest.and.returnValue(formFieldEl);
    const directive = new Uk2DatePickerDirective(elementRefMock, rendererMock, hostMock, matFormFieldMock);
    let hintHeight = 0;

    //act
    hintHeight = directive.getHintHeight();

    //assert
    expect(hintHeight).toBe(clientHeight);
  });

  it('should not add space to panel if popup is not defined calling setPanelSpaceForHint', () => {
    //arrange
    const directive = new Uk2DatePickerDirective(elementRefMock, rendererMock, hostMock, matFormFieldMock);
    const getHintHeightSpy = spyOn(directive, 'getHintHeight');
    const mockEl = document.createElement('div');
    spyOn(directive, 'getHost').and.returnValue(mockEl);

    //act
    directive.setPanelSpaceForHint();

    //assert
    expect(getHintHeightSpy).not.toHaveBeenCalled();
  });

  it('should call removeActiveClass and triggerInputClasses methods calling onClose', () => {
    //arrange
    const directive = new Uk2DatePickerDirective(elementRefMock, rendererMock, hostMock, matFormFieldMock);
    const removeActiveClassSpy = spyOn(directive, 'removeActiveClass');
    const triggerInputClassesSpy = spyOn(directive, 'triggerInputClasses');
    const destroySpy = jasmine.createSpyObj('destroy$', ['next', 'complete']);
    directive['destroy$'] = destroySpy;

    //act
    directive.onClose();

    //assert
    expect(removeActiveClassSpy).toHaveBeenCalled();
    expect(triggerInputClassesSpy).toHaveBeenCalled();
  });

  it('should remove mat-focused class from mat-form-field calling removeActiveClass', () => {
    //arrange
    const directive = new Uk2DatePickerDirective(elementRefMock, rendererMock, hostMock, matFormFieldMock);
    const formFieldMock = {
      classList: {
        remove: jasmine.createSpy(),
      },
    };
    const elementMock = {
      closest() {
        return formFieldMock;
      },
    } as any;

    //act
    directive.removeActiveClass(elementMock);

    //assert
    expect(formFieldMock.classList.remove).toHaveBeenCalledOnceWith('mat-focused');
  });

  it('should trigger focus and blur events from datepicker input calling triggerInputClasses', () => {
    //arrange
    const directive = new Uk2DatePickerDirective(elementRefMock, rendererMock, hostMock, matFormFieldMock);
    const inputMock = {
      focus: jasmine.createSpy(),
      blur: jasmine.createSpy(),
    } as any;

    //act
    directive.triggerInputClasses(inputMock);

    //assert
    expect(inputMock.focus).toHaveBeenCalled();
    expect(inputMock.blur).toHaveBeenCalled();
  });

  it('should not trigger focus and blur events from datepicker input calling triggerInputClasses if input is null', () => {
    //arrange
    const directive = new Uk2DatePickerDirective(elementRefMock, rendererMock, hostMock, matFormFieldMock);
    const inputMock = null;

    //act assert
    expect(() => {
      directive.triggerInputClasses(inputMock);
    }).toThrowError();
  });

  it('should execute function on click event calling addNavigationClick method', () => {
    //arrange
    const hostEl = {
      querySelector: jasmine.createSpy().and.returnValue({}),
    } as any;

    const spy = jasmine.createSpy();
    const clickListenerCallback = (host: any) => {
      spy(host);
    };
    const clickListener = (selector: any, event: any, host: any) => {
      host();
    };
    rendererMock.listen = clickListener;
    const directive = new Uk2DatePickerDirective(elementRefMock, rendererMock, hostMock, matFormFieldMock);
    spyOn(directive, 'getHost').and.returnValue(hostEl);

    //act
    directive.addNavigationClick('selector', clickListenerCallback);

    //assert
    expect(spy).toHaveBeenCalledWith(hostEl);
  });
});

function delay(delay: number) {
  return new Promise(function (resolve) {
    setTimeout(resolve, delay);
  });
}
