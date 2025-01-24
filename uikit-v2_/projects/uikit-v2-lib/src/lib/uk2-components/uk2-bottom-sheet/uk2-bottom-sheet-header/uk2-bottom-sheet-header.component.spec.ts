import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { Uk2BottomSheetHeaderComponent } from './uk2-bottom-sheet-header.component';

describe('Uk2BottomSheetHeaderComponent', () => {
  let component: Uk2BottomSheetHeaderComponent;
  let fixture: ComponentFixture<Uk2BottomSheetHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Uk2BottomSheetHeaderComponent],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(Uk2BottomSheetHeaderComponent);
    component = fixture.componentInstance;
  });

  it('should render title and description', () => {
    component.description = 'this is the description';
    component.title = 'this is the title';

    fixture.detectChanges();

    const header = fixture.debugElement.query(By.css('#uk2-bottom-sheet-header-title')).nativeElement as HTMLElement;
    const description = fixture.debugElement.query(By.css('#uk2-bottom-sheet-header-description'))
      .nativeElement as HTMLElement;

    expect(header.textContent).toBe('this is the title');
    expect(description.textContent).toBe('this is the description');
  });
});
