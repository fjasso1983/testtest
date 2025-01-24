import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { Uk2BreadcrumbOverlayListComponent } from './uk2-breadcrumb-overlay-list.component';

describe('Uk2BreadcrumbOverlayListComponent', () => {
  let component: Uk2BreadcrumbOverlayListComponent;
  let fixture: ComponentFixture<Uk2BreadcrumbOverlayListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Uk2BreadcrumbOverlayListComponent],
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'products',
            component: EmptyComponent,
          },
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Uk2BreadcrumbOverlayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create empty element with empty list', () => {
    renderEmptyList();

    expect(component).toBeTruthy();
    expect(queryFixtureAll('a')).toEqual([]);
  });

  it('should create empty element with list with one item', () => {
    renderOneItemList();

    expect(component).toBeTruthy();
    expect(queryFixtureAll('a')).toEqual([]);
  });

  it('should create empty element with list with two items', () => {
    renderTwoItemList();

    expect(component).toBeTruthy();
    expect(queryFixtureAll('a')).toEqual([]);
  });

  it('should create one element when list has three items', () => {
    renderThreeItemList();

    const links = queryFixtureAll('a') as any;

    expect(component).toBeTruthy();
    expect(links.length).toBe(1);
    expect(links[0].textContent.trim()).toBe('Products');
  });

  it('should add style attribute with input values', () => {
    renderThreeItemList();
    sendNewCSSInputs();

    const color = window.getComputedStyle(fixture.nativeElement).backgroundColor;

    expect(color).toBe('rgb(0, 0, 255)');
  });

  it('should emit breadcrumb item when you click on an item', (done: DoneFn) => {
    renderThreeItemList();

    const link = queryFixture('a') as any;

    component.itemSelected.subscribe(item => {
      expect(item.label).toBe('Products');
      expect(item.url).toBe('/products');
      done();
    });

    link.click();
  });

  function queryFixture(selector: string): HTMLElement {
    return fixture.debugElement.query(By.css(selector)).nativeElement;
  }

  function queryFixtureAll(selector: string): HTMLElement[] {
    return fixture.debugElement.queryAll(By.css(selector)).map(element => element.nativeElement);
  }

  function renderEmptyList() {
    component.items = [];
    fixture.detectChanges();
  }

  function renderOneItemList() {
    component.items = [
      {
        url: '/home',
        label: 'Home',
      },
    ];
    fixture.detectChanges();
  }

  function renderTwoItemList() {
    component.items = [
      {
        url: '/home',
        label: 'Home',
      },
      {
        url: '/products',
        label: 'Products',
      },
    ];
    fixture.detectChanges();
  }

  function renderThreeItemList() {
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
  }

  function sendNewCSSInputs() {
    component.uk2BreadcrumbsCssProperties = [
      {
        name: 'background-color',
        value: 'blue',
      },
    ];
    component.ngOnChanges({
      uk2BreadcrumbsCssProperties: {
        firstChange: false,
      } as any,
    });
    fixture.detectChanges();
  }
});

@Component({
  template: ``,
})
class EmptyComponent {}
