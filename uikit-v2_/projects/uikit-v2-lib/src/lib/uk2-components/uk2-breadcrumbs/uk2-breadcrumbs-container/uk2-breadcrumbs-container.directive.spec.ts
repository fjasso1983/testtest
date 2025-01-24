import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { Uk2BreadcrumbsContainerDirective } from './uk2-breadcrumbs-container.directive';
import { Uk2BreadcrumbsItem } from '@axos/uikit-v2-lib/src/lib/uk2-components';

describe('Uk2BreadcrumbsContainerDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Uk2BreadcrumbsContainerDirective, TestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit true when list of items overflow parent container width', fakeAsync((done: DoneFn) => {
    component.overflow.subscribe(overflow => {
      expect(overflow).toBeTrue();
    });
    component.overflowContainer();
    fixture.detectChanges();

    tick(500);
  }));

  it('should emit true when list of items overflow parent container width and window resize', fakeAsync((
    done: DoneFn
  ) => {
    component.overflow.subscribe(overflow => {
      expect(overflow).toBeTrue();
    });
    component.overflowContainer();

    window.dispatchEvent(new Event('resize'));
    fixture.detectChanges();

    tick(500);
  }));
});

@Component({
  template: `
    <div #container>
      <uk2-breadcrumbs [items]="items" (overflow)="onOverflow($event)">
        <div class="uk2-breadcrumb-item-size" *ngFor="let item of items" style="display: inline-block">
          {{ item.label }}
        </div>
      </uk2-breadcrumbs>
    </div>
  `,
})
class TestComponent {
  @Output() overflow = new EventEmitter<boolean>();
  @ViewChild('container') containerEl!: ElementRef;

  items: Uk2BreadcrumbsItem[] = [
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
    {
      url: '/testing-page',
      label: 'Testing page with a long name',
    },
    {
      url: '/testing-page-2',
      label: 'Another testing page with a long name',
    },
  ];

  onOverflow(overflow: boolean) {
    this.overflow.emit(overflow);
  }

  overflowContainer() {
    this.items = [...this.items, ...this.items];
  }
}

@Component({
  template: `
    <div #container>
      <uk2-breadcrumbs [items]="[]" (overflow)="onOverflow($event)"></uk2-breadcrumbs>
    </div>
  `,
})
class EmptyBreadcrumbsItems {
  @Output() overflow = new EventEmitter<boolean>();

  onOverflow(overflow: boolean) {
    this.overflow.emit(overflow);
  }
}
