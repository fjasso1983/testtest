import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Uk2FilterBarDirective } from './uk2-filter-bar.directive';
import { Uk2FilterChipBooleanModule } from '../../uk2-components';
import { MatIconModule } from '@angular/material/icon';
import { MatIconTestingModule } from '@angular/material/icon/testing';

describe('Uk2FilterBarDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, Uk2FilterBarDirective],
      imports: [Uk2FilterChipBooleanModule, MatIconModule, MatIconTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should add class "uk2-filter-bar" to element', () => {
    const filterBarEl = fixture.nativeElement.querySelector('.uk2-filter-bar');

    expect(filterBarEl).toBeTruthy();
  });

  // skeleton
  it('should create skeleton chips', () => {
    component.isFilterBarLoading = true;

    fixture.detectChanges();

    const skeletonChips = fixture.nativeElement.querySelectorAll('.uk2-filter-bar-skeleton-chip');
    expect(skeletonChips.length).toBe(4);
  });

  it('should toggle uk2-filter-bar-hovered class when related element is hovered', () => {
    const relatedEl = component.related.nativeElement;

    relatedEl.dispatchEvent(new Event('mouseover'));

    let hoveredEl = fixture.nativeElement.querySelector('.uk2-filter-bar-hovered');

    expect(hoveredEl).toBeTruthy();

    relatedEl.dispatchEvent(new Event('mouseout'));

    hoveredEl = fixture.nativeElement.querySelector('.uk2-filter-bar-hovered');

    expect(hoveredEl).toBeNull();
  });

  it('should reset the value of all filters when the clearFilters method is called', () => {
    component.filterBar.uk2FilterChips = [
      {
        clearValue: jasmine.createSpy('clearValue'),
      },
    ] as any;

    fixture.detectChanges();

    component.filterBar.clearFilters();

    expect((component.filterBar.uk2FilterChips as any)[0].clearValue).toHaveBeenCalledWith();
  });
});

@Component({
  selector: 'test-filter-bar',
  template: `
    <div uk2FilterBar [uk2IsLoading]="isFilterBarLoading" [uk2RelatedContainer]="related">
      <uk2-filter-chip-boolean
        cdkDrag
        [uk2Options]="item.options"
        [uk2Identifier]="item.label"
        *ngFor="let item of items"
      ></uk2-filter-chip-boolean>
    </div>
    <div #related> related element </div>
  `,
})
class TestComponent {
  @ViewChild(Uk2FilterBarDirective) filterBar!: Uk2FilterBarDirective;
  @ViewChild('related') related!: ElementRef;
  isFilterBarLoading = false;
  nameOptions: string[] = ['Hydrogen', 'Helium', 'Lithium', 'Beryllium', 'Boron'];
  symbolOptions: string[] = ['H', 'He', 'Li', 'Be', 'B'];
  items: any[] = [
    {
      label: 'Name',
      options: this.nameOptions,
    },
    {
      label: 'Symbol',
      options: this.symbolOptions,
    },
  ];
}
