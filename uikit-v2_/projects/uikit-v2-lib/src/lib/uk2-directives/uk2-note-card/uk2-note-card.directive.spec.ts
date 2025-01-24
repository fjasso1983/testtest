import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

// TODO Replace legacy material components and update unit test
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Uk2NoteCardFontSizeEnum } from './enums';
import { Uk2NoteCardDirective } from './uk2-note-card.directive';

@Component({
  template: `
    <div>
      <mat-label>Enter your name</mat-label>
      <input id="noNoteCard" uk2NoteCard name="name" />
    </div>
    <!-- Large font -->

    <mat-card id="large-font" uk2NoteCard [uk2NoteCardFontSize]="largeFont" [uk2IsLoading]="isLoading">
      <mat-card-content>
        <label>
          Lorem ipsum: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at neque interdum integer lacus.
          At quis mi lacus odio auctor urna, orci.
        </label>
      </mat-card-content>
    </mat-card>

    <!-- Large font with checkbox-->

    <mat-card
      id="large-font-checkbox"
      uk2NoteCard
      [uk2NoteCardFontSize]="largeFont"
      [uk2IsLoading]="isLoading"
      [uk2NoteCardHasCheckbox]="true"
    >
      <mat-card-content>
        <div class="uk2-checkbox-container">
          <mat-checkbox color="primary" uk2Checkbox [uk2IsLoading]="isLoading"></mat-checkbox>
          <label>
            Lorem ipsum: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at neque interdum integer lacus.
            At quis mi lacus odio auctor urna, orci.
            <a uk2Anchor routerLink="not/existing/route">Hyperlink at end</a>
          </label>
        </div>
      </mat-card-content>
    </mat-card>

    <!-- Default font no skeleton-->

    <mat-card id="default-font" uk2NoteCard [uk2IsLoading]="false">
      <mat-card-content>
        <label>
          Lorem ipsum: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at neque interdum integer lacus.
          At quis mi lacus odio auctor urna, orci.
        </label>
      </mat-card-content>
    </mat-card>

    <!-- Small font -->

    <mat-card id="small-font" uk2NoteCard [uk2NoteCardFontSize]="smallFont" [uk2IsLoading]="isLoading">
      <mat-card-content>
        <label>
          Lorem ipsum: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at neque interdum integer lacus.
          At quis mi lacus odio auctor urna, orci.
        </label>
      </mat-card-content>
    </mat-card>

    <!-- Small font with checkbox-->
    <mat-card
      id="small-font-checkbox"
      uk2NoteCard
      [uk2NoteCardFontSize]="smallFont"
      [uk2IsLoading]="isLoading"
      [uk2NoteCardHasCheckbox]="true"
    >
      <mat-card-content>
        <div class="uk2-checkbox-container">
          <mat-checkbox color="primary" uk2Checkbox [uk2IsLoading]="isLoading"></mat-checkbox>
          <label>
            Lorem ipsum: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at neque interdum integer lacus.
            At quis mi lacus odio auctor urna, orci.
            <a uk2Anchor routerLink="not/existing/route">Hyperlink at end</a>
          </label>
        </div>
      </mat-card-content>
    </mat-card>
    <!-- Skeleton card-->

    <mat-card id="skeleton-card" uk2NoteCard [uk2IsLoading]="true">
      <mat-card-content>
        <label>
          Lorem ipsum: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at neque interdum integer lacus.
          At quis mi lacus odio auctor urna, orci.
        </label>
      </mat-card-content>
    </mat-card>
  `,
})
class TestComponent {
  constructor() {}
  isLoading = true;
  hasCheckbox = false;
  smallFont = Uk2NoteCardFontSizeEnum.small;
  largeFont = Uk2NoteCardFontSizeEnum.large;
}

describe('Uk2NoteCardDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, Uk2NoteCardDirective],
      imports: [BrowserAnimationsModule, MatCheckboxModule, MatCardModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  afterEach(() => {
    TestBed.resetTestingModule();
  });

  //DOM Testing
  it("should not be applied on elements that don't have matCard directive", () => {
    const input = fixture.elementRef.nativeElement.querySelector('#noNoteCard');

    expect(input.classList.contains('uk2-note-card-small')).toBeFalse();
  });
  it('should render mat card with large font size', () => {
    let containerElement: HTMLElement = fixture.nativeElement;
    let matCardElement: HTMLElement = containerElement.querySelector('#large-font') ?? new HTMLElement();

    fixture.detectChanges();

    expect(matCardElement.classList.contains('uk2-note-card-large')).toBeTrue();
  });
  it('should render mat card with large font size and checkbox', () => {
    let containerElement: HTMLElement = fixture.nativeElement;
    let matCardElement: HTMLElement = containerElement.querySelector('#large-font-checkbox') ?? new HTMLElement();

    fixture.detectChanges();

    expect(matCardElement.classList.contains('uk2-note-card-large')).toBeTrue();
  });
  it('should render mat card with small font size', () => {
    let containerElement: HTMLElement = fixture.nativeElement;
    let matCardElement: HTMLElement = containerElement.querySelector('#small-font') ?? new HTMLElement();

    fixture.detectChanges();

    expect(matCardElement.classList.contains('uk2-note-card-small')).toBeTrue();
  });
  it('should render mat card with small font size and checkbox', () => {
    let containerElement: HTMLElement = fixture.nativeElement;
    let matCardElement: HTMLElement = containerElement.querySelector('#small-font-checkbox') ?? new HTMLElement();

    const checkbox = matCardElement.querySelector('.mat-checkbox');
    fixture.detectChanges();
    expect(checkbox).toBeTruthy();
    expect(matCardElement.classList.contains('uk2-note-card-small')).toBeTrue();
  });
  it('should render mat card with default font size and no skeleton', () => {
    let containerElement: HTMLElement = fixture.nativeElement;
    let matCardElement: HTMLElement = containerElement.querySelector('#default-font') ?? new HTMLElement();
    fixture.detectChanges();

    expect(matCardElement.classList.contains('uk2-note-card-small')).toBeTrue();
  });
  it('should render mat card with skeleton state', () => {
    fixture.detectChanges();
    component.isLoading = true;
    const card = fixture.debugElement.nativeElement.querySelector('mat-card');
    const skeletonDiv = card.previousElementSibling;
    expect(skeletonDiv).toBeTruthy();
    expect(skeletonDiv.classList.contains('uk2-skeleton-note-card-no-checkbox')).toBeTrue();
    expect(skeletonDiv.classList.contains('uk2-hidden')).toBeFalse();
  });
});
