import { ChangeDetectorRef, Component, DoCheck, Input, ViewEncapsulation } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import {
  Uk2ButtonSizeEnum,
  Uk2ModalActionsGridEnum,
  Uk2ModalFontWeightEnum,
  Uk2ModalTitleAlignEnum,
  Uk2TextButtonVariant,
  Uk2Tier1MiscEnum,
  Uk2Tier1NavigationEnum,
  Uk2Tier1UtilityEnum,
  Uk2ElementPositionEnum,
} from '@axos/uikit-v2-lib';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-file-uploader-pdf-viewer',
  templateUrl: './file-uploader-pdf-viewer.component.html',
  styleUrls: ['./file-uploader-pdf-viewer.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FileUploaderPdfViewerComponent implements DoCheck {
  uk2TextButtonVariant: Uk2TextButtonVariant = Uk2TextButtonVariant.button;
  buttonSize = Uk2ButtonSizeEnum;
  isLoading = false;

  // MODAL VIEW
  actionsGrid = Uk2ModalActionsGridEnum;
  fontWeight = Uk2ModalFontWeightEnum;
  titleAlign = Uk2ModalTitleAlignEnum;
  innerPanelClass = 'uk2-file-viewer-modal';

  // EXTEND/COLLAPSE CONTROL
  extended = true;
  iconExtand = Uk2Tier1MiscEnum.expandImage;
  iconCollapse = Uk2Tier1MiscEnum.collapseImage;

  // Closebutton
  iconClose = Uk2Tier1NavigationEnum.x;

  // Fullscreen COntrol
  iconWindow = Uk2Tier1UtilityEnum.newWindow;

  // ZOOM CONTROL
  iconZoomLess = Uk2Tier1UtilityEnum.magnifyMinus;
  iconZoomMore = Uk2Tier1UtilityEnum.magnifyPlus;
  zoom = 100;
  zoomValues: number[] = [25, 50, 75, 80, 90, 100, 110, 125, 150, 175, 200, 250, 300, 400, 500];

  //PDF NAME
  pdfName = '';

  // POSITION
  positionLeft = Uk2ElementPositionEnum.left;
  positionCenter = Uk2ElementPositionEnum.center;
  positionRight = Uk2ElementPositionEnum.right;

  // PDF Viewer
  @Input() pdfSrc: SafeUrl | undefined = '';
  pdf: PDFDocumentProxy | undefined = undefined;
  pdfPage = 1;
  inputPage = 1;

  private previousPdfPage = 1;
  private pageInputChange = false;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngDoCheck(): void {
    if (this.pdfPage !== this.previousPdfPage && !this.pageInputChange) {
      this.inputPage = this.pdfPage;
      this.previousPdfPage = this.pdfPage;
    }
    this.pageInputChange = false;
  }

  callBackPDFLoaded(pdf: PDFDocumentProxy) {
    this.pdf = pdf;
    let pdfNameAsArray: string[] = (this.pdfSrc as String).split('/');
    this.pdfName = pdfNameAsArray[pdfNameAsArray.length - 1];
    this.changeDetectorRef.detectChanges();
  }

  alert() {
    alert('Function was executed');
  }

  onClose() {
    alert('Close was executed');
  }

  extendView() {
    this.extended = this.extended === true ? false : true;
  }

  openFullScreen() {
    window.open('/components/file-viewer/file-viewer-full-screen', '_blank');
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
