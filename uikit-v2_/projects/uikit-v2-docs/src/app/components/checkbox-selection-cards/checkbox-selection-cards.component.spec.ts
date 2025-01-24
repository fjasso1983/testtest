import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxSelectionCardsComponent } from './checkbox-selection-cards.component';

describe('CheckboxSelectionCardsComponent', () => {
  let component: CheckboxSelectionCardsComponent;
  let fixture: ComponentFixture<CheckboxSelectionCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckboxSelectionCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxSelectionCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
