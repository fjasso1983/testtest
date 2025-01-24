import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { OverlayModule } from '@angular/cdk/overlay';

import { Uk2BreadcrumbTruncatedComponent } from './uk2-breadcrumb-truncated.component';
import { Uk2BreadcrumbItemComponent } from '../uk2-breadcrumb-item/uk2-breadcrumb-item.component';
import { Uk2BreadcrumbOverlayListComponent } from '../uk2-breadcrumb-overlay-list/uk2-breadcrumb-overlay-list.component';

describe('Uk2BreadcrumbCollapsedComponent', () => {
  let component: Uk2BreadcrumbTruncatedComponent;
  let fixture: ComponentFixture<Uk2BreadcrumbTruncatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Uk2BreadcrumbTruncatedComponent, Uk2BreadcrumbItemComponent, Uk2BreadcrumbOverlayListComponent],
      imports: [
        OverlayModule,
        RouterTestingModule.withRoutes([
          {
            path: 'home',
            component: EmptyComponent,
          },
        ]),
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(Uk2BreadcrumbTruncatedComponent);
    component = fixture.componentInstance;
    component.items = [
      {
        url: '/home',
        label: 'Home',
      },
      {
        url: '/products',
        label: 'Products',
      },
      {
        url: '/details',
        label: 'Details',
      },
    ];
    fixture.detectChanges();
  });

  it('should create 3 items', () => {
    const [firstBreadcrumbEl, secondBreadcrumbEl] = queryFixtureAll('uk2-breadcrumb-item');
    const thirdItem = queryFixture('label') as any;

    const firstAnchor = firstBreadcrumbEl.querySelector('a') as any;
    const secondAnchor = secondBreadcrumbEl.querySelector('p') as any;

    expect(firstAnchor.textContent.trim()).toBe('Home');
    expect(secondAnchor.textContent.trim()).toBe('...');
    expect(thirdItem.textContent.trim()).toBe('Details');
  });

  it('should open overlay clicking ellipsis', (done: DoneFn) => {
    openOverlay();

    const overlayListComponent = queryFixture('uk2-breadcrumb-overlay-list');
    const overlayBreadcrumbEl = overlayListComponent.querySelector('a') as any;

    setTimeout(() => {
      expect(overlayBreadcrumbEl.textContent.trim()).toBe('Products');
      done();
    });
  });

  it('should focus ellipsis when overlay closes', () => {
    openOverlay();

    const [firstBreadcrumb, secondBreadcrumbEl] = queryFixtureAll('uk2-breadcrumb-item');
    const secondAnchor = secondBreadcrumbEl.querySelector('p') as HTMLElement;

    document.body.click();
    fixture.detectChanges();

    expect(() => {
      queryFixture('uk2-breadcrumb-overlay-list');
    }).toThrowError();
    expect(document.activeElement === secondAnchor).toBeTrue();
  });

  it('should emit breadcrumb item when you click on an item', (done: DoneFn) => {
    const firstBreadcrumb = queryFixture('uk2-breadcrumb-item');
    const link = firstBreadcrumb.querySelector('a') as HTMLElement;

    component.itemSelected.subscribe(item => {
      expect(item.label.trim()).toBe('Home');
      expect(item.url).toBe('/home');
      done();
    });

    link.click();
  });

  it('should not add aria-label ');

  function queryFixture(selector: string): HTMLElement {
    return fixture.debugElement.query(By.css(selector)).nativeElement;
  }

  function queryFixtureAll(selector: string): HTMLElement[] {
    return fixture.debugElement.queryAll(By.css(selector)).map(debugElement => debugElement.nativeElement);
  }

  function openOverlay() {
    const [_, secondBreadcrumbEl] = queryFixtureAll('uk2-breadcrumb-item');

    const secondAnchor = secondBreadcrumbEl.querySelector('p') as HTMLElement;

    secondAnchor.click();
    fixture.detectChanges();
  }
});

@Component({
  template: ``,
})
class EmptyComponent {}
