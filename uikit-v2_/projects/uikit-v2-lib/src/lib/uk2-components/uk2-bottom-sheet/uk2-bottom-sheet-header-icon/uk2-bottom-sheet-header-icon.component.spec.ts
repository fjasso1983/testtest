import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { Uk2BottomSheetHeaderIconComponent } from './uk2-bottom-sheet-header-icon.component';

describe('Uk2BottomSheetHeaderIconComponent', () => {
  let component: Uk2BottomSheetHeaderIconComponent;
  let fixture: ComponentFixture<Uk2BottomSheetHeaderIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Uk2BottomSheetHeaderIconComponent],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(Uk2BottomSheetHeaderIconComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit navigateBackButton on click', () => {
    spyOn(component.navigateBackButton, 'emit');
    component.onClickBackButton();

    expect(component.navigateBackButton.emit).toHaveBeenCalled();
  });

  it('should emit close on click', () => {
    spyOn(component.close, 'emit');
    component.onClickCloseButton();

    expect(component.close.emit).toHaveBeenCalled();
  });
});
