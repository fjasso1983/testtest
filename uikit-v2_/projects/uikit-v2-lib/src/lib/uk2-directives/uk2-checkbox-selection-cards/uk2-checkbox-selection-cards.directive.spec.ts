import { HttpClientModule } from '@angular/common/http';
import { Component, NO_ERRORS_SCHEMA, SimpleChange, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconTestingModule } from '@angular/material/icon/testing';

import { MATERIAL_CLASSES } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';

import { Uk2CheckboxSelectionCardsDirective } from './uk2-checkbox-selection-cards.directive';
import { Uk2IconRegistryService } from '../../uk2-services/uk2-icon-registry/uk2-icon-registry.service';

@Component({
  template: `
    <div>
      <br />
      <h1>Single option</h1>
      <br />
      <mat-selection-list
        id="singleOption"
        uk2CheckboxSelectionCards
        disableRipple
        [uk2IsLoading]="isLoading"
        [multiple]="false"
        #singleOption
      >
        <mat-list-option *ngFor="let shoe of typesOfShoes; index as i" [value]="shoe">
          <div class="uk2-checkbox-selection-cards-icon-container">
            <mat-icon [svgIcon]="'uk2-mono-piggy'"></mat-icon>
          </div>
          <div class="uk2-checkbox-selection-cards-text-container">
            <label>{{ shoe }} - Change Skeleton Mode - Change Skeleton Mode- Change Skeleton Mode</label>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </mat-list-option>
      </mat-selection-list>
      <br />
      <h1>Multiple option</h1>
      <br />
      <mat-selection-list
        id="multipleOption"
        uk2CheckboxSelectionCards
        disableRipple
        [uk2IsLoading]="isLoading"
        #multipleOption
      >
        <mat-list-option *ngFor="let shoe of typesOfShoes; index as i">
          <div class="uk2-checkbox-selection-cards-icon-container">
            <mat-icon [svgIcon]="'uk2-color-piggy'"></mat-icon>
          </div>
          <div class="uk2-checkbox-selection-cards-text-container">
            <label>{{ shoe }}</label>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </mat-list-option>
      </mat-selection-list>
    </div>
  `,
})
class CheckboxSelectionCardsTestComponent {
  @ViewChild(Uk2CheckboxSelectionCardsDirective) uk2CheckboxSelectionCards!: Uk2CheckboxSelectionCardsDirective;

  constructor() {}
  isLoading = true;

  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
}

describe('Uk2CheckboxSelectionCardsDirective', () => {
  let component: CheckboxSelectionCardsTestComponent;
  let fixture: ComponentFixture<CheckboxSelectionCardsTestComponent>;
  let service: Uk2IconRegistryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckboxSelectionCardsTestComponent, Uk2CheckboxSelectionCardsDirective],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatToolbarModule,
        MatButtonModule,
        MatListModule,
        MatCheckboxModule,
        BrowserAnimationsModule,
        MatIconTestingModule,
        HttpClientModule,
      ],
      providers: [Uk2IconRegistryService],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(Uk2IconRegistryService);
    service.registerAllCategories();
    fixture = TestBed.createComponent(CheckboxSelectionCardsTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should be applied on mat-selection-list elements', () => {
    const card = fixture.debugElement.nativeElement.querySelector('mat-selection-list');
    expect(card.classList.contains('uk2-checkbox-selection-cards')).toBeTrue();
  });

  it('should change class "uk2-hide-radio-section" if property uk2IsRadio change', () => {
    const list = fixture.debugElement.nativeElement.querySelector('mat-selection-list');

    expect(list.classList.contains('uk2-hide-radio-section')).toBeTrue();

    component.uk2CheckboxSelectionCards.uk2IsRadio = true;
    component.uk2CheckboxSelectionCards.ngOnChanges({
      uk2IsRadio: new SimpleChange(false, true, false),
    });
    fixture.detectChanges();

    expect(list.classList.contains('uk2-hide-radio-section')).toBeFalse();
  });

  it('should apply right chevron icon when multiple option is FALSE', () => {
    component.uk2CheckboxSelectionCards['addChevronIcon']();
    const card = fixture.debugElement.query(By.css('#singleOption'));
    const icon = card.nativeElement.querySelector('.uk2-checkbox-selection-cards-single-option-icon');
    fixture.detectChanges();
    expect(icon).toBeTruthy();
    const cardMultiple = fixture.debugElement.query(By.css('#multipleOption'));
    const iconMultiple = cardMultiple.nativeElement.querySelector('.uk2-checkbox-selection-cards-single-option-icon');
    fixture.detectChanges();
    expect(iconMultiple).toBeFalsy();
  });

  it('should apply right pseudo checkbox when multiple option is TRUE', () => {
    const cardMultiple = fixture.debugElement.query(By.css('#multipleOption'));
    const checkBoxMultiple = cardMultiple.nativeElement.querySelector('.mdc-checkbox');
    fixture.detectChanges();
    expect(checkBoxMultiple).toBeTruthy();
  });

  it('should apply mat-list-single-selected-option class if option is selected', () => {
    const card = fixture.debugElement.query(By.css('#singleOption'));
    const option = card.nativeElement.querySelector(`.${MATERIAL_CLASSES.matSelectionListOption}`);
    expect(option.classList.contains('mat-list-single-selected-option')).toBeFalse();
    option.setAttribute('aria-selected', true);
    option.click();
    fixture.detectChanges();
    expect(option.classList.contains('mat-list-single-selected-option')).toBeTrue();

    const cardMultiple = fixture.debugElement.query(By.css('#multipleOption'));
    const optionMultiple = cardMultiple.nativeElement.querySelector(`.${MATERIAL_CLASSES.matSelectionListOption}`);
    expect(optionMultiple.classList.contains('mat-list-single-selected-option')).toBeFalse();
    optionMultiple.setAttribute('aria-selected', true);
    optionMultiple.click();
    fixture.detectChanges();
    expect(optionMultiple.classList.contains('mat-list-single-selected-option')).toBeTrue();
  });

  it('should be exist a element with class uk2-checkbox-selection-cards-skeleton class && with uk2-hidden when uk2isLoading = FALSE', () => {
    component.isLoading = false;
    const card = fixture.debugElement.nativeElement.querySelector('mat-selection-list');
    const skeletonDiv = card.previousElementSibling;
    fixture.detectChanges();
    expect(skeletonDiv).toBeTruthy();
    expect(skeletonDiv.classList.contains('uk2-checkbox-selection-cards-skeleton')).toBeTrue();
    expect(skeletonDiv.classList.contains('uk2-hidden')).toBeTrue();
  });

  it('should be exist a element with class uk2-checkbox-selection-cards-skeleton class && without uk2-hidden when uk2isLoading = TRUE', () => {
    component.isLoading = true;
    const card = fixture.debugElement.nativeElement.querySelector('mat-selection-list');
    const skeletonDiv = card.previousElementSibling;
    fixture.detectChanges();
    expect(skeletonDiv).toBeTruthy();
    expect(skeletonDiv.classList.contains('uk2-checkbox-selection-cards-skeleton')).toBeTrue();
    expect(skeletonDiv.classList.contains('uk2-hidden')).toBeFalse();
  });
});
