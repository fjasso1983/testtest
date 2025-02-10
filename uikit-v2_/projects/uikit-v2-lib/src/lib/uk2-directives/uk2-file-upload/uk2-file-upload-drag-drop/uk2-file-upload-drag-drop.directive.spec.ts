import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Uk2FileUploadDragDropDirective } from './uk2-file-upload-drag-drop.directive';
import { By } from '@angular/platform-browser';
import { Uk2File } from '@axos/uikit-v2-lib';
import { uk2FileUploadDragDropConstants } from './constants';

@Component({
  template: `
    <div
      uk2FileUploadDragDrop
      [uk2FileUploadMaxFileSize]="maxFileSize"
      [uk2FileUploadMultipleFiles]="uploadMultipleFiles"
      [uk2IsUploading]="isUploading"
      [uk2IsLoading]="isLoading"
      [uk2IsDisabled]="isDisabled"
      [uk2FileUploadTypes]="extensions"
    >
      <input id="inputElement" type="file" multiple />
      <div id="readyStateElement" uk2-file-upload-ready>
        <mat-icon id="uploaderIcon" [svgIcon]="uploaderIcon"></mat-icon>
        <p><a id="anchorElement" uk2Anchor>browse</a></p>
      </div>
      <div uk2-file-upload-loading id="uploadingStateElement">
        <div uk2-file-upload-load-indicator> </div>
      </div>
    </div>
  `,
})
class FileUploaderTestComponent {
  extensions: string[] = [];
  maxFileSize = 5000000; // 5 MB
  uploadMultipleFiles = true;
  isLoading = false;
  isUploading = false;
  isDisabled = false;
}
describe('Uk2FileUploadDragDropDirective', () => {
  let fixture: ComponentFixture<FileUploaderTestComponent>;
  let component: FileUploaderTestComponent;
  let directive: Uk2FileUploadDragDropDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FileUploaderTestComponent, Uk2FileUploadDragDropDirective],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(FileUploaderTestComponent);
    component = fixture.componentInstance;

    const directiveEl = fixture.debugElement.query(By.directive(Uk2FileUploadDragDropDirective));
    directive = directiveEl.injector.get(Uk2FileUploadDragDropDirective);
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

  it('should create the necesary elements for the skeleton state when initialized', () => {
    const skeletonContainerElement = fixture.debugElement.query(By.css('.uk2-file-uploader-skeleton')).nativeElement;
    const skeletonIconElement = fixture.debugElement.query(By.css('.uk2-file-uploader-skeleton-icon')).nativeElement;
    const skeletonDescriptionElement = fixture.debugElement.query(
      By.css('.uk2-file-uploader-skeleton-description')
    ).nativeElement;
    const skeletonSublineElement = fixture.debugElement.query(
      By.css('.uk2-file-uploader-skeleton-subline')
    ).nativeElement;

    expect(skeletonContainerElement).toBeTruthy();
    expect(skeletonIconElement).toBeTruthy();
    expect(skeletonDescriptionElement).toBeTruthy();
    expect(skeletonSublineElement).toBeTruthy();
  });

  it('should set the correct classes for the ready state', () => {
    const readyElement = document.querySelector('#readyStateElement');

    expect(readyElement).toBeTruthy();
    expect(readyElement?.classList).toContain('uk2-file-uploader-ready');
  });

  it('should set the anchor as disabled if uk2IsDisabled is set to true', () => {
    component.isDisabled = true;
    fixture.detectChanges();
    const anchorElement = fixture.debugElement.query(By.css('a[uk2Anchor]')).nativeElement;

    expect(anchorElement.hasAttribute('disabled')).toBeTrue();
  });

  it('should remove the disabled attribute from the anchor if uk2IsDisabled is set to false', () => {
    component.isDisabled = false;
    fixture.detectChanges();
    const anchorElement = fixture.debugElement.query(By.css('a[uk2Anchor]')).nativeElement;

    expect(anchorElement.hasAttribute('disabled')).toBeFalse();
  });

  it('should set the multiple attribute to the input if uk2FileUploadMultipleFiles is set to true', () => {
    component.uploadMultipleFiles = true;
    fixture.detectChanges();
    const inputElement = fixture.debugElement.query(By.css('#inputElement')).nativeElement;

    expect(inputElement.hasAttribute('multiple')).toBeTrue();
  });

  it('should remove the multiple attribute to the input if uk2FileUploadMultipleFiles is set to false', () => {
    component.uploadMultipleFiles = false;
    fixture.detectChanges();
    const inputElement = fixture.debugElement.query(By.css('#inputElement')).nativeElement;

    expect(inputElement.hasAttribute('multiple')).toBeFalse();
  });

  it('should set the correct classes for the loading state', () => {
    const loadingElement = fixture.debugElement.query(By.css('#uploadingStateElement')).nativeElement;

    expect(loadingElement).toBeTruthy();
    expect(loadingElement.classList).toContain('uk2-file-uploader-uploading');
  });

  it('should display the ready state', () => {
    component.isDisabled = false;
    component.isLoading = false;
    component.isUploading = false;
    fixture.detectChanges();

    const readyElement = fixture.debugElement.query(By.css('#readyStateElement')).nativeElement;
    const computedStyle = getComputedStyle(readyElement!);

    expect(readyElement).toBeTruthy();
    expect(readyElement.classList).toContain('uk2-file-uploader-ready');
    expect(computedStyle.display).toBe('block');
  });

  it('should display the uploading state', () => {
    component.isDisabled = false;
    component.isLoading = false;
    component.isUploading = true;
    fixture.detectChanges();

    const uploadingElement = fixture.debugElement.query(By.css('#uploadingStateElement')).nativeElement;
    const computedStyle = getComputedStyle(uploadingElement!);

    expect(uploadingElement).toBeTruthy();
    expect(uploadingElement.classList).toContain('uk2-file-uploader-uploading');
    expect(computedStyle.display).toBe('block');
  });

  it('should display the skeleton state', () => {
    component.isDisabled = false;
    component.isLoading = true;
    component.isUploading = false;
    fixture.detectChanges();

    const skeletonElement = fixture.debugElement.query(By.css('.uk2-file-uploader-skeleton')).nativeElement;
    const computedStyle = getComputedStyle(skeletonElement!);

    expect(computedStyle.display).toBe('block');
  });

  it('should set the default border to the ready state when initialized', () => {
    const readyElement = document.querySelector('#readyStateElement');

    expect(readyElement).toBeTruthy();
    expect(readyElement?.classList).toContain('uk2-border-dashed');
  });

  it('should set the interacted border to the ready state element when a file is dragged over', () => {
    const readyElement = document.querySelector('#readyStateElement');
    const dragEnterEvent = new DragEvent('dragenter');
    const dragOverEvent = new DragEvent('dragover');

    directive.onDragEnter(dragEnterEvent);
    directive.onDragEnter(dragOverEvent);
    fixture.detectChanges();

    expect(readyElement?.classList).toContain('uk2-border-interacted');
  });

  it('should keep the interacted border to the ready state if a file is dragged over a children element inside the container', () => {
    const iconElement = document.querySelector('#uploaderIcon');
    const readyElement = document.querySelector('#readyStateElement');
    const dragEnterEvent = new DragEvent('dragenter');
    const dragLeaveEvent = new DragEvent('dragleave', { relatedTarget: iconElement });
    directive.onDragEnter(dragEnterEvent);
    fixture.detectChanges();

    directive.onDragLeave(dragLeaveEvent);
    fixture.detectChanges();

    expect(readyElement?.classList).toContain('uk2-border-interacted');
  });

  it('should remove the interacted border and set the default border to the ready state when a file is dragged outside', () => {
    const readyElement = document.querySelector('#readyStateElement');
    const dragEnterEvent = new DragEvent('dragenter');
    const dragLeaveEvent = new DragEvent('dragleave');
    directive.onDragEnter(dragEnterEvent);
    fixture.detectChanges();

    directive.onDragLeave(dragLeaveEvent);
    fixture.detectChanges();

    expect(readyElement?.classList).toContain('uk2-border-dashed');
  });

  it('should remove the interacted border and set the default border to the ready state when a file is dropped on the container', () => {
    const readyElement = document.querySelector('#readyStateElement');
    const dragEnterEvent = new DragEvent('dragenter');
    const dropEvent = new DragEvent('drop', {});
    directive.onDragEnter(dragEnterEvent);
    fixture.detectChanges();

    directive.onDrop(dropEvent);
    fixture.detectChanges();

    expect(readyElement?.classList).toContain('uk2-border-dashed');
  });

  it('should call to click on the input when the anchor element is clicked', () => {
    const inputElement = document.querySelector('#inputElement');
    const inputClickSpy = spyOn(inputElement as HTMLInputElement, 'click');
    const anchorElement = document.querySelector('#anchorElement');
    const clickEvent = new Event('click', {});

    anchorElement?.dispatchEvent(clickEvent);
    fixture.detectChanges();

    expect(inputClickSpy).toHaveBeenCalled();
  });

  it('should obtain and emit a valid file via drag and drop', () => {
    component.extensions = ['application/pdf'];
    component.maxFileSize = 10; //10 bytes
    fixture.detectChanges();

    const uploadedFile = new File(['1234567890'], 'file-test.pdf', { type: 'application/pdf' }); //content results in 10 bytes size
    const outputSpy = spyOn(directive.uk2UploadSuccess, 'emit');
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(uploadedFile);
    const dropEvent = new DragEvent('drop', {
      dataTransfer: dataTransfer,
    });
    const expectedOutput: Uk2File[] = [
      {
        fileName: 'file-test.pdf',
        fileContent: uploadedFile,
        fileFormatedSize: '0.0K',
      },
    ];

    directive.onDrop(dropEvent);
    fixture.detectChanges();

    expect(outputSpy).toHaveBeenCalledWith(expectedOutput);
  });

  it('should obtain and emit a valid file via browser selection', () => {
    component.extensions = ['image/png'];
    component.maxFileSize = 10; //10 bytes
    fixture.detectChanges();

    const uploadedFile = new File(['1234567890'], 'file-test.png', { type: 'image/png' });
    const inputElement = document.querySelector('#inputElement');
    const outputSpy = spyOn(directive.uk2UploadSuccess, 'emit');
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(uploadedFile);
    const changeEvent = new Event('change', {});
    Object.defineProperty(inputElement, 'files', {
      value: dataTransfer.files,
    });
    const expectedOutput: Uk2File[] = [
      {
        fileName: 'file-test.png',
        fileContent: uploadedFile,
        fileFormatedSize: '0.0K',
      },
    ];

    inputElement?.dispatchEvent(changeEvent);
    fixture.detectChanges();

    expect(outputSpy).toHaveBeenCalledWith(expectedOutput);
  });

  it('should obtain and emit multiple files if uk2FileUploadMultipleFiles is set to true', () => {
    const outputSpy = spyOn(directive.uk2UploadSuccess, 'emit');
    component.extensions = ['application/pdf'];
    component.maxFileSize = 10; //10 bytes
    fixture.detectChanges();

    const uploadedFile1 = new File(['1234567890'], 'file-test-1.pdf', { type: 'application/pdf' });
    const uploadedFile2 = new File(['1234567890'], 'file-test-2.pdf', { type: 'application/pdf' });
    const uploadedFile3 = new File(['1234567890'], 'file-test-3.pdf', { type: 'application/pdf' });
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(uploadedFile1);
    dataTransfer.items.add(uploadedFile2);
    dataTransfer.items.add(uploadedFile3);
    const dropEvent = new DragEvent('drop', {
      dataTransfer: dataTransfer,
    });
    const expectedOutput: Uk2File[] = [
      {
        fileName: 'file-test-1.pdf',
        fileContent: uploadedFile1,
        fileFormatedSize: '0.0K',
      },
      {
        fileName: 'file-test-2.pdf',
        fileContent: uploadedFile2,
        fileFormatedSize: '0.0K',
      },
      {
        fileName: 'file-test-3.pdf',
        fileContent: uploadedFile3,
        fileFormatedSize: '0.0K',
      },
    ];

    directive.onDrop(dropEvent);
    fixture.detectChanges();

    expect(outputSpy).toHaveBeenCalledWith(expectedOutput);
  });

  it('should not accept an invalid file based on the file size and emit an error message', () => {
    component.extensions = ['image/png'];
    component.maxFileSize = 5; //5 bytes
    fixture.detectChanges();

    const uploadedFile = new File(['1234567890'], 'file-test.png', { type: 'image/png' }); //content results in 10 bytes size
    const outputSpy = spyOn(directive.uk2UploadError, 'emit');
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(uploadedFile);
    const dropEvent = new DragEvent('drop', {
      dataTransfer: dataTransfer,
    });

    directive.onDrop(dropEvent);
    fixture.detectChanges();

    expect(outputSpy).toHaveBeenCalledWith(`File 'file-test.png' exceeds the allowed file size`);
  });

  it('should not accept an invalid file based on the mimetype and emit an error message', () => {
    component.extensions = ['image/png'];
    component.maxFileSize = 10; //5 bytes
    fixture.detectChanges();

    const uploadedFile = new File(['1234567890'], 'file-test.pdf', { type: 'application/pdf' });
    const outputSpy = spyOn(directive.uk2UploadError, 'emit');
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(uploadedFile);
    const dropEvent = new DragEvent('drop', {
      dataTransfer: dataTransfer,
    });

    directive.onDrop(dropEvent);
    fixture.detectChanges();

    expect(outputSpy).toHaveBeenCalledWith(`File 'file-test.pdf' is of an invalid type`);
  });

  it('should not accept multiple files if uk2FileUploadMultipleFiles is set to false and emit an error message', () => {
    component.extensions = ['application/pdf'];
    component.uploadMultipleFiles = false;
    component.maxFileSize = 10; //5 bytes
    fixture.detectChanges();

    const outputSpy = spyOn(directive.uk2UploadError, 'emit');
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(new File(['1234567890'], 'file-test-1.pdf', { type: 'application/pdf' }));
    dataTransfer.items.add(new File(['1234567890'], 'file-test-2.pdf', { type: 'application/pdf' }));
    dataTransfer.items.add(new File(['1234567890'], 'file-test-3.pdf', { type: 'application/pdf' }));
    const dropEvent = new DragEvent('drop', {
      dataTransfer: dataTransfer,
    });

    directive.onDrop(dropEvent);
    fixture.detectChanges();

    expect(outputSpy).toHaveBeenCalledWith(`Uploading multiple files is not allowed`);
  });

  it('it should calculate the correct formated size in kilobytes if the file size is smaller than one megabyte', () => {
    component.extensions = ['image/png'];
    component.maxFileSize = 2097152;
    fixture.detectChanges();

    const blob = new Blob([new Array(524288).fill('a').join('')], { type: 'image/png' });
    const uploadedFile = new File([blob], 'file-test.png', { type: 'image/png' });
    const inputElement = document.querySelector('#inputElement');
    const outputSpy = spyOn(directive.uk2UploadSuccess, 'emit');
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(uploadedFile);
    const changeEvent = new Event('change', {});
    Object.defineProperty(inputElement, 'files', {
      value: dataTransfer.files,
    });
    const expectedOutput: Uk2File[] = [
      {
        fileName: 'file-test.png',
        fileContent: uploadedFile,
        fileFormatedSize: '512.0K',
      },
    ];

    inputElement?.dispatchEvent(changeEvent);
    fixture.detectChanges();

    expect(outputSpy).toHaveBeenCalledWith(expectedOutput);
  });

  it('it should calculate the correct formated size in megabytes if the file size is at least one megabyte', () => {
    component.extensions = ['image/png'];
    component.maxFileSize = 2097152;
    fixture.detectChanges();

    const blob = new Blob([new Array(2097152).fill('a').join('')], { type: 'image/png' });
    const uploadedFile = new File([blob], 'file-test.png', { type: 'image/png' });
    const inputElement = document.querySelector('#inputElement');
    const outputSpy = spyOn(directive.uk2UploadSuccess, 'emit');
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(uploadedFile);
    const changeEvent = new Event('change', {});
    Object.defineProperty(inputElement, 'files', {
      value: dataTransfer.files,
    });
    const expectedOutput: Uk2File[] = [
      {
        fileName: 'file-test.png',
        fileContent: uploadedFile,
        fileFormatedSize: '2.00Mb',
      },
    ];

    inputElement?.dispatchEvent(changeEvent);
    fixture.detectChanges();

    expect(outputSpy).toHaveBeenCalledWith(expectedOutput);
  });

  it('should call to destroy all listeners when the element is destroyed', () => {
    directive['inputListener'] = jasmine.createSpy();
    directive['anchorListener'] = jasmine.createSpy();

    fixture.destroy();

    expect(directive['inputListener']).toHaveBeenCalled();
    expect(directive['anchorListener']).toHaveBeenCalled();
  });
});

describe('Uk2FileUploadDragDropDirective - Element errors', () => {
  let fixture: ComponentFixture<FileUploaderTestComponent>;
  let component: FileUploaderTestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FileUploaderTestComponent, Uk2FileUploadDragDropDirective],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(FileUploaderTestComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should throw an error if no attribute for the ready state was specified', () => {
    let readyElement = document.querySelector('#readyStateElement');
    readyElement?.remove();

    expect(() => {
      fixture.detectChanges();
    }).toThrowError(uk2FileUploadDragDropConstants.errorMessages.missingReadyState);

    readyElement = document.querySelector('#readyStateElement');
    expect(readyElement).toBeNull();
  });

  it('should throw an error if no input of type file was specified', () => {
    let inputElement = document.querySelector('#inputElement');
    inputElement?.remove();

    expect(() => {
      fixture.detectChanges();
    }).toThrowError(uk2FileUploadDragDropConstants.errorMessages.missingInput);

    inputElement = document.querySelector('#inputElement');
    expect(inputElement).toBeNull();
  });
});
