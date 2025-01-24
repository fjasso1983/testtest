import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { Uk2File } from '../types';
import { uk2FileUploadDragDropConstants } from './constants';
import { IUk2IsLoading } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';

@Directive({
  selector: 'div[uk2FileUploadDragDrop]',
})
export class Uk2FileUploadDragDropDirective implements OnInit, OnChanges, AfterViewInit, IUk2IsLoading {
  @Input() uk2FileUploadTypes: string[] = ['image/png', 'image/jpeg'];
  @Input() uk2FileUploadMaxFileSize: number | undefined;
  @Input() uk2IsDisabled = false;
  @Input() uk2IsUploading = false;
  @Input() uk2IsLoading = false;
  @Input() uk2FileUploadMultipleFiles = false;
  @Output() uk2UploadError = new EventEmitter<string>();
  @Output() uk2UploadSuccess = new EventEmitter<Uk2File[]>();

  //HTML Elements
  private inputElement: HTMLInputElement | null | undefined;
  private anchorElement: HTMLAnchorElement | null | undefined;
  private readyStateElement: HTMLDivElement | undefined;
  private loadingStateElement: HTMLDivElement | undefined;
  private skeletonStateElement: HTMLDivElement | undefined;

  constructor(private el: ElementRef<HTMLDivElement>, private renderer: Renderer2) {}

  @HostListener('dragover', ['$event']) onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener('dragenter', ['$event']) onDragEnter(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.setHoveringClass(true);
  }

  @HostListener('dragleave', ['$event']) onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (!this.el.nativeElement.contains(event.relatedTarget as Node)) {
      this.setHoveringClass(false);
    }
  }

  @HostListener('drop', ['$event']) onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.setHoveringClass(false);

    const dataTransfer = event.dataTransfer;
    const isReadyState = !(this.uk2IsLoading && this.uk2IsUploading && this.uk2IsDisabled);
    if (isReadyState && dataTransfer) {
      const files = dataTransfer.files;
      this.handleUploadedFiles(files);
    }
  }

  ngAfterViewInit(): void {
    this.setStateVisibility();
  }

  ngOnInit(): void {
    this.el.nativeElement.classList.add('uk2-file-uploader-drag-drop');
    this.setReadyState();
    this.setLoadingState();
    this.createSkeletonTemplate();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.changeLoadingUploadingState(changes);
    this.changeDisabledState(changes);
    this.changeMultipleFiles(changes);
  }

  private setListeners() {
    this.renderer.listen(this.inputElement, 'change', event => this.handleBrowserSelection(event));
    if (this.anchorElement) {
      this.renderer.listen(this.anchorElement, 'click', event => this.handleAnchorClick(event));
    }
  }

  private handleAnchorClick(event: Event) {
    event.preventDefault();
    this.inputElement!.click();
  }

  private handleBrowserSelection(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.handleUploadedFiles(input.files);
      input.value = ''; //Resets the input value
    }
  }

  private setReadyState() {
    const readyStateElement = this.el.nativeElement.querySelector('div[uk2-file-upload-ready]');
    if (!readyStateElement) {
      throw new Error(uk2FileUploadDragDropConstants.errorMessages.missingReadyState);
    }
    this.readyStateElement = readyStateElement as HTMLDivElement;
    this.readyStateElement.classList.add('uk2-file-uploader-ready');
    this.setHoveringClass(false);

    const inputElement: HTMLInputElement | null = this.el.nativeElement.querySelector('input[type="file"]');
    const anchorElement: HTMLAnchorElement | null = this.el.nativeElement.querySelector('a[uk2Anchor]');
    if (inputElement) {
      this.inputElement = inputElement;
      this.anchorElement = anchorElement;
      this.setListeners();

      if (this.anchorElement && this.uk2IsDisabled) {
        this.renderer.setAttribute(this.anchorElement, 'disabled', 'true');
      }

      if (this.uk2FileUploadMultipleFiles) {
        this.renderer.setAttribute(this.inputElement, 'multiple', '');
      }
    } else {
      throw new Error(uk2FileUploadDragDropConstants.errorMessages.missingInput);
    }
  }

  private setLoadingState() {
    const loadingStateElement = this.el.nativeElement.querySelector('div[uk2-file-upload-loading]');
    if (loadingStateElement) {
      this.loadingStateElement = loadingStateElement as HTMLDivElement;
      this.loadingStateElement.classList.add('uk2-file-uploader-uploading');

      const indicatorElement = this.loadingStateElement.querySelector('[uk2-file-upload-load-indicator]');
      if (indicatorElement) {
        indicatorElement.classList.add('uk2-file-uploader-uploading-indicator');
      }
    }
  }

  private createSkeletonTemplate() {
    const skeletonContainerElement: HTMLDivElement = this.renderer.createElement('div');
    this.renderer.addClass(skeletonContainerElement, 'uk2-file-uploader-skeleton');
    this.renderer.appendChild(this.el.nativeElement, skeletonContainerElement);

    const skeletonIcon: HTMLDivElement = this.renderer.createElement('div');
    this.renderer.addClass(skeletonIcon, 'uk2-file-uploader-skeleton-icon');
    this.renderer.appendChild(skeletonContainerElement, skeletonIcon);

    const skeletonDescription: HTMLDivElement = this.renderer.createElement('div');
    this.renderer.addClass(skeletonDescription, 'uk2-file-uploader-skeleton-description');
    this.renderer.appendChild(skeletonContainerElement, skeletonDescription);

    const skeletonSublineText: HTMLDivElement = this.renderer.createElement('div');
    this.renderer.addClass(skeletonSublineText, 'uk2-file-uploader-skeleton-subline');
    this.renderer.appendChild(skeletonContainerElement, skeletonSublineText);

    this.skeletonStateElement = skeletonContainerElement;
  }

  private setStateVisibility() {
    this.readyStateElement?.style.setProperty('display', 'none');
    this.loadingStateElement?.style.setProperty('display', 'none');
    this.skeletonStateElement?.style.setProperty('display', 'none');
    if (this.uk2IsLoading) {
      this.skeletonStateElement?.style.setProperty('display', 'block');

      return;
    }
    if (this.uk2IsUploading) {
      this.loadingStateElement?.style.setProperty('display', 'block');

      return;
    }
    this.readyStateElement?.style.setProperty('display', 'block');
  }

  private setHoveringClass(isHovering: boolean) {
    if (isHovering) {
      this.readyStateElement?.classList.add('uk2-border-interacted');
      this.readyStateElement?.classList.remove('uk2-border-dashed');
    } else {
      this.readyStateElement?.classList.add('uk2-border-dashed');
      this.readyStateElement?.classList.remove('uk2-border-interacted');
    }
  }

  private changeLoadingUploadingState(changes: SimpleChanges) {
    if (
      (changes.uk2IsUploading && !changes.uk2IsUploading.isFirstChange()) ||
      (changes.uk2IsLoading && !changes.uk2IsLoading.isFirstChange())
    ) {
      this.setStateVisibility();
    }
  }

  private changeDisabledState(changes: SimpleChanges) {
    if (changes.uk2IsDisabled && changes.uk2IsDisabled.currentValue) {
      this.el.nativeElement.classList.add('disabled');
      if (this.anchorElement) this.renderer.setAttribute(this.anchorElement, 'disabled', 'true');
    } else {
      this.el.nativeElement.classList.remove('disabled');
      if (this.anchorElement) this.renderer.removeAttribute(this.anchorElement, 'disabled');
    }
  }

  private changeMultipleFiles(changes: SimpleChanges) {
    if (this.inputElement) {
      if (
        changes.uk2FileUploadMultipleFiles &&
        !changes.uk2FileUploadMultipleFiles.isFirstChange() &&
        changes.uk2FileUploadMultipleFiles.currentValue
      ) {
        this.renderer.setAttribute(this.inputElement, 'multiple', '');
      } else {
        this.renderer.removeAttribute(this.inputElement, 'multiple');
      }
    }
  }

  private handleUploadedFiles(fileList: FileList) {
    let uploadedFiles: Uk2File[] = [];
    if (!this.uk2FileUploadMultipleFiles && Array.from(fileList).length > 1) {
      this.uk2UploadError.emit(uk2FileUploadDragDropConstants.errorMessages.multipleFiles);

      return;
    }

    for (const file of Array.from(fileList)) {
      if (!this.uk2FileUploadTypes.includes(file.type)) {
        this.uk2UploadError.emit(uk2FileUploadDragDropConstants.errorMessages.invalidFileType(file.name));
        uploadedFiles = [];
        break;
      }

      if (this.uk2FileUploadMaxFileSize && file.size > this.uk2FileUploadMaxFileSize) {
        this.uk2UploadError.emit(uk2FileUploadDragDropConstants.errorMessages.invalidFileSize(file.name));
        uploadedFiles = [];
        break;
      }

      const fileSize = this.formatFileSize(file.size);

      uploadedFiles.push({
        fileName: file.name,
        fileContent: file,
        fileFormatedSize: fileSize,
      });
    }

    if (uploadedFiles.length > 0) {
      this.uk2UploadSuccess.emit(uploadedFiles);
    }
  }

  private formatFileSize(bytes: number): string {
    const kilobytes = bytes / 1024;
    const megabytes = kilobytes / 1024;

    if (megabytes >= 1) {
      return `${this.truncateDecimals(megabytes, 2)}Mb`;
    } else {
      return `${this.truncateDecimals(kilobytes, 1)}K`;
    }
  }

  private truncateDecimals(value: number, decimals: number): string {
    const factor = Math.pow(10, decimals);

    return (Math.floor(value * factor) / factor).toFixed(decimals);
  }
}
