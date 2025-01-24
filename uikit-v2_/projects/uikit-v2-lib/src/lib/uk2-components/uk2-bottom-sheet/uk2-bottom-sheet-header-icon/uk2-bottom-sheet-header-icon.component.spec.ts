import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

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

  it('should render title and description', () => {
    component.titleheadericon = 'this is the title';

    fixture.detectChanges();

    const header = fixture.debugElement.query(By.css('#uk2-bottom-sheet-header-title')).nativeElement as HTMLElement;
    const description = fixture.debugElement.query(By.css('#uk2-bottom-sheet-header-description'))
      .nativeElement as HTMLElement;

    expect(header.textContent).toBe('this is the title');
    expect(description.textContent).toBe('this is the description');
  });
});
