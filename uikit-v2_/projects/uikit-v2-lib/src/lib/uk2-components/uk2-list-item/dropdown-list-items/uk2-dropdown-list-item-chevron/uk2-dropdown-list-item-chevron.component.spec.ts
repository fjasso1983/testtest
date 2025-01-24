import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';

import { MatIconTestingModule } from '@angular/material/icon/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';

import { MATERIAL_CLASSES } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';
import { Uk2ListItemComponent, Uk2ListItem } from '@axos/uikit-v2-lib/src/lib/uk2-components';

import { UK2_DROPDOWN_LIST_ITEM_CLASS } from '../constants';
import { Uk2DropdownListItemChevronComponent } from './uk2-dropdown-list-item-chevron.component';

describe('Uk2DropdownListItemChevronComponent', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Uk2DropdownListItemChevronComponent, TestComponent, Uk2ListItemComponent],
      imports: [CommonModule, MatOptionModule, MatIconTestingModule, MatIconModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('OnInit()', () => {
    it('should add class to parent mat-option element', () => {
      const matOptionEl = getElement('#fake-mat-option');

      expect(matOptionEl.classList.contains(UK2_DROPDOWN_LIST_ITEM_CLASS)).toBeTrue();
    });
  });

  describe('template', () => {
    describe('Chevron list item with all the options provided', () => {
      it('should render mat-icon with chevron-right logo', () => {
        const chevronLogoEl = getElement('.uk2-list-item .uk2-dropdown-list-item-icon-chevron');

        expect(chevronLogoEl).toBeDefined();
        expect(chevronLogoEl.attributes.getNamedItem('data-mat-icon-name')?.value).toBe('uk2-chevron-right');
      });
    });

    it('should change mat-option to disabled if uk2IsDisabled change to true', () => {
      const matOptionEl = getElement('#fake-mat-option');

      component.disableOption();
      fixture.detectChanges();

      expect(matOptionEl.classList.contains('mdc-list-item--disabled')).toBeTrue();
    });
  });

  function getElement(selector: string): HTMLElement {
    return fixture.debugElement.query(By.css(selector)).nativeElement;
  }
});

@Component({
  template: `
    <mat-option id="fake-mat-option">
      <uk2-dropdown-list-item-chevron
        [uk2ListItem]="option"
        [uk2IsDisabled]="isDisabled"
      ></uk2-dropdown-list-item-chevron>
    </mat-option>
  `,
})
class TestComponent {
  @Input() option: Uk2ListItem = {
    headerLabelName: 'Option 1',
    showControl: true,
    svgIconName: 'uk2-location-pin',
    moneyAmount: 20.99,
    bodyText: 'Consecutar sit perlabum',
    headerLabelIdentifier: '1234',
    imageUrl: '',
    value: 'option1',
  };
  @Input() isDisabled: boolean = false;

  matOptionClass = MATERIAL_CLASSES.matOption;

  disableOption() {
    this.isDisabled = true;
  }
}
