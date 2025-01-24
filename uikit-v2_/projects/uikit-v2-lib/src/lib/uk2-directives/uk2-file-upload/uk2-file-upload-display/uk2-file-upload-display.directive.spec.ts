import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { Uk2File } from '../types';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Uk2FileUploadDisplayDirective } from './uk2-file-upload-display.directive';
import { By } from '@angular/platform-browser';
import { uk2FileUploadDisplayConstants } from './constants';

@Component({
  template: `<div
    id="fileUploadDisplay"
    uk2FileUploadDisplay
    [uk2File]="testFile"
    [uk2ShowPreview]="showPreview"
    [uk2IsLoading]="isLoading"
  >
    <div id="previewElement" uk2-file-upload-preview></div>
    <div id="barElement" uk2-file-upload-description-bar></div>
  </div>`,
})
class FileUploaderDisplayComponent {
  testFile = {
    fileContent: new File(['1234567890'], 'file-test.pdf', { type: 'application/pdf' }),
  } as Uk2File;
  isLoading = false;
  showPreview = false;
}

describe('Uk2FileUploadDisplayDirective', () => {
  let fixture: ComponentFixture<FileUploaderDisplayComponent>;
  let component: FileUploaderDisplayComponent;
  let directive: Uk2FileUploadDisplayDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FileUploaderDisplayComponent, Uk2FileUploadDisplayDirective],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(FileUploaderDisplayComponent);
    component = fixture.componentInstance;
    const directiveEl = fixture.debugElement.query(By.directive(Uk2FileUploadDisplayDirective));
    directive = directiveEl.injector.get(Uk2FileUploadDisplayDirective);
  });

  beforeEach(() => {
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should be created', () => {
    fixture.detectChanges();

    expect(directive).toBeTruthy();
  });

  it('should add uk2-file-upload-display-preview class to the preview element', () => {
    const previewElement = document.querySelector('#previewElement');

    expect(previewElement).toBeTruthy();
    expect(previewElement?.classList).toContain('uk2-file-upload-display-preview');
  });

  it('should add uk2-file-upload-display-info-bar class to the preview element', () => {
    const barElement = document.querySelector('#barElement');

    expect(barElement).toBeTruthy();
    expect(barElement?.classList).toContain('uk2-file-upload-display-info-bar');
  });

  it('should create the necesary elements for the skeleton state when intialized', () => {
    const skeletonContainerElement = fixture.debugElement.query(By.css('.uk2-file-uploader-skeleton')).nativeElement;
    const skeletonInfoBarElement = fixture.debugElement.query(By.css('.uk2-file-uploader-skeleton-bar')).nativeElement;
    const skeletonPreviewElement = fixture.debugElement.query(
      By.css('.uk2-file-uploader-skeleton-preview')
    ).nativeElement;

    expect(skeletonContainerElement).toBeTruthy();
    expect(skeletonInfoBarElement).toBeTruthy();
    expect(skeletonPreviewElement).toBeTruthy();
  });

  it('should add the skeleton state classes if uk2IsLoading is true', () => {
    component.isLoading = true;
    fixture.detectChanges();

    const fileUploadDisplayElement = fixture.debugElement.query(By.css('#fileUploadDisplay')).nativeElement;

    expect(directive.uk2IsLoading).toBeTrue();
    expect(fileUploadDisplayElement.classList).toContain('uk2-file-uploader-display-loading');
  });

  it('should not add the skeleton state classes if uk2IsLoading is false', () => {
    component.isLoading = false;
    fixture.detectChanges();

    const fileUploadDisplayElement = fixture.debugElement.query(By.css('#fileUploadDisplay')).nativeElement;

    expect(directive.uk2IsLoading).toBeFalse();
    expect(fileUploadDisplayElement.classList).not.toContain('uk2-file-uploader-display-loading');
  });

  it('should add the image preview classes if uk2ShowPreview is true', () => {
    component.showPreview = true;
    fixture.detectChanges();

    const fileUploadDisplayElement = fixture.debugElement.query(By.css('#fileUploadDisplay')).nativeElement;

    expect(directive.uk2ShowPreview).toBeTrue();
    expect(fileUploadDisplayElement.classList).toContain('uk2-file-uploader-display-has-preview');
  });

  it('should not add the image preview classes if uk2ShowPreview is false', () => {
    component.showPreview = false;
    fixture.detectChanges();

    const fileUploadDisplayElement = fixture.debugElement.query(By.css('#fileUploadDisplay')).nativeElement;

    expect(directive.uk2ShowPreview).toBeFalse();
    expect(fileUploadDisplayElement.classList).not.toContain('uk2-file-uploader-display-has-preview');
  });

  it('should emit a file src URL when a file is provided', () => {
    const emitSpy = spyOn(directive.uk2FileSrc, 'emit');
    component.testFile = {
      fileContent: new File(['1234567890'], 'file-test-2.pdf', { type: 'application/pdf' }),
    } as Uk2File;

    fixture.detectChanges();

    expect(emitSpy).toHaveBeenCalled();
  });
});

describe('Uk2FileUploadDisplayDirective - Element errors', () => {
  let fixture: ComponentFixture<FileUploaderDisplayComponent>;
  let component: FileUploaderDisplayComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FileUploaderDisplayComponent, Uk2FileUploadDisplayDirective],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(FileUploaderDisplayComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should throw an error if no attribute for the info bar was specified', () => {
    let barElement = document.querySelector('#barElement');
    barElement?.remove();

    expect(() => {
      fixture.detectChanges();
    }).toThrowError(uk2FileUploadDisplayConstants.errorMessages.missingDescriptionBar);

    barElement = document.querySelector('#readyStateElement');
    expect(barElement).toBeNull();
  });
});
