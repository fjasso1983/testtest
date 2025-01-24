import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { Uk2File } from '../types';
import { IUk2IsLoading } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';
import { uk2FileUploadDisplayConstants } from './constants';

@Directive({
  selector: 'div[uk2FileUploadDisplay]',
})
export class Uk2FileUploadDisplayDirective implements OnDestroy, OnInit, OnChanges, AfterViewInit, IUk2IsLoading {
  @Input() uk2File: Uk2File | undefined;
  @Input() uk2ShowPreview = false;
  @Input() uk2IsLoading = false;
  @Input() uk2UploadPreview: HTMLDivElement | undefined;
  @Output() uk2FileSrc = new EventEmitter<string>();

  private srcUrl: string | undefined;

  constructor(private el: ElementRef<HTMLDivElement>, private renderer: Renderer2) {}

  ngOnDestroy(): void {
    if (this.srcUrl) {
      URL.revokeObjectURL(this.srcUrl);
    }
  }

  ngOnInit(): void {
    this.el.nativeElement.classList.add('uk2-file-upload-display');
    this.setPreviewElement();
    this.setDescriptionBarElement();
    this.createSkeletonTemplate();
  }

  ngAfterViewInit(): void {
    this.setStateVisibility();
    this.setPreviewVisibility();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.handleLoadingChange(changes.uk2IsLoading);
    this.handlePreviewChange(changes.uk2ShowPreview);
    this.handleFileChange(changes.uk2File);
  }

  private handleLoadingChange(uk2IsLoading: SimpleChange | undefined) {
    if (uk2IsLoading && !uk2IsLoading.isFirstChange()) {
      this.setStateVisibility();
    }
  }

  private handlePreviewChange(uk2ShowPreview: SimpleChange | undefined) {
    if (uk2ShowPreview && !uk2ShowPreview.isFirstChange()) {
      this.setPreviewVisibility();
    }
  }

  private handleFileChange(uk2File: SimpleChange) {
    if (uk2File) {
      this.srcUrl = URL.createObjectURL(uk2File.currentValue.fileContent);
      this.uk2FileSrc.emit(this.srcUrl);
    }
  }

  private setPreviewElement() {
    const filePreviewElement: HTMLDivElement | null =
      this.el.nativeElement.querySelector('div[uk2-file-upload-preview]');
    if (filePreviewElement) {
      this.renderer.addClass(filePreviewElement, 'uk2-file-upload-display-preview');
    }
  }

  private setDescriptionBarElement() {
    const fileDescriptionBarElement: HTMLDivElement | null = this.el.nativeElement.querySelector(
      'div[uk2-file-upload-description-bar]'
    );
    if (!fileDescriptionBarElement) {
      throw new Error(uk2FileUploadDisplayConstants.errorMessages.missingDescriptionBar);
    }

    fileDescriptionBarElement.classList.add('uk2-file-upload-display-info-bar');
  }

  private setStateVisibility() {
    this.renderer.removeClass(this.el.nativeElement, 'uk2-file-uploader-display-loading');
    if (this.uk2IsLoading) {
      this.renderer.addClass(this.el.nativeElement, 'uk2-file-uploader-display-loading');
    }
    this.setPreviewVisibility();
  }

  private setPreviewVisibility() {
    this.renderer.removeClass(this.el.nativeElement, 'uk2-file-uploader-display-has-preview');
    if (this.uk2ShowPreview) {
      this.renderer.addClass(this.el.nativeElement, 'uk2-file-uploader-display-has-preview');
    }
  }

  private createSkeletonTemplate() {
    const skeletonContainerElement: HTMLDivElement = this.renderer.createElement('div');
    this.renderer.addClass(skeletonContainerElement, 'uk2-file-uploader-skeleton');
    this.renderer.appendChild(this.el.nativeElement, skeletonContainerElement);

    this.createBarSkeleton(skeletonContainerElement); // Skeleton - Text
    this.createPreviewSkeleton(skeletonContainerElement); // Skeleton - Preview
  }

  private createBarSkeleton(container: HTMLDivElement) {
    const skeletonTextMode: HTMLDivElement = this.renderer.createElement('div');
    this.renderer.addClass(skeletonTextMode, 'uk2-file-uploader-skeleton-bar');
    this.renderer.appendChild(container, skeletonTextMode);

    const descriptionElement: HTMLDivElement = this.renderer.createElement('div');
    this.renderer.addClass(descriptionElement, 'uk2-file-uploader-skeleton-description');
    this.renderer.appendChild(skeletonTextMode, descriptionElement);

    const iconElement: HTMLDivElement = this.renderer.createElement('div');
    this.renderer.addClass(iconElement, 'uk2-file-uploader-skeleton-icon');
    this.renderer.appendChild(skeletonTextMode, iconElement);
  }

  private createPreviewSkeleton(container: HTMLDivElement) {
    const skeletonPreviewMode: HTMLDivElement = this.renderer.createElement('div');
    this.renderer.addClass(skeletonPreviewMode, 'uk2-file-uploader-skeleton-preview');
    this.renderer.appendChild(container, skeletonPreviewMode);

    const topBarElement: HTMLDivElement = this.renderer.createElement('div');
    this.renderer.addClass(topBarElement, 'uk2-file-uploader-skeleton-top-bar');
    this.renderer.appendChild(skeletonPreviewMode, topBarElement);

    const iconElement: HTMLDivElement = this.renderer.createElement('div');
    this.renderer.addClass(iconElement, 'uk2-file-uploader-skeleton-icon');
    this.renderer.appendChild(topBarElement, iconElement);
    this.renderer.appendChild(topBarElement, iconElement.cloneNode(true));

    const contentElement: HTMLDivElement = this.renderer.createElement('div');
    this.renderer.addClass(contentElement, 'uk2-file-uploader-skeleton-content');
    this.renderer.appendChild(skeletonPreviewMode, contentElement);

    const footerElement: HTMLDivElement = this.renderer.createElement('div');
    this.renderer.addClass(footerElement, 'uk2-file-uploader-skeleton-footer');
    this.renderer.appendChild(skeletonPreviewMode, footerElement);

    const descriptionElement: HTMLDivElement = this.renderer.createElement('div');
    this.renderer.addClass(descriptionElement, 'uk2-file-uploader-skeleton-description');
    this.renderer.appendChild(footerElement, descriptionElement);
  }
}
