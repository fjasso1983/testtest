import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Uk2PoweredByComponent } from './uk2-powered-by.component';

describe('Uk2PoweredByComponent', () => {
  let component: Uk2PoweredByComponent;
  let fixture: ComponentFixture<Uk2PoweredByComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Uk2PoweredByComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(Uk2PoweredByComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
