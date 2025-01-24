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

describe('Uk2FilterChipBooleanComponent', () => {
  let fixture: ComponentFixture<Uk2FilterChipBooleanComponent>;
  let component: Uk2FilterChipBooleanComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Uk2FilterChipBooleanComponent],
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

    fixture = TestBed.createComponent(Uk2FilterChipBooleanComponent);
    component = fixture.componentInstance;
    component.uk2Options = [
      { value: 'Option 1', selected: false },
      { value: 'Option 2', selected: false },
      { value: 'Option 3', selected: false },
    ];
    component.uk2Identifier = 'Test';
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
    chip.click();

    const overlay = document.querySelector('.uk2-filter-chip-overlay');
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
    component.uk2Options = [{ value: 'Option 1', selected: true }];

    component.ngOnChanges({ uk2Options: {} } as any);

    expect(component.uk2FilterChipStateService.getValue()).toBe('Option 1');
  });

  it('should call output deleteFilter when filter chip state emit a new value in filterDeleted$ subject', () => {
    spyOn(component.uk2DeleteFilter, 'emit');
    component.ngOnInit();

    component.uk2FilterChipStateService.deleteFilter();
    expect(component.uk2DeleteFilter.emit).toHaveBeenCalled();
  });

  it('should call state service methods when input changes', () => {
    spyOn(component.uk2FilterChipStateService, 'setIdentifier');
    spyOn(component.uk2FilterChipStateService, 'setConditional');
    spyOn(component.uk2FilterChipStateService, 'setOverlayMinWidth');
    spyOn(component.uk2FilterChipStateService, 'setValue');

    component.uk2Identifier = 'Test 2';
    component.uk2Conditions = [{ buttonLabel: 'Is', label: 'Is' }];
    component.uk2OverlayMinWidth = '100px';
    component.uk2Options = [
      { value: 'Option 1', selected: true },
      { value: 'Option 2', selected: false },
    ];

    component.ngOnChanges({
      uk2Identifier: { currentValue: component.uk2Identifier },
      uk2Conditions: { currentValue: component.uk2Conditions },
      uk2OverlayMinWidth: { currentValue: component.uk2OverlayMinWidth },
      uk2Options: { currentValue: component.uk2Options },
    } as any);

    expect(component.uk2FilterChipStateService.setIdentifier).toHaveBeenCalledWith('Test 2');
    expect(component.uk2FilterChipStateService.setConditional).toHaveBeenCalledWith({ buttonLabel: 'Is', label: 'Is' });
    expect(component.uk2FilterChipStateService.setOverlayMinWidth).toHaveBeenCalledWith('100px');
    expect(component.uk2FilterChipStateService.setValue).toHaveBeenCalledWith('Option 1');
  });

  it('should close overlay when options are not multiple and are clicked', () => {
    component.uk2Conditions = [
      { buttonLabel: 'Is', label: 'Is' },
      { buttonLabel: 'Is not', label: 'Not' },
    ];
    component.uk2Options = [
      { value: 'Option 1', selected: false },
      { value: 'Option 2', selected: false },
      { value: 'Option 3', selected: false },
    ];
    component.uk2Identifier = 'Test';

    component.openOverlay();
    fixture.detectChanges();

    const options = document.querySelectorAll('.uk2-filter-chip-option') as any;

    options[0].click();

    const overlay = document.querySelector('.uk2-filter-chip-overlay');
    expect(overlay).toBeNull();
  });

  it('should emit output uk2FilterValueChanges when options are clicked', () => {
    spyOn(component.uk2FilterValueChanges, 'emit');
    component.uk2Conditions = [
      { buttonLabel: 'Is', label: 'Is' },
      { buttonLabel: 'Is not', label: 'Not' },
    ];
    component.uk2Options = [
      { value: 'Option 1', selected: false },
      { value: 'Option 2', selected: false },
      { value: 'Option 3', selected: false },
    ];
    component.uk2Identifier = 'Test';

    component.ngOnChanges({ uk2Identifier: { currentValue: 'Test' } } as any);
    fixture.detectChanges();
    component.openOverlay();
    fixture.detectChanges();

    const options = document.querySelectorAll('.uk2-filter-chip-option') as any;

    options[0].click();

    expect(component.uk2FilterValueChanges.emit).toHaveBeenCalledWith({
      value: 'Option 1',
      conditional: { buttonLabel: 'Is', label: 'Is' },
      identifier: 'Test',
    });
  });

  it('should emit output uk2FilterValueChanges when uk2IsMultiple is true and options are clicked', () => {
    spyOn(component.uk2FilterValueChanges, 'emit');
    component.uk2IsMultiple = true;
    component.uk2Conditions = [
      { buttonLabel: 'Is', label: 'Is' },
      { buttonLabel: 'Is not', label: 'Not' },
    ];
    component.uk2Options = [
      { value: 'Option 1', selected: false },
      { value: 'Option 2', selected: false },
      { value: 'Option 3', selected: false },
    ];
    component.uk2Identifier = 'Test';

    component.ngOnChanges({ uk2Identifier: { currentValue: 'Test' } } as any);
    fixture.detectChanges();
    component.openOverlay();
    fixture.detectChanges();

    const options = document.querySelectorAll('.uk2-filter-chip-option') as any;

    options[0].click();
    options[1].click();

    expect(component.uk2FilterValueChanges.emit).toHaveBeenCalledWith({
      value: ['Option 1', 'Option 2'],
      conditional: { buttonLabel: 'Is', label: 'Is' },
      identifier: 'Test',
    });
  });

  it('should clear value when clearValue method is called', () => {
    component.uk2FilterChipStateService.setValue('Option 1');
    component.clearValue();

    expect(component.uk2FilterChipStateService.getValue()).toBe('');
  });
});
