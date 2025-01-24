import { ChangeDetectorRef, Component, DoCheck, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import {
  Uk2ButtonSizeEnum,
  Uk2FileViewerElementPositionEnum,
  Uk2FlyoutMenuDirective,
  Uk2IconRegistryService,
  Uk2TextButtonVariant,
} from '@axos/uikit-v2-lib';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-file-viewer',
  templateUrl: './file-viewer-basic-usage.component.html',
  styleUrls: ['./file-viewer-basic-usage.component.scss', '../../../projects/uikit-v2-lib/src/styles/uk2.scss'],
})
export class FileViewerBasicUsageComponent implements DoCheck {
  @ViewChild('flyoutMenu') flyoutMenu!: Uk2FlyoutMenuDirective;

  @Input() fileViewerWidth: string = '800px';
  @Input() fileViewerHideBorder: boolean = false;
  @Input() fileViewerHeight: string = '400px';

  positionLeft = Uk2FileViewerElementPositionEnum.left;
  positionCenter = Uk2FileViewerElementPositionEnum.center;
  positionRight = Uk2FileViewerElementPositionEnum.right;
  buttonSmallSize: Uk2ButtonSizeEnum = Uk2ButtonSizeEnum.small;
  buttonVariant: Uk2TextButtonVariant = Uk2TextButtonVariant.button;

  svgClose = 'uk2-x';
  svgWindow = 'uk2-new-window';
  svgZoomLess = 'uk2-magnify-minus';
  svgZoomMore = 'uk2-magnify-plus';
  svgEllipses = 'uk2-ellipses-vertical';
  svgExpand = 'uk2-expand-image';
  svgCollapse = 'uk2-collapse-image';

  zoom = 100;
  zoomValues: number[] = [25, 50, 75, 80, 90, 100, 110, 125, 150, 175, 200, 250, 300, 400, 500];

  firstItem = {
    showControl: false,
    bodyText: 'Download',
    svgIconName: 'uk2-download',
    value: 'Download button',
  };
  secondItem = {
    showControl: false,
    bodyText: 'Share',
    svgIconName: 'uk2-share',
    value: 'Share button',
  };
  thirdItem = {
    showControl: false,
    bodyText: 'Upload',
    svgIconName: 'uk2-upload',
    value: 'Upload button',
  };

  pdfSrc = 'assets/uk2/components/file-viewer/assets/lorem-ipsum.pdf';
  pdf: PDFDocumentProxy | undefined = undefined;
  pdfPage = 1;
  inputPage = 1;
  pdfName = '';

  private previousPdfPage = 1;
  private pageInputChange = false;

  constructor(private changeDetectorRef: ChangeDetectorRef, private iconRegistryService: Uk2IconRegistryService) {
    this.iconRegistryService.registerAllCategories();
  }

  ngDoCheck(): void {
    if (this.pdfPage !== this.previousPdfPage && !this.pageInputChange) {
      this.inputPage = this.pdfPage;
      this.previousPdfPage = this.pdfPage;
    }
    this.pageInputChange = false;
  }

  callBackPDFLoaded(pdf: PDFDocumentProxy) {
    this.pdf = pdf;
    let pdfNameAsArray: string[] = this.pdfSrc.split('/');
    this.pdfName = pdfNameAsArray[pdfNameAsArray.length - 1];
    this.changeDetectorRef.detectChanges();
  }

  setZoomValue(action: string) {
    const isZoomIn = action === 'plus';
    const filteredZoomValues = this.zoomValues.filter(value => (isZoomIn ? value > this.zoom : value < this.zoom));
    if (filteredZoomValues.length > 0) {
      this.zoom = isZoomIn ? filteredZoomValues[0] : filteredZoomValues[filteredZoomValues.length - 1];
    }
  }

  onBlur(event: FocusEvent): void {
    const input = event.target as HTMLInputElement;
    this.updateZoom(input.value);
    input.value = this.zoom + '%';
  }

  updatePage(event: FocusEvent) {
    const input = event.target as HTMLInputElement;
    const value = parseInt(input.value);

    this.syncInputPdfPage(value);
  }

  keydownPage(keyDownEvent: KeyboardEvent) {
    const key = keyDownEvent.key.toLowerCase();
    if (key === 'enter') {
      keyDownEvent.stopPropagation();
      keyDownEvent.preventDefault();

      this.syncInputPdfPage(this.inputPage);
    }
  }

  onFocus(event: FocusEvent): void {
    const input = event.target as HTMLInputElement;
    const cursorPosition = input.selectionStart ?? 0;
    const percentagePosition = input.value.length - 1;

    if (cursorPosition > percentagePosition) {
      this.setCursorPosition(input);
    }
  }

  updateZoom(value: string): void {
    let numericValue = parseFloat(value.replace('%', ''));

    if (isNaN(numericValue) || value === '') {
      this.zoom = 25;
    } else {
      this.zoom = Math.min(Math.max(numericValue, 25), 500);
    }
  }

  setCursorPosition(input: HTMLInputElement): void {
    const position = input.value.length - 1;
    setTimeout(() => {
      input.setSelectionRange(position, position);
    }, 0);
  }

  onExpand() {}

  onClose() {}

  onOpenFullscreen() {}

  onFlyoutOptionClick() {}

  private syncInputPdfPage(page: number) {
    if (page) {
      if (page > this.pdf?.numPages!) {
        this.pdfPage = this.pdf?.numPages!;
      } else {
        this.pdfPage = page;
      }
    } else {
      this.pdfPage = 1;
    }
    this.inputPage = this.pdfPage;
    this.pageInputChange = true;
  }
}
