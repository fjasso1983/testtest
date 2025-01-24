import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatCardModule } from '@angular/material/card';

import { Uk2ProductTileDirective } from './uk2-product-tile-container.directive';
import { By } from '@angular/platform-browser';

describe('Uk2ProductTileContainerDirective', () => {
  let fixture: ComponentFixture<ProductTileTestComponent>;
  let component: ProductTileTestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductTileTestComponent, Uk2ProductTileDirective],
      imports: [MatCardModule],
    });

    fixture = TestBed.createComponent(ProductTileTestComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add class to element', () => {
    const element = fixture.debugElement.query(By.css('.uk2-product-tile')).nativeElement;
    expect(element).toBeTruthy();
  });

  it('should add loading class to element', () => {
    component.loading = true;
    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('.uk2-product-tile-loading')).nativeElement;
    expect(element).toBeTruthy();
  });

  it('should not remove class "uk2-content-overflow" when tile content doesn\'t reached the end of content', (done: DoneFn) => {
    // TestComponent is using long text to make the content overflow
    fixture.detectChanges();

    // Trigger scroll event a little
    const cardContent = fixture.debugElement.query(By.css('mat-card-content'));
    cardContent.nativeElement.scrollTop = 20;
    (cardContent.nativeElement as HTMLElement).dispatchEvent(new Event('scroll'));
    fixture.detectChanges();

    setTimeout(() => {
      const overflowClass = fixture.debugElement.query(By.css('.uk2-content-overflow'));
      expect(overflowClass).toBeTruthy();
      done();
    });
  });

  it('should add class "uk2-content-overflow" when tile content overflow', () => {
    // TestComponent has a fixed height and is using long text to make the content overflow
    fixture.detectChanges();

    const overflowClass = fixture.debugElement.query(By.css('.uk2-content-overflow'));
    expect(overflowClass).toBeTruthy();
  });

  it('should remove class "uk2-content-overflow" when tile content reach the end of content', (done: DoneFn) => {
    // Trigger scroll event to make the content reach the end
    const cardContent = fixture.debugElement.query(By.css('mat-card-content'));
    cardContent.nativeElement.scrollTop = 300;
    (cardContent.nativeElement as HTMLElement).dispatchEvent(new Event('scroll'));

    fixture.detectChanges();

    setTimeout(() => {
      const overflowClass = fixture.debugElement.query(By.css('.uk2-content-overflow'));
      expect(overflowClass).toBeNull();
      done();
    });
  });
});

describe('Uk2ProductTileContainerDirective - No Overflow', () => {
  let fixture: ComponentFixture<ProductTileTestComponentNoOverflow>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductTileTestComponentNoOverflow, Uk2ProductTileDirective],
      imports: [MatCardModule],
    });

    fixture = TestBed.createComponent(ProductTileTestComponentNoOverflow);
    fixture.detectChanges();
  });

  it('should not add class "uk2-content-overflow" when tile content doesn\'t overflow', () => {
    const overflowClass = fixture.debugElement.query(By.css('.uk2-content-overflow'));
    expect(overflowClass).toBeNull();
  });
});

describe('Uk2ProductTileContainerDirective - No Card Content', () => {
  let fixture: ComponentFixture<ProductTileTestComponentNoCardContent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductTileTestComponentNoCardContent, Uk2ProductTileDirective],
      imports: [MatCardModule],
    });

    fixture = TestBed.createComponent(ProductTileTestComponentNoCardContent);
    fixture.detectChanges();
  });

  it('should not add class "uk2-content-overflow" when there is no card content', () => {
    const overflowClass = fixture.debugElement.query(By.css('.uk2-content-overflow'));
    expect(overflowClass).toBeNull();
  });
});

@Component({
  selector: 'app-test-component',
  template: `
    <mat-card uk2ProductTile [uk2IsLoading]="loading" style="height: 200px;">
      <mat-card-header>
        <mat-card-title>Shiba Inu</mat-card-title>
        <mat-card-subtitle>Dog Breed</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <p>{{ longText }}</p>
        <p>{{ longText }}</p>
        <p>{{ longText }}</p>
        <p>{{ longText }}</p>
        <p>{{ longText }}</p>
        <p>{{ longText }}</p>
        <p>{{ longText }}</p>
      </mat-card-content>
      <mat-card-actions>
        <button mat-button>LIKE</button>
        <button mat-button>SHARE</button>
      </mat-card-actions>
    </mat-card>
  `,
  styleUrls: ['../../../../styles/uk2.scss'],
})
class ProductTileTestComponent {
  loading = false;

  longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc tincidunt fermentum.';
}

@Component({
  selector: 'app-test-component',
  template: `
    <mat-card uk2ProductTile>
      <mat-card-header>
        <mat-card-title>Shiba Inu</mat-card-title>
        <mat-card-subtitle>Dog Breed</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <p>{{ longText }}</p>
      </mat-card-content>
      <mat-card-actions>
        <button mat-button>LIKE</button>
        <button mat-button>SHARE</button>
      </mat-card-actions>
    </mat-card>
  `,
  styleUrls: ['../../../../styles/uk2.scss'],
})
class ProductTileTestComponentNoOverflow {
  longText = 'Lorem ipsum dolor sit amet';
}

@Component({
  selector: 'app-test-component',
  template: `
    <mat-card uk2ProductTile>
      <mat-card-header>
        <mat-card-title>Shiba Inu</mat-card-title>
        <mat-card-subtitle>Dog Breed</mat-card-subtitle>
      </mat-card-header>
      <mat-card-actions>
        <button mat-button>LIKE</button>
        <button mat-button>SHARE</button>
      </mat-card-actions>
    </mat-card>
  `,
  styleUrls: ['../../../../styles/uk2.scss'],
})
class ProductTileTestComponentNoCardContent {
  longText = 'Lorem ipsum dolor sit amet';
}
