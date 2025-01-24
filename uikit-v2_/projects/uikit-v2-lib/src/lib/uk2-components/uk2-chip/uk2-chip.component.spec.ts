import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Uk2ChipComponent } from './uk2-chip.component';
import { ChangeDetectorRef, Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';
import { Uk2ChipSizesEnum, Uk2ChipTypesEnum, Uk2Tier1NavigationEnum } from '@axos/uikit-v2-lib';

describe('Uk2ChipComponent', () => {
  let component: Uk2ChipComponent;
  let fixture: ComponentFixture<Uk2ChipComponent>;
  let changeDetectorRef: ChangeDetectorRef;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Uk2ChipComponent],
      imports: [CommonModule],
      providers: [],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(Uk2ChipComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display a leading icon', () => {
    component.uk2ChipLeadingIcon = Uk2Tier1NavigationEnum.x;
    fixture.detectChanges();

    const iconElement = fixture.debugElement.query(By.css('.uk2-chip-leading-icon'));
    expect(iconElement).toBeTruthy();
  });

  it('should display a trailing icon', () => {
    component.uk2ChipTrailingIcon = Uk2Tier1NavigationEnum.x;
    fixture.detectChanges();

    const iconElement = fixture.debugElement.query(By.css('.uk2-chip-trailing-icon'));
    expect(iconElement).toBeTruthy();
  });

  it('should set a skeleton state', () => {
    component.uk2IsLoading = true;
    fixture.detectChanges();

    const chipElement = fixture.debugElement.query(By.css('.uk2-chip'));
    expect(chipElement.classes['uk2-loading-chip']).toBeTrue();
  });

  it('should set a custom CSS class to the chip', () => {
    component.uk2ChipClass = 'custom-css-class';
    fixture.detectChanges();

    const chipElement = fixture.debugElement.query(By.css('.uk2-chip'));
    expect(chipElement.classes['custom-css-class']).toBeTrue();
  });

  it('should set the correct CSS border class when uk2ShowBorder is true', () => {
    component.uk2ShowBorder = true;
    fixture.detectChanges();

    const chipElement = fixture.debugElement.query(By.css('.uk2-chip'));
    expect(chipElement.classes['uk2-bordered-chip']).toBeTrue();
  });

  it('should set the correct CSS active class when uk2IsActive is set to true', () => {
    component.uk2IsActive = true;
    fixture.detectChanges();

    const chipElement = fixture.debugElement.query(By.css('.uk2-chip'));
    expect(chipElement.classes['uk2-active-chip']).toBeTrue();
  });

  it('should set the correct CSS hover class when uk2ChipClick has a listener', () => {
    component.uk2ChipClick.subscribe(); //Sets a listener

    fixture.detectChanges();

    const chipElement = fixture.debugElement.query(By.css('.uk2-chip'));
    expect(chipElement.classes['uk2-hover-chip']).toBeTrue();
  });

  it('should set the correct CSS disabled class when uk2IsDisabled is set to true', () => {
    component.uk2IsDisabled = true;

    fixture.detectChanges();

    const chipElement = fixture.debugElement.query(By.css('.uk2-chip'));
    expect(chipElement.classes['uk2-disabled-chip']).toBeTrue();
  });

  it('should set the correct size CSS classes', () => {
    changeDetectorRef = fixture.debugElement.injector.get(ChangeDetectorRef);
    component.uk2ChipSize = Uk2ChipSizesEnum.extraSmall;
    changeDetectorRef.detectChanges();
    fixture.detectChanges();

    let chipElement = fixture.debugElement.query(By.css('.uk2-chip'));
    expect(chipElement.classes['uk2-chip-size-xs']).toBeTrue();

    component.uk2ChipSize = Uk2ChipSizesEnum.small;
    changeDetectorRef.detectChanges();

    chipElement = fixture.debugElement.query(By.css('.uk2-chip'));
    expect(chipElement.classes['uk2-chip-size-sm']).toBeTrue();

    component.uk2ChipSize = Uk2ChipSizesEnum.medium;
    changeDetectorRef.detectChanges();

    chipElement = fixture.debugElement.query(By.css('.uk2-chip'));
    expect(chipElement.classes['uk2-chip-size-med']).toBeTrue();

    component.uk2ChipSize = Uk2ChipSizesEnum.large;
    changeDetectorRef.detectChanges();

    chipElement = fixture.debugElement.query(By.css('.uk2-chip'));
    expect(chipElement.classes['uk2-chip-size-lrg']).toBeTrue();
  });

  it('should emit uk2ChipClick when the chip is clicked', () => {
    const emitSpy = spyOn(component.uk2ChipClick, 'emit');
    const chipElement = fixture.debugElement.query(By.css('.uk2-chip'));
    fixture.detectChanges();

    chipElement.nativeElement.click();

    expect(emitSpy).toHaveBeenCalled();
  });

  it('should not emit when the chip is clicked and its disabled', () => {
    const emitSpy = spyOn(component.uk2ChipClick, 'emit');
    const chipElement = fixture.debugElement.query(By.css('.uk2-chip'));
    component.uk2IsDisabled = true;
    fixture.detectChanges();

    chipElement.nativeElement.click();

    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('should return the correct class for large size and rounded type', () => {
    component.uk2ChipSize = Uk2ChipSizesEnum.large;
    component.uk2ChipType = Uk2ChipTypesEnum.rounded;
    fixture.detectChanges();

    const chipClass = component.getChipClass();
    expect(chipClass).toContain('uk2-chip-size-lrg');
    expect(chipClass).toContain('rounded');
  });

  it('should return the correct class for small size and square type', () => {
    component.uk2ChipSize = Uk2ChipSizesEnum.small;
    component.uk2ChipType = Uk2ChipTypesEnum.square;
    fixture.detectChanges();

    const chipClass = component.getChipClass();
    expect(chipClass).toContain('uk2-chip-size-sm');
    expect(chipClass).toContain('square');
  });
});

//Content projection test
@Component({
  template: `<uk2-chip>Inner text content</uk2-chip>`,
})
class TestChipProjectionComponent {}

describe('Uk2ChipComponent content', () => {
  let fixture: ComponentFixture<TestChipProjectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Uk2ChipComponent, TestChipProjectionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestChipProjectionComponent);
    fixture.detectChanges();
  });

  it('should show the correct text', () => {
    fixture.detectChanges();

    const spanElement = fixture.debugElement.query(By.css('.uk2-chip span'));
    expect(spanElement.nativeElement.textContent.trim()).toBe('Inner text content');
  });
});
