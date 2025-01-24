import { Component, Input, QueryList, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DOWN_ARROW, TAB, UP_ARROW } from '@angular/cdk/keycodes';

import { Uk2SearchMenuOverlayDirective } from './uk2-search-menu-overlay.directive';
import { Uk2SearchMenuDirective } from '../uk2-search-menu.directive';

describe('Uk2SearchMenuOverlayDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let uk2SearchMenuMock: Uk2SearchMenuDirective;
  let inputMenuEl: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, Uk2SearchMenuOverlayDirective],
    }).compileComponents();

    uk2SearchMenuMock = jasmine.createSpyObj('Uk2SearchMenuDirective', ['close']);
    inputMenuEl = document.createElement('input');
    uk2SearchMenuMock.nativeEl = inputMenuEl;
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    component.uk2SearchMenu = uk2SearchMenuMock;

    fixture.detectChanges();
  });

  describe('HTML attributes', () => {
    it('should add class and attributes', () => {
      const targetEl = fixture.debugElement.query(By.css('#target-element')).nativeElement as HTMLElement;

      expect(targetEl.classList.contains('uk2-search-menu-overlay')).toBeTrue();
      expect(targetEl.getAttribute('role')).toEqual('listbox');
      expect(targetEl.getAttribute('tabindex')).toEqual('0');
    });
  });

  describe('HTML events', () => {
    it('should listen to keydown event escape and call focus method', () => {
      const targetEl = fixture.debugElement.query(By.css('#target-element')).nativeElement as HTMLElement;
      const focusSpy = spyOn(component.uk2SearchMenu.nativeEl, 'focus');

      targetEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'escape' }));

      expect(focusSpy).toHaveBeenCalled();
    });

    it('should listen to focus event escape and call setFirstItemActive method', () => {
      const targetEl = fixture.debugElement.query(By.css('#target-element')).nativeElement as HTMLElement;
      const setFirstItemActiveSpy = spyOn(component.uk2SearchMenuOverlayDirective['keyManager'], 'setFirstItemActive');

      targetEl.dispatchEvent(new Event('focus'));

      expect(setFirstItemActiveSpy).toHaveBeenCalled();
    });

    it('should listen to keydown event up/down arrow and call onKeydown method', () => {
      const targetEl = fixture.debugElement.query(By.css('#target-element')).nativeElement as HTMLElement;
      const onKeydownSpy = spyOn(component.uk2SearchMenuOverlayDirective['keyManager'], 'onKeydown');

      targetEl.dispatchEvent(new KeyboardEvent('keydown', { keyCode: DOWN_ARROW }));
      targetEl.dispatchEvent(new KeyboardEvent('keydown', { keyCode: UP_ARROW }));

      expect(onKeydownSpy).toHaveBeenCalledTimes(2);
    });

    it('should listen to keydown event tab and call setNextItemActive method', () => {
      const targetEl = fixture.debugElement.query(By.css('#target-element')).nativeElement as HTMLElement;
      const setNextItemActiveSpy = spyOn(component.uk2SearchMenuOverlayDirective['keyManager'], 'setNextItemActive');

      targetEl.dispatchEvent(new KeyboardEvent('keydown', { keyCode: TAB }));

      expect(setNextItemActiveSpy).toHaveBeenCalled();
    });

    it('should listen to keyup event enter and call close method', () => {
      const targetEl = fixture.debugElement.query(By.css('#target-element')).nativeElement as HTMLElement;
      const closeSpy = spyOn(component.uk2SearchMenuOverlayDirective as any, 'close');

      targetEl.dispatchEvent(new KeyboardEvent('keyup', { key: 'enter' }));

      expect(closeSpy).toHaveBeenCalled();
    });

    it('should listen to click event and call close method', () => {
      const targetEl = fixture.debugElement.query(By.css('#target-element')).nativeElement as HTMLElement;
      const closeSpy = spyOn(component.uk2SearchMenuOverlayDirective as any, 'close');

      targetEl.click();

      expect(closeSpy).toHaveBeenCalled();
    });
  });

  describe('ngOnInit', () => {
    it('should add three elements', () => {
      component.uk2SearchMenuOverlayDirective.ngOnInit();
      fixture.detectChanges();

      expect(document.querySelector('.uk2-search-menu-overlay-divider')).not.toBeNull();
      expect(document.querySelector('.uk2-search-menu-overlay-bottom-spacer')).not.toBeNull();
      expect(document.querySelector('.uk2-search-menu-overlay-no-results')).not.toBeNull();
    });

    it('should listen input events of uk2SearchMenu field and call filter methods', fakeAsync(() => {
      const handleNoResultsSectionSpy = spyOn(component.uk2SearchMenuOverlayDirective as any, 'handleNoResultsSection');
      const limitResultsSpy = spyOn(component.uk2SearchMenuOverlayDirective as any, 'limitResults');
      const filterOptionsSpy = spyOn(component.uk2SearchMenuOverlayDirective as any, 'filterOptions');

      inputMenuEl.value = 'option';
      inputMenuEl.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      tick();

      expect(handleNoResultsSectionSpy).toHaveBeenCalled();
      expect(limitResultsSpy).toHaveBeenCalled();
      expect(filterOptionsSpy).toHaveBeenCalled();
    }));
  });

  describe('ngOnDestroy', () => {
    it('should call next and complete methods of destroy$ subject on destroy', () => {
      const nextSpy = spyOn(component.uk2SearchMenuOverlayDirective['destroy$'], 'next');
      const completeSpy = spyOn(component.uk2SearchMenuOverlayDirective['destroy$'], 'complete');

      component.uk2SearchMenuOverlayDirective.ngOnDestroy();

      expect(nextSpy).toHaveBeenCalled();
      expect(completeSpy).toHaveBeenCalled();
    });
  });

  describe('react to list of options', () => {
    let components: any;
    let items: any;

    beforeEach(() => {
      components = [
        { textContent: 'name', show: jasmine.createSpy(), hide: jasmine.createSpy() },
        { textContent: 'dob', show: jasmine.createSpy(), hide: jasmine.createSpy() },
      ] as any;
      items = new QueryList();
      items.reset(components);
    });

    it('should filter options depending of input value', fakeAsync(() => {
      component.uk2SearchMenuOverlayDirective.items = items;
      inputMenuEl.value = 'name';

      inputMenuEl.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      tick();

      expect(components[0].show).toHaveBeenCalled();
      expect(components[1].hide).toHaveBeenCalled();
    }));

    it('should limit options depending of input value', fakeAsync(() => {
      components = [
        { textContent: 'name', show: jasmine.createSpy(), hide: jasmine.createSpy() },
        { textContent: 'name', show: jasmine.createSpy(), hide: jasmine.createSpy() },
        { textContent: 'name', show: jasmine.createSpy(), hide: jasmine.createSpy() },
        { textContent: 'name', show: jasmine.createSpy(), hide: jasmine.createSpy() },
        { textContent: 'name', show: jasmine.createSpy(), hide: jasmine.createSpy() },
        { textContent: 'name', show: jasmine.createSpy(), hide: jasmine.createSpy() },
      ] as any;
      items.reset(components);
      component.uk2SearchMenuOverlayDirective.items = items;
      inputMenuEl.value = 'name';

      inputMenuEl.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      tick();

      expect(components[5].hide).toHaveBeenCalled();
    }));
  });
});

@Component({
  template: `<div id="target-element" [uk2SearchMenuOverlay]="uk2SearchMenu"> </div>`,
})
class TestComponent {
  @Input() uk2SearchMenu!: Uk2SearchMenuDirective;
  @ViewChild(Uk2SearchMenuOverlayDirective) uk2SearchMenuOverlayDirective!: Uk2SearchMenuOverlayDirective;
}
