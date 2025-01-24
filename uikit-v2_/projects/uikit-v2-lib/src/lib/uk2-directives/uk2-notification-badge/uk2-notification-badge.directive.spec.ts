import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';

import { MatBadgeModule } from '@angular/material/badge';

import { Uk2NotificationBadgeDirective } from './uk2-notification-badge.directive';
import { Uk2BadgeTypeEnum } from './enums';

describe('Uk2NotificationBadgeDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, Uk2NotificationBadgeDirective],
      imports: [MatBadgeModule, BrowserModule, CommonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create a badge even if the initial value is empty', () => {
    const uk2Badge = fixture.debugElement.query(By.css('.mat-badge'));

    expect(uk2Badge).not.toBeNull();
  });

  it('should add class "uk2-notification-badge"', () => {
    const uk2Badge = fixture.debugElement.query(By.css('.uk2-notification-badge'));

    expect(uk2Badge).not.toBeNull();
  });

  it('should render number inside the badge', () => {
    component.text = '1';

    fixture.detectChanges();

    const badgeContent = fixture.debugElement.query(By.css('.mat-badge-content')).nativeElement.innerHTML;
    expect(badgeContent).toBe('1');
  });

  it('should render characters inside the badge', () => {
    component.text = '!';

    fixture.detectChanges();

    const badgeContent = fixture.debugElement.query(By.css('.mat-badge-content')).nativeElement.innerHTML;
    expect(badgeContent).toBe('!');
  });

  it('should render "9+" inside the badge when badge content is greater that 9', (done: DoneFn) => {
    component.text = '10';

    fixture.detectChanges();

    setTimeout(() => {
      const badgeContent = fixture.debugElement.query(By.css('.mat-badge-content')).nativeElement.innerHTML;
      const widerBadgeEl = fixture.debugElement.query(By.css('.uk2-notification-badge-wider'));
      expect(badgeContent).toBe('9+');
      expect(widerBadgeEl).not.toBeNull();
      done();
    });
  });

  it('should change to skeleton state when uk2IsLoading is true', (done: DoneFn) => {
    component.isLoading = true;

    fixture.detectChanges();

    setTimeout(() => {
      const skeletonEl = fixture.debugElement.query(By.css('.uk2-notification-badge-skeleton'));
      expect(skeletonEl).not.toBeNull();
      done();
    });
  });

  it('should add class "uk2-notification-badge-hidden" when matBadgeHidden is true', (done: DoneFn) => {
    component.isHidden = true;

    fixture.detectChanges();

    setTimeout(() => {
      const hiddenEl = fixture.debugElement.query(By.css('.uk2-notification-badge-hidden'));
      expect(hiddenEl).not.toBeNull();
      done();
    });
  });

  it('should add class "uk2-badge" when uk2BadgeType is badge', (done: DoneFn) => {
    component.type = Uk2BadgeTypeEnum.badge;

    fixture.detectChanges();

    setTimeout(() => {
      const badgeTypeEl = fixture.debugElement.query(By.css('.uk2-badge'));
      expect(badgeTypeEl).not.toBeNull();
      done();
    });
  });

  it('should add class "uk2-selected" when uk2BadgeSelected is true', (done: DoneFn) => {
    component.selected = true;

    fixture.detectChanges();

    setTimeout(() => {
      const selectedEl = fixture.debugElement.query(By.css('.uk2-selected'));
      expect(selectedEl).not.toBeNull();
      done();
    });
  });

  it('should add class "uk2-badge-hover" when uk2BadgeEnableHoverState is true', (done: DoneFn) => {
    component.hasHover = true;

    fixture.detectChanges();

    setTimeout(() => {
      const hoverEl = fixture.debugElement.query(By.css('.uk2-badge-hover'));
      expect(hoverEl).not.toBeNull();
      done();
    });
  });
});

@Component({
  template: `
    <div
      uk2NotificationBadge
      [matBadge]="text"
      [uk2IsLoading]="isLoading"
      [matBadgeHidden]="isHidden"
      [uk2BadgeType]="type"
      [uk2BadgeEnableHoverState]="hasHover"
      [uk2BadgeSelected]="selected"
    ></div>
  `,
})
export class TestComponent {
  text: string = '';
  isLoading: boolean = false;
  isHidden: boolean = false;
  type: Uk2BadgeTypeEnum = Uk2BadgeTypeEnum.notification;
  selected: boolean = false;
  hasHover: boolean = false;
}
