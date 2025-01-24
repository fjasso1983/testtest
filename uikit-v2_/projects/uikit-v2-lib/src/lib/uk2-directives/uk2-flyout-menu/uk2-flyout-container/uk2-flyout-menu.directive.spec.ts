import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Uk2ElementPositionEnum, Uk2ElementPositionModule } from '../../uk2-element-position';
import { Uk2FlyoutMenuXPosition, Uk2FlyoutMenuYPosition } from '../enums';
import { Uk2FlyoutMenuDirective } from './uk2-flyout-menu.directive';
import { Uk2FlyoutMenuModule } from '../uk2-flyout-menu.module';

describe('Uk2FlyoutMenuDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [Uk2FlyoutMenuModule, Uk2ElementPositionModule],
    }).createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open flyout menu clicking an element that call template method toggle()', () => {
    // arrange
    // verify flyout is not open
    expect(fixture.nativeElement.querySelector('.uk2-flyout-menu')).toBeNull();
    const button = fixture.nativeElement.querySelector('button');
    // act
    button.click();
    fixture.detectChanges();
    // assert
    expect(document.querySelector('.uk2-flyout-menu')).toBeTruthy();
  });

  it('should close flyout menu when clicked outside', () => {
    // arrange
    // setup flyout menu to have backdrop and to close on click outside
    component.closeOnClickOutside = true;
    component.flyoutOverlayHasBackdrop = true;
    fixture.detectChanges();
    // verify flyout is not open
    expect(fixture.nativeElement.querySelector('.uk2-flyout-menu')).toBeNull();
    const button = fixture.nativeElement.querySelector('button');
    // act
    button.click();
    fixture.detectChanges();
    // assert
    expect(document.querySelector('.uk2-flyout-menu')).toBeTruthy();
    // act
    const backdropEl = document.querySelector('.cdk-overlay-backdrop') as HTMLElement;
    backdropEl.click();
    fixture.detectChanges();
    // assert
    expect(document.querySelector('.uk2-flyout-menu')).toBeFalsy();
  });

  it('should not close flyout menu when clicked outside if closeOnClickOutside is false', () => {
    // arrange
    // setup flyout menu to have backdrop and to not close on click outside
    component.closeOnClickOutside = false;
    component.flyoutOverlayHasBackdrop = true;
    fixture.detectChanges();
    // verify flyout is not open
    expect(fixture.nativeElement.querySelector('.uk2-flyout-menu')).toBeNull();
    const button = fixture.nativeElement.querySelector('button');
    // act
    button.click();
    fixture.detectChanges();
    // assert
    expect(document.querySelector('.uk2-flyout-menu')).toBeTruthy();
    // act
    const backdropEl = document.querySelector('.cdk-overlay-backdrop') as HTMLElement;
    backdropEl.click();
    fixture.detectChanges();
    // assert
    expect(document.querySelector('.uk2-flyout-menu')).toBeTruthy();
  });

  it('should close flyout menu when calling toggle() twice', () => {
    // arrange
    // verify flyout is not open
    expect(fixture.nativeElement.querySelector('.uk2-flyout-menu')).toBeNull();
    // act
    // calling method toggle() accessing directive instance with ViewChild
    component.flyoutMenu.toggle();
    fixture.detectChanges();
    // assert
    expect(document.querySelector('.uk2-flyout-menu')).toBeTruthy();
    // act
    component.flyoutMenu.toggle();
    fixture.detectChanges();
    // assert
    expect(document.querySelector('.uk2-flyout-menu')).toBeFalsy();
  });

  it('should close flyout menu when calling close()', () => {
    // arrange
    // verify flyout is not open
    expect(fixture.nativeElement.querySelector('.uk2-flyout-menu')).toBeNull();
    const button = fixture.nativeElement.querySelector('button');
    // act
    button.click();
    fixture.detectChanges();
    // assert
    expect(document.querySelector('.uk2-flyout-menu')).toBeTruthy();
    // act
    // calling method close() accessing directive instance with ViewChild
    component.flyoutMenu.close();
    fixture.detectChanges();
    // assert
    expect(document.querySelector('.uk2-flyout-menu')).toBeFalsy();
  });

  it('should open flyout calling open()', () => {
    // arrange
    // verify flyout is not open
    expect(fixture.nativeElement.querySelector('.uk2-flyout-menu')).toBeNull();
    const button = fixture.nativeElement.querySelector('button');
    // act
    // calling method open() accessing directive instance with ViewChild
    component.flyoutMenu.open();
    fixture.detectChanges();
    // assert
    expect(document.querySelector('.uk2-flyout-menu')).toBeTruthy();
  });

  it('should not reopen flyout when calling open() twice', () => {
    // arrange
    // verify flyout is not open
    expect(fixture.nativeElement.querySelector('.uk2-flyout-menu')).toBeNull();
    const button = fixture.nativeElement.querySelector('button');
    // act
    // calling method open() accessing directive instance with ViewChild
    component.flyoutMenu.open();
    fixture.detectChanges();
    // assert
    expect(document.querySelector('.uk2-flyout-menu')).toBeTruthy();
    // act
    component.flyoutMenu.open();
    fixture.detectChanges();
    // assert
    expect(document.querySelectorAll('.uk2-flyout-menu').length).toBe(1);
  });

  it('should return true when calling isFlyoutOpen() after open()', () => {
    // arrange
    // verify flyout is not open
    expect(fixture.nativeElement.querySelector('.uk2-flyout-menu')).toBeNull();
    // act
    // calling method open() accessing directive instance with ViewChild
    component.flyoutMenu.open();
    fixture.detectChanges();
    // assert
    expect(component.flyoutMenu.isFlyoutOpen()).toBeTruthy();
  });

  it('should return false when calling isFlyoutOpen() after close()', () => {
    // arrange
    // verify flyout is not open
    expect(fixture.nativeElement.querySelector('.uk2-flyout-menu')).toBeNull();
    const button = fixture.nativeElement.querySelector('button');
    // act
    button.click();
    fixture.detectChanges();
    // assert
    expect(document.querySelector('.uk2-flyout-menu')).toBeTruthy();
    // act
    // calling method close() accessing directive instance with ViewChild
    component.flyoutMenu.close();
    fixture.detectChanges();
    // assert
    expect(component.flyoutMenu.isFlyoutOpen()).toBeFalsy();
  });

  it('should throw error when uk2FlyoutTemplate is not provided', () => {
    // arrange
    component.flyoutMenu.uk2FlyoutTemplate = undefined;
    // act
    // assert
    expect(() => component.flyoutMenu.ngAfterViewInit()).toThrowError();
  });

  it('should add class to backdrop when uk2OverlayBackdropClass is provided', () => {
    // arrange
    // config flyout menu to have backdrop and to have a custom class
    component.flyoutOverlayHasBackdrop = true;
    component.customBackdropClass = 'custom-class';
    fixture.detectChanges();
    // act
    component.flyoutMenu.open();
    fixture.detectChanges();
    // assert
    expect(document.querySelector('.custom-class')).toBeTruthy();
  });
});

@Component({
  template: `
    <button
      type="button"
      uk2FlyoutMenu
      [uk2FlyoutTemplate]="flyoutOverlay"
      [uk2OriginXPosition]="flyoutOriginXPosition"
      [uk2OverlayXPosition]="flyoutOverlayXPosition"
      [uk2OriginYPosition]="flyoutOriginYPosition"
      [uk2OverlayYPosition]="flyoutOverlayYPosition"
      [uk2CloseOnClickOutside]="closeOnClickOutside"
      [uk2OverlayYOffset]="flyoutOverlayYOffset"
      [uk2OverlayHasBackdrop]="flyoutOverlayHasBackdrop"
      [uk2OverlayBackdropClass]="customBackdropClass"
      #flyoutMenu="uk2FlyoutMenu"
      (click)="flyoutMenu.toggle()"
    >
      Open Flyout
    </button>
    <ng-template #flyoutOverlay>
      <div uk2FlyoutMenuHeader>
        <div [uk2ElementPosition]="elementPosition.left"> Icon</div>
        <div [uk2ElementPosition]="elementPosition.center"> Flyout header </div>
      </div>
      <div>
        <ul class="example-list">
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </div>
      <div uk2FlyoutMenuFooter>
        <div [uk2ElementPosition]="elementPosition.center"> Footer</div>
      </div>
    </ng-template>
  `,
})
class TestComponent {
  @ViewChild(Uk2FlyoutMenuDirective) flyoutMenu!: Uk2FlyoutMenuDirective;
  flyoutOriginXPosition: Uk2FlyoutMenuXPosition = Uk2FlyoutMenuXPosition.end;
  flyoutOverlayXPosition: Uk2FlyoutMenuXPosition = Uk2FlyoutMenuXPosition.end;
  flyoutOriginYPosition: Uk2FlyoutMenuYPosition = Uk2FlyoutMenuYPosition.bottom;
  flyoutOverlayYPosition: Uk2FlyoutMenuYPosition = Uk2FlyoutMenuYPosition.top;
  flyoutOverlayHasBackdrop = false;
  flyoutOverlayYOffset: number = 4;
  closeOnClickOutside: boolean = false;
  elementPosition = Uk2ElementPositionEnum;
  customBackdropClass = '';
}
