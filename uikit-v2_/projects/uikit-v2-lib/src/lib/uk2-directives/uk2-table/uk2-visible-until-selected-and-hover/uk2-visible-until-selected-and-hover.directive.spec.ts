import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

import { Uk2DirectivesModule } from '../../uk2-directives.module';
import { Uk2TableDirectiveModule } from '../uk2-table.module';
import { UK2_TABLE_ELEMENT_VISIBLE_SELECTED_AND_HOVER_CSS_CLASS } from '../constants';
import { Uk2VisibleUntilSelectedAndHoverDirective } from './uk2-visible-until-selected-and-hover.directive';
import { Uk2VisibleUntilSelectedAndHoverElementDirective } from './uk2-visible-until-selected-and-hover-element.directive';

describe('Uk2VisibleUntilSelectedAndHover', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let directive: Uk2VisibleUntilSelectedAndHoverDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        Uk2VisibleUntilSelectedAndHoverDirective,
        Uk2VisibleUntilSelectedAndHoverElementDirective,
      ],
      imports: [MatTableModule, MatCheckboxModule, Uk2TableDirectiveModule, Uk2DirectivesModule, MatButtonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    directive = component.directive;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(directive).toBeTruthy();
  });

  it('should sync with inner checkbox', () => {
    const checkbox = fixture.nativeElement.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(directive['getCheckboxCheckedState']()).toBeFalse();
    checkbox.click();
    expect(directive['getCheckboxCheckedState']()).toBeTrue();
    checkbox.click();
    expect(directive['getCheckboxCheckedState']()).toBeFalse();
  });

  it('should sync with hover', () => {
    const matRowEl = fixture.nativeElement.querySelector('mat-row');

    expect(directive.uk2IsHovered).toBeFalse();
    matRowEl.dispatchEvent(new MouseEvent('mouseenter'));
    expect(directive.uk2IsHovered).toBeTrue();
    matRowEl.dispatchEvent(new MouseEvent('mouseleave'));
    expect(directive.uk2IsHovered).toBeFalse();
  });

  it('should show target element when selected and hovered', () => {
    const matRowEl = fixture.nativeElement.querySelector('mat-row');
    const targetEl = fixture.nativeElement.querySelector(`.${UK2_TABLE_ELEMENT_VISIBLE_SELECTED_AND_HOVER_CSS_CLASS}`);
    const checkbox = fixture.nativeElement.querySelector('input[type="checkbox"]') as HTMLInputElement;

    checkbox.click();
    matRowEl.dispatchEvent(new MouseEvent('mouseenter'));

    expect(targetEl.classList.contains('uk2-visible')).toBeTrue();
    matRowEl.dispatchEvent(new MouseEvent('mouseleave'));
    expect(targetEl.classList.contains('uk2-hidden')).toBeTrue();
  });

  it('should not throw error if target element is not found', () => {
    spyOn(directive['nativeElement'], 'querySelector').and.returnValue(null);
    const matRowEl = fixture.nativeElement.querySelector('mat-row');
    const checkbox = fixture.nativeElement.querySelector('input[type="checkbox"]') as HTMLInputElement;

    checkbox.click();
    matRowEl.dispatchEvent(new MouseEvent('mouseenter'));
    expect(() => matRowEl.dispatchEvent(new MouseEvent('mouseleave'))).not.toThrow();
  });
});

@Component({
  template: `
    <mat-table uk2Table [dataSource]="dataSource">
      <ng-container matColumnDef="checkbox" sticky>
        <mat-header-cell class="uk2-checkbox-column" *matHeaderCellDef> </mat-header-cell>
        <mat-cell class="uk2-checkbox-column" *matCellDef="let element">
          <mat-checkbox uk2Checkbox disableRipple [checked]="isRowSelected"></mat-checkbox>
        </mat-cell>
      </ng-container>
      <ng-container matColumnDef="propertyA">
        <mat-header-cell *matHeaderCellDef> Property A </mat-header-cell>
        <mat-cell *matCellDef="let element">
          <div class="target-cell">
            <span>{{ element.propertyA }}</span>
            <button uk2PrimaryButton disableRipple mat-raised-button uk2VisibleUntilSelectedAndHoverElement
              >Open</button
            >
          </div>
        </mat-cell>
      </ng-container>
      <ng-container matColumnDef="propertyB">
        <mat-header-cell *matHeaderCellDef> Property B </mat-header-cell>
        <mat-cell *matCellDef="let element">
          <div>
            {{ element.propertyB }}
          </div>
        </mat-cell>
      </ng-container>
      <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
      <mat-row *matRowDef="let row; columns: displayedColumns" uk2VisibleUntilSelectedAndHover></mat-row>
    </mat-table>
  `,
})
class TestComponent {
  @ViewChild(Uk2VisibleUntilSelectedAndHoverDirective) directive!: Uk2VisibleUntilSelectedAndHoverDirective;
  isRowSelected = false;
  displayedColumns: string[] = ['checkbox', 'propertyA', 'propertyB'];
  tableData: any[] = [
    {
      record: 1,
      propertyA: 'Lorem ',
      propertyB: 'Lorem Ipsum',
      propertyC: 'Lorem Ipsum',
      longColumn: 'Lorem Ipsum with more text to show the text behavior truncation ellipsis and word wrapping',
      amount: 1234.56,
    },
    {
      record: 2,
      propertyA: 'Lorem ',
      propertyB: 'Lorem Ipsum',
      propertyC: 'Lorem Ipsum',
      longColumn: 'Lorem Ipsum with more text to show the text behavior truncation ellipsis and word wrapping',
      amount: 1234.56,
    },
  ];
  dataSource = new MatTableDataSource<any>(this.tableData);
}
