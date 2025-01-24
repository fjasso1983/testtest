import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Uk2MenuListItemDirective } from '@axos/uikit-v2-lib';

@Component({
  template: `
    <div id="menuListParent">
      <div
        id="menuListExample"
        uk2MenuListItem
        [uk2ShowDividerLine]="showDividerLine"
        [uk2IsDisabled]="isDisabled"
        [uk2IsLoading]="isLoading"
        [uk2IsActive]="isActive"
      >
        <p>Example text</p>
      </div>
    </div>
  `,
})
class MenuListTestComponent {
  showDividerLine = false;
  isDisabled = false;
  isActive = false;
  isLoading = false;
}
describe('Uk2MenuListItemDirective', () => {
  let component: MenuListTestComponent;
  let fixture: ComponentFixture<MenuListTestComponent>;
  let directive: Uk2MenuListItemDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuListTestComponent, Uk2MenuListItemDirective],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuListTestComponent);
    component = fixture.componentInstance;
    const directiveEl = fixture.debugElement.query(By.directive(Uk2MenuListItemDirective));
    directive = directiveEl.injector.get(Uk2MenuListItemDirective);
  });

  beforeEach(() => {
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should be created', () => {
    fixture.detectChanges();

    expect(directive).toBeTruthy();
  });

  it('should add uk2-menu-list-item class to the element', () => {
    const menuListElement = document.querySelector('#menuListExample');

    expect(menuListElement).toBeTruthy();
    expect(menuListElement?.classList).toContain('uk2-menu-list-item');
  });

  it('should add uk2-menu-list-container class to the parent element of the list item', () => {
    const menuListElement = document.querySelector('#menuListParent');

    expect(menuListElement).toBeTruthy();
    expect(menuListElement?.classList).toContain('uk2-menu-list-container');
  });

  it('should create the necesary elements for the skeleton loading state when initialized', () => {
    const skeletonContainerElement = fixture.debugElement.query(By.css('.uk2-menu-list-skeleton')).nativeElement;
    const skeletonIconElement = fixture.debugElement.query(By.css('.uk2-menu-list-skeleton-icon')).nativeElement;
    const skeletonParagraphElement = fixture.debugElement.query(
      By.css('.uk2-menu-list-skeleton-paragraph')
    ).nativeElement;
    const skeletonLowerParagraphElement = fixture.debugElement.query(
      By.css('.uk2-menu-list-skeleton-lower-paragraph')
    ).nativeElement;

    expect(skeletonContainerElement).toBeTruthy();
    expect(skeletonIconElement).toBeTruthy();
    expect(skeletonParagraphElement).toBeTruthy();
    expect(skeletonLowerParagraphElement).toBeTruthy();
  });

  it('should create a divider element for the item when uk2ShowDividerLine is set to true', () => {
    component.showDividerLine = true;
    fixture.detectChanges();

    const dividerLineElement = fixture.debugElement.query(By.css('.uk2-menu-list-divider'));

    expect(dividerLineElement).toBeTruthy();
  });

  it('should remove an existing divider element when uk2ShowDividerLine is changed to false', () => {
    component.showDividerLine = true;
    fixture.detectChanges();

    let dividerLineElement = fixture.debugElement.query(By.css('.uk2-menu-list-divider'));
    expect(dividerLineElement).toBeTruthy();

    component.showDividerLine = false;
    fixture.detectChanges();

    dividerLineElement = fixture.debugElement.query(By.css('.uk2-menu-list-divider'));
    expect(dividerLineElement).toBeFalsy();
  });

  it('should set the correct disabled class when uk2IsDisabled is set to true', () => {
    component.isDisabled = true;
    fixture.detectChanges();

    const menuListElement = fixture.debugElement.query(By.css('#menuListExample'));
    expect(menuListElement.nativeElement.classList).toContain('uk2-menu-list-disabled');
  });

  it('should remove the disabled class when uk2IsDisabled is set to false', () => {
    component.isDisabled = true;
    fixture.detectChanges();

    let menuListElement = fixture.debugElement.query(By.css('#menuListExample'));
    expect(menuListElement.nativeElement.classList).toContain('uk2-menu-list-disabled');

    component.isDisabled = false;
    fixture.detectChanges();

    expect(menuListElement.nativeElement.classList).not.toContain('uk2-menu-list-disabled');
  });

  it('should set the correct active class when uk2IsActive is set to true', () => {
    component.isActive = true;
    fixture.detectChanges();

    const menuListElement = fixture.debugElement.query(By.css('#menuListExample'));
    expect(menuListElement.nativeElement.classList).toContain('uk2-menu-list-active');
  });

  it('should remove the active class when uk2IsActive is set to false', () => {
    component.isActive = true;
    fixture.detectChanges();

    let menuListElement = fixture.debugElement.query(By.css('#menuListExample'));
    expect(menuListElement.nativeElement.classList).toContain('uk2-menu-list-active');

    component.isActive = false;
    fixture.detectChanges();

    expect(menuListElement.nativeElement.classList).not.toContain('uk2-menu-list-active');
  });

  it('should set the correct loading class when uk2IsLoading is set to true', () => {
    component.isLoading = true;
    fixture.detectChanges();

    const menuListElement = fixture.debugElement.query(By.css('#menuListExample'));
    expect(menuListElement.nativeElement.classList).toContain('uk2-menu-list-loading');
  });

  it('should remove the loading class when uk2IsLoading is set to false', () => {
    component.isLoading = true;
    fixture.detectChanges();

    let menuListElement = fixture.debugElement.query(By.css('#menuListExample'));
    expect(menuListElement.nativeElement.classList).toContain('uk2-menu-list-loading');

    component.isLoading = false;
    fixture.detectChanges();

    expect(menuListElement.nativeElement.classList).not.toContain('uk2-menu-list-loading');
  });
});
