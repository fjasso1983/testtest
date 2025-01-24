import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Uk2StretchTabsDirective } from './uk2-stretch-tabs.directive';
import { Uk2StretchTabsSizeEnum } from './enums';

// Test host component
@Component({
  template: `
    <mat-tab-group
      uk2StretchTabs
      disableRipple
      mat-stretch-tabs
      [uk2IsLoading]="isLoading"
      [uk2StretchTabsSize]="stretchTabsSize"
      animationDuration="0ms"
    >
      <mat-tab label="Tab 1">Tab 1 content</mat-tab>
      <mat-tab label="Tab 2">Tab 2 content</mat-tab>
      <mat-tab label="Tab 3">Tab 3 content</mat-tab>
    </mat-tab-group>
  `,
})
class TestHostComponent {
  isLoading = false;
  stretchTabsSize: Uk2StretchTabsSizeEnum | string = Uk2StretchTabsSizeEnum.medium;
}

describe('Uk2StretchTabsDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let directive: Uk2StretchTabsDirective;
  let directiveElement: DebugElement;
  let testHostComponent: TestHostComponent;
  let matTabGroupElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestHostComponent, Uk2StretchTabsDirective],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = fixture.componentInstance;
    directiveElement = fixture.debugElement.query(By.directive(Uk2StretchTabsDirective));
    directive = directiveElement.injector.get(Uk2StretchTabsDirective);
    matTabGroupElement = fixture.debugElement.query(By.css('mat-tab-group'));
    fixture.detectChanges();
  });

  it('should create the directive', () => {
    expect(directive).toBeTruthy();
  });

  it('should add uk2-stretch-tabs class to mat-tab-group element', () => {
    expect(matTabGroupElement.nativeElement.classList.contains('uk2-stretch-tabs')).toBeTrue();
  });

  it('should create skeleton template', () => {
    const skeletonTemplate = directive['uk2StretchTabsSkeletonTemplate'];
    expect(skeletonTemplate).toBeDefined();
    expect(skeletonTemplate.classList.contains('uk2-stretch-tabs-skeleton')).toBeTrue();
  });

  it('should thrown error when size is not valid', () => {
    testHostComponent.stretchTabsSize = 'invalid';
    expect(() => fixture.detectChanges()).toThrowError(Error);
  });

  it('should toggle is loading', () => {
    testHostComponent.isLoading = true;
    fixture.detectChanges();
    const tabGroupElement = directiveElement.nativeElement;
    const skeletonTemplate = directive['uk2StretchTabsSkeletonTemplate'];
    fixture.detectChanges();
    expect(tabGroupElement.classList.contains('uk2-hidden')).toBeTrue();
    expect(skeletonTemplate.classList.contains('uk2-hidden')).toBeFalse();
    testHostComponent.isLoading = false;
    fixture.detectChanges();
    expect(tabGroupElement.classList.contains('uk2-hidden')).toBeFalse();
    expect(skeletonTemplate.classList.contains('uk2-hidden')).toBeTrue();
  });

  it('should update size class', () => {
    const tabGroupElement = directiveElement.nativeElement;
    const skeletonTemplate = directive['uk2StretchTabsSkeletonTemplate'];
    testHostComponent.stretchTabsSize = Uk2StretchTabsSizeEnum.small;
    fixture.detectChanges();
    expect(tabGroupElement.classList.contains('uk2-stretch-tabs-small')).toBeTrue();
    expect(tabGroupElement.classList.contains('uk2-stretch-tabs-medium')).toBeFalse();
    testHostComponent.stretchTabsSize = Uk2StretchTabsSizeEnum.medium;
    fixture.detectChanges();
    expect(tabGroupElement.classList.contains('uk2-stretch-tabs-medium')).toBeTrue();
    expect(tabGroupElement.classList.contains('uk2-stretch-tabs-small')).toBeFalse();
    testHostComponent.isLoading = true;
    testHostComponent.stretchTabsSize = Uk2StretchTabsSizeEnum.small;
    fixture.detectChanges();
    expect(skeletonTemplate.classList.contains('uk2-stretch-tabs-small')).toBeTrue();
    expect(skeletonTemplate.classList.contains('uk2-stretch-tabs-medium')).toBeFalse();
    testHostComponent.stretchTabsSize = Uk2StretchTabsSizeEnum.medium;
    fixture.detectChanges();
    expect(skeletonTemplate.classList.contains('uk2-stretch-tabs-medium')).toBeTrue();
    expect(skeletonTemplate.classList.contains('uk2-stretch-tabs-small')).toBeFalse();
  });
});

@Component({
  template: `
    <mat-tab-group uk2StretchTabs disableRipple mat-stretch-tabs animationDuration="0ms">
      <mat-tab label="Tab 1">Tab 1 content</mat-tab>
      <mat-tab label="Tab 2">Tab 2 content</mat-tab>
      <mat-tab label="Tab 3">Tab 3 content</mat-tab>
    </mat-tab-group>

    <mat-tab-group id="errorMatStretchTabs" disableRipple uk2StretchTabs animationDuration="0ms">
      <mat-tab label="Tab 1">Tab 1 content</mat-tab>
      <mat-tab label="Tab 2">Tab 2 content</mat-tab>
      <mat-tab label="Tab 3">Tab 3 content</mat-tab>
    </mat-tab-group>

    <mat-tab-group id="errorColor" uk2StretchTabs mat-stretch-tabs disableRipple color="red" animationDuration="0ms">
      <mat-tab label="Tab 1">Tab 1 content</mat-tab>
      <mat-tab label="Tab 2">Tab 2 content</mat-tab>
      <mat-tab label="Tab 3">Tab 3 content</mat-tab>
    </mat-tab-group>

    <mat-tab-group
      id="errorDefaultColor"
      uk2StretchTabs
      mat-stretch-tabs
      disableRipple
      defaultColor="red"
      animationDuration="0ms"
    >
      <mat-tab label="Tab 1">Tab 1 content</mat-tab>
      <mat-tab label="Tab 2">Tab 2 content</mat-tab>
      <mat-tab label="Tab 3">Tab 3 content</mat-tab>
    </mat-tab-group>

    <mat-tab-group id="errorDisableRipple" uk2StretchTabs mat-stretch-tabs animationDuration="0ms">
      <mat-tab label="Tab 1">Tab 1 content</mat-tab>
      <mat-tab label="Tab 2">Tab 2 content</mat-tab>
      <mat-tab label="Tab 3">Tab 3 content</mat-tab>
    </mat-tab-group>

    <mat-tab-group id="errorAnimationDuration" uk2StretchTabs mat-stretch-tabs>
      <mat-tab label="Tab 1">Tab 1 content</mat-tab>
      <mat-tab label="Tab 2">Tab 2 content</mat-tab>
      <mat-tab label="Tab 3">Tab 3 content</mat-tab>
    </mat-tab-group>
  `,
})
class TestWrongSelectorHostComponent {}

describe('Uk2StretchTabsDirective', () => {
  let fixture: ComponentFixture<TestWrongSelectorHostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestWrongSelectorHostComponent, Uk2StretchTabsDirective],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(TestWrongSelectorHostComponent);
    fixture.detectChanges();
  });

  it('should not apply the directive due to absence of mat-stretch-tabs attribute', () => {
    const matTabGroup = fixture.debugElement.nativeElement.querySelector('#errorMatStretchTabs');
    expect(matTabGroup.classList.contains('uk2-stretch-tabs')).toBeFalse();
  });

  it('should not apply the directive due to presence of color attribute', () => {
    const matTabGroup = fixture.debugElement.nativeElement.querySelector('#errorColor');
    expect(matTabGroup.classList.contains('uk2-stretch-tabs')).toBeFalse();
  });

  it('should not apply the directive due to presence of defaultColor attribute', () => {
    const matTabGroup = fixture.debugElement.nativeElement.querySelector('#errorDefaultColor');
    expect(matTabGroup.classList.contains('uk2-stretch-tabs')).toBeFalse();
  });

  it('should not apply the directive due to absence of disableRipple attribute', () => {
    const matTabGroup = fixture.debugElement.nativeElement.querySelector('#errorDisableRipple');
    expect(matTabGroup.classList.contains('uk2-stretch-tabs')).toBeFalse();
  });

  it('should not apply the directive due to presence of animationDuration attribute different of 0ms', () => {
    const matTabGroup = fixture.debugElement.nativeElement.querySelector('#errorAnimationDuration');
    expect(matTabGroup.classList.contains('uk2-stretch-tabs')).toBeFalse();
  });
});
