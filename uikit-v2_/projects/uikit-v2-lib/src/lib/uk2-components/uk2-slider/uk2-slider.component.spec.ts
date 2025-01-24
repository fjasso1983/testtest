import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { MatSliderModule } from '@angular/material/slider';

import { Uk2SliderComponent } from './uk2-slider.component';
import { By } from '@angular/platform-browser';

describe('Uk2SliderComponent', () => {
  let component: Uk2SliderComponent;
  let fixture: ComponentFixture<Uk2SliderComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Uk2SliderComponent],
      imports: [CommonModule, MatSliderModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(Uk2SliderComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    fixture.detectChanges();
  });

  it('should be created', () => {
    const skeletonEl = fixture.debugElement.query(By.css('.uk2-slider-skeleton'));

    expect(component).toBeDefined();
    expect(skeletonEl).toBeNull();
  });

  it('should emit current of slider value', (done: DoneFn) => {
    component.valueChange.subscribe(val => {
      expect(val).toEqual(10);

      done();
    });

    component.onValueChange(10);
  });

  it('should render min value text and max value text', () => {
    component.minValueLabel = 'Min';
    component.maxValueLabel = 'Max';

    fixture.detectChanges();

    const minText = fixture.debugElement.query(By.css('.uk2-slider-text-min')).nativeElement as HTMLElement;
    const maxText = fixture.debugElement.query(By.css('.uk2-slider-text-max')).nativeElement as HTMLElement;
    expect(minText.textContent).toEqual('Min');
    expect(maxText.textContent).toEqual('Max');
  });

  it('should toggle to skeleton state', () => {
    component.uk2IsLoading = true;

    fixture.detectChanges();

    const skeletonEl = fixture.debugElement.query(By.css('.uk2-slider-skeleton')).nativeElement as HTMLElement;
    expect(skeletonEl).not.toBeNull();
  });
});
