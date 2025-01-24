import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Uk2InternalUtilsServicesModule } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';
import { DropdownTestingComponent } from '../uk2-dropdown-single/tests/dropdown-testing.component.spec';
import { UK2_DROPDOWN_ARIA_OWNS } from './constants';
import { Uk2DropdownAriaOwnsDirective } from './uk2-dropdown-aria-owns.directive';


describe('Uk2DropdownAriaOwnsDirective Class', () => {
  let fixture: ComponentFixture<DropdownTestingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DropdownTestingComponent, Uk2DropdownAriaOwnsDirective],
      imports: [MatSelectModule, MatInputModule, BrowserAnimationsModule, Uk2InternalUtilsServicesModule,],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownTestingComponent);
    const directiveEl = fixture.debugElement.query(By.directive(Uk2DropdownAriaOwnsDirective));
    fixture.detectChanges();
  });

  it('should remove aria-owns', () => {
    const test = document.querySelectorAll('[aria-owns]');
    for (let i = 0; i < test.length; i++) {
      expect(test[i].hasAttribute(UK2_DROPDOWN_ARIA_OWNS.tagInput)).toBeFalsy();
    }
  });
});
