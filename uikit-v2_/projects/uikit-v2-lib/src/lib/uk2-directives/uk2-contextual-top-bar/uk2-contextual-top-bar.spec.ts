import { Component, ElementRef, NO_ERRORS_SCHEMA, ViewChild, Renderer2 } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule, DOCUMENT } from '@angular/common';
import { BrowserModule, By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconTestingModule } from '@angular/material/icon/testing';

import { Uk2ContextualTopBarDirective } from './uk2-contextual-top-bar.directive';
import { Uk2DestroyService } from '../../uk2-internal-utils';

@Component({
  template: `
    <mat-toolbar
      uk2ContextualTopBar
      [uk2IsLoading]="uk2IsLoading"
      [uk2IsSticky]="isSticky"
      [uk2HasTopBar]="hasTopBar"
      class="uk2-contextual-top-bar"
    >
      <mat-toolbar-row class="uk2-contextual-top-bar-button-section">
        <button disableRipple mat-button title="Back">
          <mat-icon [svgIcon]="arrowBackIcon"></mat-icon>
        </button>
      </mat-toolbar-row>

      <mat-toolbar-row class="uk2-contextual-top-bar-header-section">
        <div class="uk2-contextual-top-bar-header-section-title-container">
          <h2>Title</h2>
        </div>
        <div class="uk2-contextual-top-bar-header-section-breadcrumb-container"></div>
      </mat-toolbar-row>

      <mat-toolbar-row class="uk2-contextual-top-bar-contextual-section"></mat-toolbar-row>
    </mat-toolbar>
    <div class="uk2-brand-top-bar" style="height: 300px; width: 100%">
      <div class="uk2-brand-top-bar-logo-bar">
        <img src="" alt="top-bar-img" class="uk2-brand-top-bar-logo" />
      </div>
    </div>
  `,
})
class TestComponent {
  uk2IsLoading = false;
  isSticky = false;
  hasTopBar = false;
  @ViewChild(Uk2ContextualTopBarDirective, { static: true }) contextualTopBarDirective!: Uk2ContextualTopBarDirective;
}

describe('Uk2ContextualTopBarDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let imageOnload: any;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, Uk2ContextualTopBarDirective],
      imports: [CommonModule, BrowserModule, RouterModule, MatToolbarModule, MatButtonModule, MatIconTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    TestBed.inject(DOCUMENT);
    component = fixture.componentInstance;
  });

  //DOM Testing
  it('should render a mat-toolbar with appropriated class name', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let matToolbarElement: HTMLElement = containerElement.querySelector('mat-toolbar') ?? new HTMLElement();

    // act
    fixture.detectChanges();

    // assert
    expect(matToolbarElement.classList.contains('uk2-contextual-top-bar')).toBeTrue();
  });

  it('should render a mat-toolbar sticky with appropriated class name', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let matToolbarElement: HTMLElement = containerElement.querySelector('mat-toolbar') ?? new HTMLElement();

    // act
    component.isSticky = true;
    component.hasTopBar = false;
    fixture.detectChanges();

    // assert
    expect(matToolbarElement.classList.contains('uk2-contextual-top-bar-fixed')).toBeTrue();
  });

  it('should render a mat-toolbar skeleton state with appropriated class name', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let matToolbarElement: HTMLElement = containerElement.querySelector('mat-toolbar') ?? new HTMLElement();

    // act
    component.uk2IsLoading = true;
    fixture.detectChanges();

    // assert
    expect(matToolbarElement.classList.contains('uk2-contextual-top-bar-skeleton-color')).toBeTrue();
  });

  it('should call setTopWhenIsSticky() after image complete loading', (done: DoneFn) => {
    trackImageOnload();
    fixture.detectChanges();
    const imageElement = fixture.debugElement.query(
      By.css('.uk2-brand-top-bar .uk2-brand-top-bar-logo-bar img.uk2-brand-top-bar-logo')
    ).nativeElement as HTMLImageElement;
    const setTopWhenIsStickySpy = spyOn(component.contextualTopBarDirective, 'setTopWhenIsSticky');
    imageElement.src =
      'https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../releases/preview/2013/png/iconmonstr-smiley-16.png';

    imageOnload();

    expect(setTopWhenIsStickySpy).toHaveBeenCalledTimes(1);
    done();
  });

  it('should have a Uk2ContextualTopBarDirective defined', () => {
    expect(component.contextualTopBarDirective).toBeDefined();
  });

  function trackImageOnload() {
    Object.defineProperty(Image.prototype, 'onload', {
      get: function () {
        return this._onload;
      },
      set: function (fn) {
        imageOnload = fn;
        this._onload = fn;
      },
    });
  }
});

describe('Uk2ContextualTopBarDirective', () => {
  let directive: Uk2ContextualTopBarDirective;
  let elementRef: ElementRef<HTMLElement>;
  let renderer: Renderer2;

  beforeEach(() => {
    elementRef = new ElementRef(document.createElement('div'));
    directive = new Uk2ContextualTopBarDirective(elementRef, document, new Uk2DestroyService(), renderer);
  });

  it('should set listener on init', () => {
    // @ts-ignore
    const listenResizeEventSpy = spyOn(directive, 'listenResizeEvent');
    directive.ngOnInit();
    expect(listenResizeEventSpy).toHaveBeenCalled();
  });

  it('should remove "uk2-contextual-top-bar-fixed" from element when sticky behavior is set to true and window is resized to mobile device', done => {
    window.innerWidth = 375;
    directive.uk2IsSticky = true;
    directive.uk2HasTopBar = true;
    directive.ngOnInit();
    // @ts-ignore
    const removeClassSpy = spyOn(elementRef.nativeElement.classList, 'remove');
    setTimeout(() => {
      expect(removeClassSpy).toHaveBeenCalledWith('uk2-contextual-top-bar-fixed');
      done();
    }, 350);
  });

  it('should add "uk2-contextual-top-bar-fixed" from element when sticky behavior is set to true and window is resized to desktop device', done => {
    window.innerWidth = 1024;
    directive.uk2HasTopBar = true;
    directive.uk2IsSticky = true;
    directive.ngOnInit();
    // @ts-ignore
    const addClassSpy = spyOn(elementRef.nativeElement.classList, 'add');
    setTimeout(() => {
      expect(addClassSpy).toHaveBeenCalledWith('uk2-contextual-top-bar-fixed');
      done();
    }, 350);
  });
});
