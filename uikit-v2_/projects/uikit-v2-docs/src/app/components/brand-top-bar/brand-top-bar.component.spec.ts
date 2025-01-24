import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandTopBarComponent } from './brand-top-bar.component';

describe('BrandTopBarComponent', () => {
  let component: BrandTopBarComponent;
  let fixture: ComponentFixture<BrandTopBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandTopBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandTopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
