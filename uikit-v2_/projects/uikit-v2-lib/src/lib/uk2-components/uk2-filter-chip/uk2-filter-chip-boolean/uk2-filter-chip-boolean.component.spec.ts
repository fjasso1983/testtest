import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatIconTestingModule } from '@angular/material/icon/testing';

import { Uk2FilterChipBooleanComponent } from './uk2-filter-chip-boolean.component';
import { Uk2FilterChipButtonModule } from '../uk2-filter-chip-button';
import { Uk2FilterChipLabelModule } from '../uk2-filter-chip-label';
import { Uk2FilterChipOverlayModule } from '../uk2-filter-chip-overlay';
import { Uk2FilterChipOverlayLabelModule } from '../uk2-filter-chip-overlay-label';
import { Uk2FilterChipOverlayOptionModule } from '../uk2-filter-chip-overlay-option';
import { Uk2FilterChipStateService } from '../../../uk2-services';
import { Component, Input, ViewChild } from '@angular/core';
import { Uk2ListItem } from '../../uk2-list-item';

describe('Uk2FilterChipBooleanComponent', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Uk2FilterChipBooleanComponent, TestComponent],
      imports: [
        CommonModule,
        Uk2FilterChipButtonModule,
        Uk2FilterChipLabelModule,
        Uk2FilterChipOverlayModule,
        Uk2FilterChipOverlayLabelModule,
        Uk2FilterChipOverlayOptionModule,
        DragDropModule,
        MatIconModule,
        MatIconTestingModule,
      ],
      providers: [Uk2FilterChipStateService],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a filter chip button with class uk2-filter-chip-boolean', () => {
    const chip = fixture.nativeElement.querySelector('.uk2-filter-chip-button');

    expect(chip).toBeTruthy();
  });

  it('should open overlay clicking button', () => {
    const chip = fixture.nativeElement.querySelector('.uk2-filter-chip-button');

    chip.click();
    fixture.detectChanges();

    const overlay = document.querySelector('.uk2-filter-chip-overlay');

    expect(overlay).toBeTruthy();
  });

  it('should not open overlay if button is loading', () => {
    component.uk2IsLoading = true;
    fixture.detectChanges();

    const chip = fixture.nativeElement.querySelector('uk2-filter-chip-button');
    const chipSkeleton = fixture.nativeElement.querySelector('.uk2-filter-chip-button-skeleton');
    chip.click();

    const overlay = document.querySelector('.uk2-filter-chip-overlay');
    expect(chipSkeleton).toBeDefined();
    expect(overlay).toBeNull();
  });

  it('should close overlay if overlay is already open and click outside', () => {
    const chip = fixture.nativeElement.querySelector('uk2-filter-chip-button');
    chip.click();

    let overlay = document.querySelector('.uk2-filter-chip-overlay');
    expect(overlay).toBeTruthy();

    document.querySelector('body')!.click();
    overlay = document.querySelector('.uk2-filter-chip-overlay');
    expect(overlay).toBeNull();
  });

  it('should set value in filter chip service if input uk2FilterValue is defined', () => {
    component.uk2ListItems = [{ value: 'Option 1', uk2IsSelected: true }];
    fixture.detectChanges();

    component.chip.ngAfterContentInit();

    expect(component.chip.uk2FilterChipStateService.getValue()).toBe('Option 1');
  });

  it('should call output deleteFilter when filter chip state emit a new value in filterDeleted$ subject', () => {
    spyOn(component.chip.uk2DeleteFilter, 'emit');
    component.chip.ngOnInit();

    component.chip.uk2FilterChipStateService.deleteFilter();
    expect(component.chip.uk2DeleteFilter.emit).toHaveBeenCalled();
  });

  it('should call state service methods when input changes', () => {
    spyOn(component.chip.uk2FilterChipStateService, 'setIdentifier');
    spyOn(component.chip.uk2FilterChipStateService, 'setConditional');
    spyOn(component.chip.uk2FilterChipStateService, 'setOverlayMinWidth');
    spyOn(component.chip.uk2FilterChipStateService, 'setValue');
    spyOn(component.chip.uk2FilterChipStateService, 'setShowClearSelection');

    component.uk2Identifier = 'Test 2';
    component.uk2Conditions = [{ buttonLabel: 'Is', label: 'Is' }];
    component.uk2OverlayMinWidth = '100px';
    component.uk2ListItems = [
      { value: 'Option 1', uk2IsSelected: true },
      { value: 'Option 2', uk2IsSelected: false },
    ];
    fixture.detectChanges();
    component.showClearSelection = false;
    fixture.detectChanges();

    component.chip.ngAfterContentInit();

    expect(component.chip.uk2FilterChipStateService.setIdentifier).toHaveBeenCalledWith('Test 2');
    expect(component.chip.uk2FilterChipStateService.setConditional).toHaveBeenCalledWith({
      buttonLabel: 'Is',
      label: 'Is',
    });
    expect(component.chip.uk2FilterChipStateService.setOverlayMinWidth).toHaveBeenCalledWith('100px');
    expect(component.chip.uk2FilterChipStateService.setValue).toHaveBeenCalledWith('Option 1');
    expect(component.chip.uk2FilterChipStateService.setShowClearSelection).toHaveBeenCalledWith(false);
  });

  it('should close overlay when options are not multiple and are clicked', () => {
    component.uk2Conditions = [
      { buttonLabel: 'Is', label: 'Is' },
      { buttonLabel: 'Is not', label: 'Not' },
    ];
    component.uk2ListItems = [
      { value: 'Option 1', uk2IsSelected: false },
      { value: 'Option 2', uk2IsSelected: false },
      { value: 'Option 3', uk2IsSelected: false },
    ];
    component.uk2Identifier = 'Test';

    component.chip.openOverlay();
    fixture.detectChanges();

    const options = document.querySelectorAll('.uk2-filter-chip-option') as any;

    options[0].click();

    const overlay = document.querySelector('.uk2-filter-chip-overlay');
    expect(overlay).toBeNull();
  });

  it('should emit output uk2FilterValueChanges when options are clicked', () => {
    spyOn(component.chip.uk2FilterValueChanges, 'emit');
    component.uk2Conditions = [
      { buttonLabel: 'Is', label: 'Is' },
      { buttonLabel: 'Is not', label: 'Not' },
    ];
    component.uk2ListItems = [
      { value: 'Option 1', uk2IsSelected: false },
      { value: 'Option 2', uk2IsSelected: false },
      { value: 'Option 3', uk2IsSelected: false },
    ];
    component.uk2Identifier = 'Test';

    component.chip.ngOnChanges({ uk2Identifier: { currentValue: 'Test' } } as any);
    fixture.detectChanges();
    component.chip.openOverlay();
    fixture.detectChanges();

    const options = document.querySelectorAll('.uk2-filter-chip-option') as any;

    options[0].click();

    expect(component.chip.uk2FilterValueChanges.emit).toHaveBeenCalledWith({
      value: 'Option 1',
      conditional: { buttonLabel: 'Is', label: 'Is' },
      identifier: 'Test',
    });
  });

  it('should emit output uk2FilterValueChanges when uk2IsMultiple is true and options are clicked', () => {
    spyOn(component.chip.uk2FilterValueChanges, 'emit');
    component.uk2IsMultiple = true;
    component.uk2Conditions = [
      { buttonLabel: 'Is', label: 'Is' },
      { buttonLabel: 'Is not', label: 'Not' },
    ];
    component.uk2ListItems = [
      { value: 'Option 1', uk2IsSelected: false },
      { value: 'Option 2', uk2IsSelected: false },
      { value: 'Option 3', uk2IsSelected: false },
    ];
    component.uk2Identifier = 'Test';
    fixture.detectChanges();

    component.chip.openOverlay();
    fixture.detectChanges();

    const options = document.querySelectorAll('.uk2-filter-chip-option') as any;

    options[0].click();
    options[1].click();

    expect(component.chip.uk2FilterValueChanges.emit).toHaveBeenCalledWith({
      value: ['Option 1', 'Option 2'],
      conditional: { buttonLabel: 'Is', label: 'Is' },
      identifier: 'Test',
    });
  });

  it('should clear value when clearValue method is called', () => {
    component.chip.uk2FilterChipStateService.setValue('Option 1');
    component.chip.clearValue();

    expect(component.chip.uk2FilterChipStateService.getValue()).toBe('');
  });

  it('should close overlay when user clicks on clear selection and uk2CloseOverlayAfterClear is true', () => {
    component.chip.uk2CloseOverlayAfterClear = true;
    component.chip.uk2FilterChipStateService.setValue('Option 1');

    component.chip.ngOnChanges({ uk2CloseOverlayAfterClear: { currentValue: true } } as any);
    fixture.detectChanges();
    component.chip.openOverlay();
    fixture.detectChanges();

    const clearSelectionEl = document.querySelector('.uk2-filter-chip-overlay-clear-selection') as any;
    clearSelectionEl.click();

    const overlay = document.querySelector('.uk2-filter-chip-overlay');
    expect(overlay).toBeNull();
  });

  it('should maintain overlay open when user clicks on clear selection and uk2CloseOverlayAfterClear is false', () => {
    component.chip.uk2CloseOverlayAfterClear = false;
    component.chip.uk2FilterChipStateService.setValue('Option 1');

    component.chip.ngOnChanges({ uk2CloseOverlayAfterClear: { currentValue: false } } as any);
    fixture.detectChanges();
    component.chip.openOverlay();
    fixture.detectChanges();

    const clearSelectionEl = document.querySelector('.uk2-filter-chip-overlay-clear-selection') as any;
    clearSelectionEl.click();

    const overlay = document.querySelector('.uk2-filter-chip-overlay');
    expect(overlay).toBeDefined();
  });

  it('should call setMaxWidth method when uk2FilterChipMaxWidth input changes', () => {
    spyOn(component.chip.uk2FilterChipStateService, 'setFilterChipMaxWidth');

    component.uk2FilterChipMaxWidth = 100;
    fixture.detectChanges();

    expect(component.chip.uk2FilterChipStateService.setFilterChipMaxWidth).toHaveBeenCalledWith(100);
  });
});

@Component({
  template: `
    <uk2-filter-chip-boolean
      [uk2IsLoading]="uk2IsLoading"
      [uk2FilterValue]="uk2FilterValue"
      [uk2Conditions]="uk2Conditions"
      [uk2CloseOverlayAfterClear]="uk2CloseOverlayAfterClear"
      [uk2IsMultiple]="uk2IsMultiple"
      [uk2FilterChipMaxWidth]="uk2FilterChipMaxWidth"
      [uk2OverlayMinWidth]="uk2OverlayMinWidth"
      [uk2Identifier]="uk2Identifier"
      [uk2ShowClearSelection]="showClearSelection"
    >
      <uk2-filter-chip-overlay-option
        *ngFor="let option of uk2ListItems"
        [uk2Value]="option.value"
        [uk2Multiple]="uk2IsMultiple"
        [uk2IsDisabled]="option.uk2IsLoading || option.uk2IsDisabled || false"
        [uk2Selected]="option.uk2IsSelected"
        #overlayOption="uk2FilterChipOption"
        (click)="chip.closeOverlay()"
      >
        {{ option.value }}
      </uk2-filter-chip-overlay-option>
    </uk2-filter-chip-boolean>
  `,
})
class TestComponent {
  @ViewChild(Uk2FilterChipBooleanComponent) chip!: Uk2FilterChipBooleanComponent;
  @Input() uk2ListItems: Uk2ListItem[] = [
    { value: 'Option 1', uk2IsSelected: false },
    { value: 'Option 2', uk2IsSelected: false },
    { value: 'Option 3', uk2IsSelected: false },
  ];
  @Input() uk2Conditions = [{ buttonLabel: 'Is', label: 'Is' }];
  @Input() uk2OverlayMinWidth = 'auto';
  @Input() uk2IsMultiple = false;
  @Input() uk2FilterChipMaxWidth = 327;
  @Input() uk2Identifier = 'Test';
  @Input() uk2IsLoading = false;
  @Input() showClearSelection = true;
}
