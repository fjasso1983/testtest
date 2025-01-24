import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatTabsModule } from '@angular/material/tabs';

import { Uk2VerticalTabGroupDirective } from './uk2-vertical-tab-group.directive';
import { By } from '@angular/platform-browser';
import { Uk2VerticalTabSizeEnum } from '../enums';

describe('Uk2VerticalTabGroupDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, Uk2VerticalTabGroupDirective],
      imports: [CommonModule, NoopAnimationsModule, MatTabsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  // add uk2 class to container
  it('should add uk2 class "uk2-vertical-tab-container" to element <mat-tab-group>', () => {
    const container = getElement('mat-tab-group');

    expect(hasClass(container, 'uk2-vertical-tab-container')).toBeTrue();
  });

  // add uk2 class to all child items
  it('should add uk2 class "uk2-vertical-tab" to each child element <mdc-tab>', () => {
    const items = getElements('.mdc-tab.mat-mdc-tab');

    items.forEach(element => {
      expect(hasClass(element, 'uk2-vertical-tab')).toBeTrue();
    });
  });

  // add disabled class when disabled is true
  it('should add disabled class "uk2-vertical-tab-container-disabled" to element <mat-tab-group> when isDisabled input is true', () => {
    // check that tab group is not disabled
    let container = getElement('mat-tab-group');
    expect(hasClass(container, 'uk2-vertical-tab-container-disabled')).toBeFalse();

    // disable tabs
    component.isDisabled = true;
    fixture.detectChanges();

    // check disabled class
    container = getElement('mat-tab-group');
    expect(hasClass(container, 'uk2-vertical-tab-container-disabled')).toBeTrue();
  });

  // add loading class when loading is true
  it('should add loading class "uk2-skeleton-tab-container" to element <mat-tab-group> when isLoading input is true', () => {
    // check that tab group is not loading
    let container = getElement('mat-tab-group');
    expect(hasClass(container, 'uk2-skeleton-tab-container')).toBeFalse();

    // activate loading tabs
    component.isLoading = true;
    fixture.detectChanges();

    // check loading class
    container = getElement('mat-tab-group');
    expect(hasClass(container, 'uk2-skeleton-tab-container')).toBeTrue();
  });

  // change density class depending on the value uk2TabSize
  describe('tab densities', () => {
    it('should change from medium density to small density', () => {
      // change to medium density
      component.sizeTabs = Uk2VerticalTabSizeEnum.medium;
      fixture.detectChanges();
      // small density class should not be set
      let container = getElement('mat-tab-group');
      expect(hasClass(container, 'uk2-vertical-tab-container-small')).toBe(false);

      // change to small density
      component.sizeTabs = Uk2VerticalTabSizeEnum.small;
      fixture.detectChanges();
      // check that small density class is applied
      container = getElement('mat-tab-group');
      expect(hasClass(container, 'uk2-vertical-tab-container-small')).toBe(true);
    });

    it('should change from small density to medium density', () => {
      // change to small density
      component.sizeTabs = Uk2VerticalTabSizeEnum.small;
      fixture.detectChanges();
      // medium density class should not be set
      let container = getElement('mat-tab-group');
      expect(hasClass(container, 'uk2-vertical-tab-container-medium')).toBe(false);

      // change to medium density
      component.sizeTabs = Uk2VerticalTabSizeEnum.medium;
      fixture.detectChanges();
      // check that medium density class is applied
      container = getElement('mat-tab-group');
      expect(hasClass(container, 'uk2-vertical-tab-container-medium')).toBe(true);
    });

    it('should set medium density as default', () => {
      // Toggle invalid size
      component.changeSize();
      fixture.detectChanges();
      // expect medium density class to be set
      let container = getElement('mat-tab-group');
      expect(hasClass(container, 'uk2-vertical-tab-container-medium')).toBe(true);
    });
  });

  // utils
  function getElement(selector: string): HTMLElement {
    return fixture.debugElement.query(By.css(selector)).nativeElement;
  }
  function getElements(selector: string): HTMLElement[] {
    return fixture.debugElement.queryAll(By.css(selector)).map(debugElement => debugElement.nativeElement);
  }

  function hasClass(element: HTMLElement, name: string): boolean {
    return element.classList.contains(name);
  }
});

@Component({
  template: ` <mat-tab-group
    mat-stretch-tabs="false"
    disableRipple
    uk2VerticalTabs
    animationDuration="0ms"
    [uk2IsLoading]="isLoading"
    [uk2TabSize]="sizeTabs"
    [uk2IsDisabled]="isDisabled"
  >
    <mat-tab label="First">Content 1</mat-tab>
    <mat-tab label="Second">Content 2</mat-tab>
    <mat-tab label="Third">Content 3</mat-tab>
  </mat-tab-group>`,
})
export class TestComponent {
  isLoading = false;
  sizeTabs = Uk2VerticalTabSizeEnum.medium;
  isDisabled = false;

  changeSize() {
    this.sizeTabs = 'large' as any;
  }
}
