import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, QueryList } from '@angular/core';
import { By } from '@angular/platform-browser';

import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatOption } from '@angular/material/core';
import { MatIconTestingModule } from '@angular/material/icon/testing';

import { Uk2BottomSheetOptionsComponent } from './uk2-bottom-sheet-options.component';
import { Uk2BottomSheetComponent } from '../uk2-bottom-sheet.component';
import {
  Uk2BottomSheetCalculatorDirective,
  Uk2BottomSheetOptionHelperDirective,
  Uk2BottomSheetTouchDismissDirective,
} from '@axos/uikit-v2-lib/src/lib/uk2-components/uk2-bottom-sheet/uk2-bottom-sheet-directives';
import { Uk2BottomSheetHeaderComponent } from '@axos/uikit-v2-lib/src/lib/uk2-components';
import { Uk2BottomSheetService, Uk2BottomSheetStackService } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';

describe('Uk2BottomSheetOptionsComponent', () => {
  let fixture: ComponentFixture<Uk2BottomSheetOptionsComponent>;
  let component: Uk2BottomSheetOptionsComponent;
  let entryOptions: QueryList<MatOption<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        Uk2BottomSheetOptionsComponent,
        Uk2BottomSheetComponent,
        Uk2BottomSheetHeaderComponent,
        Uk2BottomSheetOptionHelperDirective,
        Uk2BottomSheetCalculatorDirective,
        Uk2BottomSheetTouchDismissDirective,
      ],
      imports: [MatIconTestingModule, MatBottomSheetModule],
      providers: [Uk2BottomSheetService],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(Uk2BottomSheetOptionsComponent);
    component = fixture.componentInstance;
    const createElement = (label: string) => {
      const element = document.createElement('div');
      element.innerHTML = `<mat-option>${label}</mat-option>`;
      return element;
    };
    entryOptions = [
      {
        select: jasmine.createSpy(),
        getLabel() {
          return 'Administrator';
        },
        selected: false,
        _getHostElement() {
          return createElement(this.getLabel());
        },
      },
      {
        select: jasmine.createSpy(),
        getLabel() {
          return 'Customer';
        },
        selected: true,
        _getHostElement() {
          return createElement(this.getLabel());
        },
      },
      {
        select: jasmine.createSpy(),
        getLabel() {
          return 'Moderator';
        },
        selected: false,
        _getHostElement() {
          return createElement(this.getLabel());
        },
      },
    ] as unknown as QueryList<MatOption<any>>;

    component.options = entryOptions;
    component.ngOnChanges({
      options: {
        currentValue: entryOptions,
        firstChange: true,
        previousValue: undefined,
        isFirstChange() {
          return false;
        },
      },
    });
    fixture.detectChanges();
  });

  it('should render bottom sheet', () => {
    expect(component).toBeDefined();
  });

  it('should render 3 options', () => {
    let options = fixture.debugElement.queryAll(By.css('mat-option'));

    expect(options.length).toBe(3);
    expect(options[0].nativeElement.textContent.trim()).toEqual('Administrator');
    expect(options[1].nativeElement.textContent.trim()).toEqual('Customer');
    expect(options[2].nativeElement.textContent.trim()).toEqual('Moderator');
  });

  it('should dismiss bottom sheet after clicking option', () => {
    const dismissSpy = spyOn(component.bottomSheetStackService, 'closeBottomSheet');
    let option = fixture.debugElement.query(By.css('mat-option')).nativeElement as HTMLElement;

    option.click();

    expect(dismissSpy).toHaveBeenCalledTimes(1);
  });
});
