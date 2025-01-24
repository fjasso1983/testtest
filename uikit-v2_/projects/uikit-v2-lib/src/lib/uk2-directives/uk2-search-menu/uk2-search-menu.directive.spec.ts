import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, flush, fakeAsync, tick, discardPeriodicTasks } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CdkMenuModule } from '@angular/cdk/menu';
import { OverlayModule } from '@angular/cdk/overlay';
import { DOWN_ARROW, ENTER, ESCAPE, TAB, UP_ARROW } from '@angular/cdk/keycodes';

import { Uk2SearchMenuDirective } from './uk2-search-menu.directive';
import { Uk2SearchInputClearIconDirective } from './uk2-search-field-clear-icon/uk2-search-field-clear-icon.directive';
import { Uk2SearchMenuItemDirective } from './uk2-search-menu-item/uk2-search-menu-item.directive';
import { Uk2SearchMenuOverlayDirective } from './uk2-search-menu-overlay/uk2-search-menu-overlay.directive';
import { Uk2IconRegistryService } from '../../uk2-services';
import { Uk2ListItem, Uk2ListItemModule } from '../../uk2-components';

describe('Uk2SearchMenuDirective', () => {
  let fixture: ComponentFixture<TestSearchInputComponent>;
  let component: TestSearchInputComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatIconModule,
        HttpClientTestingModule,
        Uk2ListItemModule,
        CdkMenuModule,
        OverlayModule,
      ],
      declarations: [
        TestSearchInputComponent,
        Uk2SearchMenuDirective,
        Uk2SearchInputClearIconDirective,
        Uk2SearchMenuItemDirective,
        Uk2SearchMenuOverlayDirective,
      ],
      providers: [Uk2IconRegistryService],
    }).compileComponents();

    const service = TestBed.inject(Uk2IconRegistryService);
    service.registerAllCategories();
    fixture = TestBed.createComponent(TestSearchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should add role attribute to input element', () => {
    const inputElement = fixture.nativeElement.querySelector('input');
    expect(inputElement.getAttribute('role')).toBe('searchbox');
  });

  it('should clear input value when clear button is clicked', fakeAsync(() => {
    const inputElement = fixture.nativeElement.querySelector('input');
    const clearButtonEl = fixture.debugElement.query(By.directive(Uk2SearchInputClearIconDirective)).nativeElement;

    inputElement.value = 'test';
    clearButtonEl.dispatchEvent(new Event('click'));
    tick(100);
    fixture.detectChanges();

    expect(inputElement.value).toBe('');
    flush();
  }));

  it('should clear input value when clear button is focused and pressing enter key', () => {
    const inputElement = fixture.nativeElement.querySelector('input');
    const clearButtonEl = fixture.debugElement.query(By.directive(Uk2SearchInputClearIconDirective)).nativeElement;

    inputElement.value = 'test';
    fixture.detectChanges();
    clearButtonEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    clearButtonEl.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));
    fixture.detectChanges();

    expect(inputElement.value).toBe('');
  });

  it('should open menu options when input is focused', fakeAsync(() => {
    const inputElement = fixture.nativeElement.querySelector('input');

    inputElement.dispatchEvent(new Event('click'));
    tick();
    fixture.detectChanges();

    const listItem = document.querySelectorAll('uk2-dropdown-list-item-chevron');
    expect(listItem.length).toBe(2);
    flush();
  }));

  it('should set input value when menu option is clicked', fakeAsync(() => {
    const inputElement = fixture.nativeElement.querySelector('input');

    // open suggestions
    inputElement.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    tick();

    // select first suggestion
    const listItem = document.querySelector('uk2-dropdown-list-item-chevron') as any;
    listItem.dispatchEvent(new Event('click'));
    tick(100);
    fixture.detectChanges();

    expect(inputElement.value).toBe('Option 1');
    flush();
  }));

  it('should set input value when menu option is focused and pressing enter', fakeAsync(() => {
    const inputElement = fixture.nativeElement.querySelector('input');

    // open suggestions
    inputElement.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    tick();

    // select first suggestion
    const listItem = document.querySelector('uk2-dropdown-list-item-chevron') as any;
    listItem.dispatchEvent(new KeyboardEvent('keyup', { key: 'enter' }));

    fixture.detectChanges();

    expect(inputElement.value).toBe('Option 1');
    flush();
  }));

  it('should filter menu options when input value changes', fakeAsync(() => {
    const inputElement = fixture.nativeElement.querySelector('input');

    // open suggestions
    inputElement.dispatchEvent(new Event('click'));
    tick();
    fixture.detectChanges();

    // change input value
    inputElement.value = 'Option 2';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    tick();

    const listItem = document.querySelectorAll('uk2-dropdown-list-item-chevron:not(.cdk-visually-hidden)');

    expect(listItem.length).toBe(1);
    flush();
  }));

  it('should focus menu overlay when tab key is pressed in clear button', fakeAsync(() => {
    const inputElement = fixture.nativeElement.querySelector('input');
    const clearButtonEl = fixture.debugElement.query(By.directive(Uk2SearchInputClearIconDirective)).nativeElement;

    // open suggestions
    inputElement.dispatchEvent(new Event('click'));
    tick();
    fixture.detectChanges();

    // focus clear button
    clearButtonEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));
    fixture.detectChanges();

    const listItems = document.querySelectorAll('uk2-dropdown-list-item-chevron:not(.cdk-visually-hidden)');
    expect(document.activeElement).toEqual(listItems[0]);
    flush();
  }));

  it('should focus input when menu overlay is focused and escape key is pressed', fakeAsync(() => {
    const inputElement = fixture.nativeElement.querySelector('input');

    // open suggestions
    inputElement.dispatchEvent(new Event('click'));
    tick();
    fixture.detectChanges();
    // focus overlay
    const overlay = document.querySelector('.uk2-search-menu-overlay') as HTMLElement;
    overlay.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();

    expect(document.activeElement).toBe(inputElement);
    flush();
  }));

  it('should focus first item when overlay is focused', fakeAsync(() => {
    const inputElement = fixture.nativeElement.querySelector('input');

    // open suggestions
    inputElement.dispatchEvent(new Event('click'));
    tick();
    fixture.detectChanges();

    // focus overlay
    const overlay = document.querySelector('.uk2-search-menu-overlay') as HTMLElement;
    overlay.dispatchEvent(new Event('focus'));
    fixture.detectChanges();

    const listItems = document.querySelectorAll('uk2-dropdown-list-item-chevron:not(.cdk-visually-hidden)');

    expect(document.activeElement).toBe(listItems[0]);
    flush();
  }));

  it('should prevent keys from being propagated when input is focused', fakeAsync(() => {
    const inputElement = fixture.nativeElement.querySelector('input');
    const keyDownArrowUpEvent = new KeyboardEvent('keydown', { key: 'ArrowUp', keyCode: UP_ARROW });
    const arrowUpPreventDefaultSpy = spyOn(keyDownArrowUpEvent, 'preventDefault');
    const keyDownArrowDownEvent = new KeyboardEvent('keydown', { key: 'ArrowDown', keyCode: DOWN_ARROW });
    const arrowDownPreventDefaultSpy = spyOn(keyDownArrowDownEvent, 'preventDefault');
    const keyDownEnterEvent = new KeyboardEvent('keydown', { key: 'Enter', keyCode: ENTER });
    const enterPreventDefaultSpy = spyOn(keyDownEnterEvent, 'preventDefault');

    tick();

    inputElement.dispatchEvent(new Event('click'));
    inputElement.dispatchEvent(keyDownArrowUpEvent);
    inputElement.dispatchEvent(keyDownArrowDownEvent);
    inputElement.dispatchEvent(keyDownEnterEvent);
    tick();
    fixture.detectChanges();

    expect(arrowUpPreventDefaultSpy).withContext('Arrow down pressed').toHaveBeenCalled();
    expect(arrowDownPreventDefaultSpy).withContext('Arrow up pressed').toHaveBeenCalled();
    expect(enterPreventDefaultSpy).withContext('Enter pressed').toHaveBeenCalled();
    flush();
  }));

  it('should open menu options when input value is not empty', fakeAsync(() => {
    const inputElement = fixture.nativeElement.querySelector('input');

    inputElement.value = 'Opt';
    inputElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'i', keyCode: 73 }));
    fixture.detectChanges();
    tick();

    const listItem = document.querySelectorAll('uk2-dropdown-list-item-chevron');
    expect(listItem.length).toBe(2);
    flush();
  }));

  it('should show no results message when no options are available', fakeAsync(() => {
    const inputElement = fixture.nativeElement.querySelector('input');

    // open suggestions
    inputElement.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    tick();

    // change input value
    inputElement.value = 'Option 3';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    // change input value
    inputElement.value = 'Option 33';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    tick();

    const noResultsEl = document.querySelector('.uk2-search-menu-overlay-no-results')?.textContent;
    expect(noResultsEl).toBe('No results found');
    flush();
  }));

  it('should navigate through menu options when arrow keys are pressed', fakeAsync(() => {
    const inputElement = fixture.nativeElement.querySelector('input');

    // open suggestions
    inputElement.dispatchEvent(new Event('click'));
    tick();
    fixture.detectChanges();

    // focus overlay
    const overlay = document.querySelector('.uk2-search-menu-overlay') as HTMLElement;
    overlay.dispatchEvent(new Event('focus'));
    fixture.detectChanges();

    const listItems = document.querySelectorAll('uk2-dropdown-list-item-chevron:not(.cdk-visually-hidden)');

    // focus second item
    overlay.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', keyCode: DOWN_ARROW }));
    fixture.detectChanges();
    expect(document.activeElement).toEqual(listItems[1]);

    // focus first item
    overlay.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', keyCode: DOWN_ARROW }));
    fixture.detectChanges();
    expect(document.activeElement).toEqual(listItems[0]);

    // focus second item
    overlay.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', keyCode: UP_ARROW }));
    fixture.detectChanges();
    expect(document.activeElement).toEqual(listItems[1]);
    flush();
  }));

  it('should close options when click outside overlay', fakeAsync(() => {
    const inputElement = fixture.nativeElement.querySelector('input');

    // open suggestions
    inputElement.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    tick();

    const overlayContainer = document.querySelector('.cdk-overlay-container') as HTMLElement;

    overlayContainer.dispatchEvent(new Event('click'));

    tick(100);
    fixture.detectChanges();

    const listItem = document.querySelectorAll('uk2-dropdown-list-item-chevron');
    expect(listItem.length).toBe(0);
  }));

  it('should open options when form field is clicked', fakeAsync(() => {
    const formField = fixture.nativeElement.querySelector('.mat-mdc-text-field-wrapper');

    formField.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    tick();

    const listItem = document.querySelectorAll('uk2-dropdown-list-item-chevron');
    expect(listItem.length).toBe(2);
    flush();
  }));

  it('should focus first option of menu pressing tab key', fakeAsync(() => {
    const inputElement = fixture.nativeElement.querySelector('input');

    // open suggestions
    inputElement.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    tick();

    inputElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', keyCode: TAB }));
    fixture.detectChanges();

    const listItems = document.querySelectorAll('uk2-dropdown-list-item-chevron:not(.cdk-visually-hidden)');
    expect(document.activeElement).toEqual(listItems[0]);
    flush();
  }));

  it('should not close options when click inside form field', () => {
    const formField = fixture.nativeElement.querySelector('.mat-mdc-text-field-wrapper');

    formField.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    let listItem = document.querySelectorAll('uk2-dropdown-list-item-chevron');
    expect(listItem.length).toBe(2);

    formField.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    listItem = document.querySelectorAll('uk2-dropdown-list-item-chevron');
    expect(listItem.length).toBe(2);
  });

  it('should not reopen menu options when you click on the input', fakeAsync(() => {
    const inputElement = fixture.nativeElement.querySelector('input');

    // open suggestions
    inputElement.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    tick();

    // close suggestions
    inputElement.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    tick(100);

    const listItem = document.querySelectorAll('uk2-dropdown-list-item-chevron');
    expect(listItem.length).toBe(2);
    flush();
  }));

  it('should focus first option of menu pressing tab key on overlay menu element', fakeAsync(() => {
    const inputElement = fixture.nativeElement.querySelector('input');

    // open suggestions
    inputElement.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    tick();

    const overlayEl = document.querySelector('.uk2-search-menu-overlay') as HTMLElement;
    overlayEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', keyCode: TAB }));
    fixture.detectChanges();

    const listItems = document.querySelectorAll('uk2-dropdown-list-item-chevron:not(.cdk-visually-hidden)');
    expect(document.activeElement).toEqual(listItems[0]);
    flush();
  }));

  it('should close menu pressing enter key while overlay menu element is focused', fakeAsync(() => {
    const inputElement = fixture.nativeElement.querySelector('input');

    // open suggestions
    inputElement.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    tick();

    const overlayEl = document.querySelector('.uk2-search-menu-overlay') as HTMLElement;
    overlayEl.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', keyCode: ENTER }));
    fixture.detectChanges();

    const listItem = document.querySelectorAll('uk2-dropdown-list-item-chevron');
    expect(listItem.length).toBe(0);
    flush();
    discardPeriodicTasks();
  }));

  it('should close menu if is clicked', fakeAsync(() => {
    const inputElement = fixture.nativeElement.querySelector('input');

    // open suggestions
    inputElement.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    tick();

    const overlayEl = document.querySelector('.uk2-search-menu-overlay') as HTMLElement;
    overlayEl.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    const listItem = document.querySelectorAll('uk2-dropdown-list-item-chevron');
    expect(listItem.length).toBe(0);
    flush();
    discardPeriodicTasks();
  }));

  it('should limit the max number of options displayed', fakeAsync(() => {
    const inputElement = fixture.nativeElement.querySelector('input');

    fixture.componentInstance.setMaxLimit();
    fixture.detectChanges();
    // open suggestions
    inputElement.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    tick();

    const listItem = document.querySelectorAll('uk2-dropdown-list-item-chevron:not(.cdk-visually-hidden)');
    expect(listItem.length).toBe(1);
    flush();
  }));

  it('should not show menu if input value is less than minimum length', fakeAsync(() => {
    const inputElement = fixture.nativeElement.querySelector('input');

    fixture.componentInstance.setMinimumLength();
    fixture.detectChanges();
    // open suggestions
    inputElement.dispatchEvent(new Event('keyup'));
    fixture.detectChanges();
    tick();

    const listItem = document.querySelectorAll('uk2-dropdown-list-item-chevron');
    expect(listItem.length).toBe(0);
    flush();
  }));

  it('should update the width of menu to be equal as the width of form-field if window resize event is fired', fakeAsync(() => {
    const inputElement = fixture.nativeElement.querySelector('input');

    // open suggestions
    inputElement.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    tick();

    const matFormFieldMock = {
      getBoundingClientRect() {
        return {
          width: 1000,
        };
      },
    };
    spyOn(component.uk2SearchMenuDirective as any, '_getMatFormFieldWrapper').and.returnValue(matFormFieldMock);
    const updateSizeSpy = spyOn(component.uk2SearchMenuDirective['overlayRef'] as any, 'updateSize');
    window.dispatchEvent(new Event('resize'));
    tick(50);
    fixture.detectChanges();

    expect(updateSizeSpy).toHaveBeenCalledWith({ width: 1000 });
    flush();
  }));

  it('should close menu and focus search icon if input is focused and pressed escape key', fakeAsync(() => {
    const inputElement = fixture.nativeElement.querySelector('input');
    const searchIcon = fixture.nativeElement.querySelector('.uk2-search-input-icon');

    // open suggestions
    inputElement.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    tick();

    inputElement.dispatchEvent(new KeyboardEvent('keydown', { keyCode: ESCAPE }));
    fixture.detectChanges();

    const listItem = document.querySelectorAll('uk2-dropdown-list-item-chevron');
    expect(listItem.length).toBe(0);
    expect(document.activeElement).toBe(searchIcon);
    flush();
  }));

  it('should prevent default when mousedown event is fired', () => {
    const inputElement = fixture.nativeElement.querySelector('input');
    const mousedownEvent = new MouseEvent('mousedown');
    const preventDefaultSpy = spyOn(mousedownEvent, 'preventDefault');

    // open suggestions
    inputElement.dispatchEvent(mousedownEvent);
    fixture.detectChanges();

    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('should set value to empty string if search input has not ngControl', () => {
    const setValueSpy = spyOn((component.uk2SearchMenuDirective['_ngControl'] as any).control, 'setValue');
    setValueSpy.calls.reset();
    component.uk2SearchMenuDirective['_ngControl'] = null;

    component.uk2SearchMenuDirective.clearInputAndFocus();

    expect(setValueSpy).not.toHaveBeenCalled();
    expect(component.uk2SearchMenuDirective['elementRef'].nativeElement.value).toEqual('');
  });
});

@Component({
  template: `<form>
    <mat-form-field appearance="outline" floatLabel="always">
      <mat-label>Search Input</mat-label>
      <input
        matInput
        [uk2SearchMenu]="someMenu"
        [uk2SearchMenuMinimumLength]="minimumLength"
        #inputElement
        #searchMenu="uk2SearchMenu"
        [formControl]="control"
      />
      <button matSuffix mat-icon-button uk2SearchInputClearIcon [uk2SearchMenu]="searchMenu">
        <mat-icon svgIcon="uk2-x"></mat-icon>
      </button>
      <button class="uk2-search-input-icon" matPrefix mat-icon-button [attr.aria-label]="'Search input'">
        <mat-icon svgIcon="uk2-magnifying-glass"></mat-icon>
      </button>
    </mat-form-field>
    <ng-template #someMenu>
      <div [uk2SearchMenuOverlay]="searchMenu" [uk2SearchMenuFilterDelay]="0" [uk2SearchMenuOptionsLimit]="maxLimit">
        <uk2-dropdown-list-item-chevron
          [uk2ListItem]="listItem"
          [uk2IsDisabled]="false"
          [uk2IsPending]="false"
          [uk2IsLoading]="false"
          [uk2ShowDividerLine]="false"
          uk2SearchMenuItem
          (uk2SearchMenuItemSelected)="onClick(listItem)"
          *ngFor="let listItem of uk2ListItems"
        ></uk2-dropdown-list-item-chevron>
      </div>
    </ng-template>
  </form>`,
})
class TestSearchInputComponent {
  control = new FormControl('');
  uk2ListItems: Uk2ListItem[] = [
    {
      showControl: false,
      imageUrl: 'https://v15.angular.io/assets/images/logos/angular/shield-large.svg',
      moneyAmount: 100,
      svgIconName: 'uk2-location-pin',
      bodyText: '',
      headerLabelName: 'Option 1',
      headerLabelIdentifier: '34',
      value: '1',
    },
    {
      showControl: false,
      moneyAmount: 100,
      svgIconName: 'uk2-location-pin',
      bodyText: '',
      headerLabelName: 'Option 2',
      headerLabelIdentifier: '56',
      value: '2',
    },
  ];
  maxLimit = 20;
  minimumLength = 0;
  @ViewChild(Uk2SearchMenuDirective) uk2SearchMenuDirective!: Uk2SearchMenuDirective;

  onClick(listItem: Uk2ListItem) {
    this.control.setValue(listItem.headerLabelName || '');
  }

  setMaxLimit() {
    this.maxLimit = 1;
  }

  setMinimumLength() {
    this.minimumLength = 3;
  }
}
