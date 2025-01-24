import { ChangeDetectorRef, Component, DoCheck, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  Uk2ButtonSizeEnum,
  Uk2FileViewerElementPositionEnum,
  Uk2FlyoutMenuDirective,
  Uk2ListItem,
  Uk2TextButtonVariant,
  Uk2Tier1NavigationEnum,
  Uk2Tier1UtilityEnum,
} from '@axos/uikit-v2-lib';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-file-viewer-full-screen',
  templateUrl: './file-viewer-full-screen.component.html',
  styleUrls: ['./file-viewer-full-screen.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FileViewerFullScreenComponent implements DoCheck {
  @ViewChild('flyoutMenu') flyoutMenu!: Uk2FlyoutMenuDirective;
  buttonSize = Uk2ButtonSizeEnum;
  isLoading = false;

  // Flyout menu button
  iconEllipses = Uk2Tier1NavigationEnum.ellipsesVertical;
  uk2TextButtonVariant: Uk2TextButtonVariant = Uk2TextButtonVariant.button;
  flyoutList: Uk2ListItem[] = [
    {
      showControl: false,
      bodyText: 'Print',
      svgIconName: 'uk2-printer',
      value: 'Print button',
    },
    {
      showControl: false,
      bodyText: 'Download',
      svgIconName: 'uk2-download',
      value: 'Download button',
    },
    {
      showControl: false,
      bodyText: 'Share',
      svgIconName: 'uk2-share',
      value: 'Share button',
    },
    {
      showControl: false,
      bodyText: 'Upload',
      svgIconName: 'uk2-upload',
      value: 'Upload button',
    },
    {
      showControl: false,
      bodyText: 'Delete',
      svgIconName: 'uk2-trash',
      value: 'Delete button',
    },
  ];

  // Closebutton
  iconClose = Uk2Tier1NavigationEnum.x;

  // ZOOM CONTROL
  iconZoomLess = Uk2Tier1UtilityEnum.magnifyMinus;
  iconZoomMore = Uk2Tier1UtilityEnum.magnifyPlus;
  zoom = 100;
  zoomValues: number[] = [25, 50, 75, 80, 90, 100, 110, 125, 150, 175, 200, 250, 300, 400, 500];

  //PDF NAME
  pdfName = '';

  // POSITION
  positionLeft = Uk2FileViewerElementPositionEnum.left;
  positionCenter = Uk2FileViewerElementPositionEnum.center;
  positionRight = Uk2FileViewerElementPositionEnum.right;

  // PDF Viewer
  pdfSrc = '../../../assets/Account_Application_and_Agreement.pdf';
  pdf: PDFDocumentProxy | undefined = undefined;
  pdfPage = 1;
  inputPage = 1;

  private previousPdfPage = 1;
  private pageInputChange = false;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    let pdfNameAsArray: string[] = this.pdfSrc.split('/');
    this.pdfName = pdfNameAsArray[pdfNameAsArray.length - 1];
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
    this.changeDetectorRef.detectChanges();
  }

  clickOption(option: Uk2ListItem) {
    this.flyoutMenu.close();
    console.log(option.value);
  }

  // ZOOM CONTROL
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
