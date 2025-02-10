import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { MatIconTestingModule } from '@angular/material/icon/testing';

import { BehaviorSubject } from 'rxjs';

import { Uk2ServicesModule } from '@axos/uikit-v2-lib';
import { Uk2IconRegistryService } from '../../uk2-services';

import { Uk2BreadcrumbsComponent } from './uk2-breadcrumbs.component';
import { Uk2BreadcrumbsContainerDirective } from './uk2-breadcrumbs-container/uk2-breadcrumbs-container.directive';
import { Uk2BreadcrumbItemComponent } from './uk2-breadcrumb-item/uk2-breadcrumb-item.component';

@Component({
  template: 'blank-component',
})
class BlankComponent {}

describe('Uk2BreadcrumbsComponent', () => {
  let fixture: ComponentFixture<Uk2BreadcrumbsComponent>;
  let component: Uk2BreadcrumbsComponent;
  let service: Uk2IconRegistryService;
  let overflowMock: BehaviorSubject<boolean>;

  beforeEach(async () => {
    overflowMock = new BehaviorSubject<boolean>(false);
    await TestBed.configureTestingModule({
      declarations: [Uk2BreadcrumbsComponent, Uk2BreadcrumbItemComponent],
      providers: [
        Uk2IconRegistryService,
        {
          provide: Uk2BreadcrumbsContainerDirective,
          useValue: {
            overflow: overflowMock,
          },
        },
      ],
      imports: [
        CommonModule,
        Uk2ServicesModule,
        MatIconTestingModule,
        HttpClientModule,
        RouterTestingModule.withRoutes([
          {
            path: 'menu',
            component: BlankComponent,
          },
          {
            path: 'item',
            component: BlankComponent,
          },
        ]),
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(Uk2IconRegistryService);
    service.registerAllCategories();
    fixture = TestBed.createComponent(Uk2BreadcrumbsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 2 links and 2 chevron icons when component has 3 breadcrumb items', () => {
    const items = [
      {
        label: 'Link 1',
        url: '/component1',
      },
      {
        label: 'Link 2',
        url: '/component2',
      },
      {
        label: 'Link 3',
        url: '/component3',
      },
    ];
    component.items = items;

    fixture.detectChanges();

    const navEl = fixture.debugElement.query(By.css('.uk2-breadcrumbs-visible'));

    const anchors = navEl.nativeElement.querySelectorAll('a');
    const icons = navEl.nativeElement.querySelectorAll('mat-icon');

    expect(anchors.length).toBe(2);
    expect(icons.length).toBe(2);
    for (let i = 0; i < anchors.length; i++) {
      expect(anchors[i].getAttribute('href')).toEqual(items[i].url);
    }
  });

  it('should render last item as normal text', () => {
    component.items = [
      {
        label: 'Menu',
        url: '/menu',
      },
      {
        label: 'Item #1',
        url: '/item',
      },
    ];

    fixture.detectChanges();
    const breadcrumbContainer = fixture.debugElement.query(By.css('.uk2-breadcrumbs'));
    const lastListItem = breadcrumbContainer.children[breadcrumbContainer.children.length - 1].nativeElement;
    const lastItem = lastListItem.querySelector('label') as any;

    expect(lastItem.nodeName === 'LABEL').toBeTrue();
    expect(lastItem.textContent.trim() === 'Item #1').toBeTrue();
  });

  it('should show skeleton view if uk2IsLoading input is true', () => {
    let getBreadcrumbs = () => fixture.debugElement.query(By.css('section.uk2-breadcrumbs'));
    let getSkeleton = () => fixture.debugElement.query(By.css('div.uk2-breadcrumbs.uk2-breadcrumbs-skeleton'));

    expect(getBreadcrumbs()).toBeDefined();
    expect(getSkeleton()).toBeNull();

    component.uk2IsLoading = true;
    component.items = [
      {
        label: 'Home',
      },
    ];
    fixture.detectChanges();

    expect(getBreadcrumbs()).toBeNull();
    expect(getSkeleton()).toBeDefined();
  });

  it('should throw an error when input items is not provided', () => {
    expect(() => {
      component.items = undefined as any;
      fixture.detectChanges();
    }).toThrowError();
  });

  it('should throw an error when input items is empty array', () => {
    expect(() => {
      component.items = [];
      fixture.detectChanges();
    }).toThrowError();
  });

  it('should call emit when a link is clicked', () => {
    const items = [
      {
        label: 'Menu',
        url: '/menu',
      },
      {
        label: 'Item #1',
        url: '/item',
      },
    ];
    component.items = items;
    fixture.detectChanges();
    component.itemSelected.subscribe(item => {
      expect(item).toEqual(items[0]);
    });
    const link = fixture.debugElement.query(By.css('a'));

    link.nativeElement.click();
  });

  it('should show uk2-breadcrumb-truncated component when options overflow parent component', () => {
    const items = [
      {
        label: 'Menu',
        url: '/menu',
      },
      {
        label: 'Item #1',
        url: '/item',
      },
    ];
    overflowMock.next(true);
    component.items = items;
    fixture.detectChanges();

    const collapsedBreadcrumbs = fixture.debugElement.query(By.css('uk2-breadcrumb-truncated'));

    expect(collapsedBreadcrumbs).not.toBeNull();
  });
});
