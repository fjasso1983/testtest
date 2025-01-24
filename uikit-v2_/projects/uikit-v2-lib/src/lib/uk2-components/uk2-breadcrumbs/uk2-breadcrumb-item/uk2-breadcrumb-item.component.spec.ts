import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { Uk2BreadcrumbItemComponent } from './uk2-breadcrumb-item.component';
import { Uk2BreadcrumbsItem } from '../types';

describe('Uk2BreadcrumbItemComponent', () => {
  let component: Uk2BreadcrumbItemComponent;
  let fixture: ComponentFixture<Uk2BreadcrumbItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Uk2BreadcrumbItemComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(Uk2BreadcrumbItemComponent);
    component = fixture.componentInstance;
  });

  describe('url breadcrumb item', () => {
    it('should emit on click and render anchor and icon', (done: DoneFn) => {
      changeToUrlBreadcrumb();

      component.itemSelected.subscribe((item: Uk2BreadcrumbsItem) => {
        expect(item.label.trim()).toBe('Home');
        expect(item.url).toBe('/home');
        done();
      });

      const breadcrumbItemEl = queryFixture('a') as any;
      const icon = queryFixture('mat-icon');

      expect(icon).not.toBeNull();
      expect(breadcrumbItemEl.textContent.trim()).toBe('Home');
      breadcrumbItemEl.click();
    });
  });

  function changeToLabelBreadcrumb() {
    component.label = 'Menu';
    fixture.detectChanges();
  }

  function changeToUrlBreadcrumb() {
    component.label = undefined;
    component.item = {
      url: '/home',
      label: 'Home',
    };
    fixture.detectChanges();
  }

  function queryFixture(selector: string): HTMLElement {
    return fixture.debugElement.query(By.css(selector)).nativeElement;
  }
});
