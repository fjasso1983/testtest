import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import {
  Uk2ButtonSizeEnum,
  Uk2ElementPositionEnum,
  Uk2File,
  Uk2FlyoutMenuDirective,
  Uk2ListItem,
  Uk2TextButtonVariant,
  Uk2Tier1FilesEnum,
  Uk2Tier1MiscEnum,
  Uk2Tier1NavigationEnum,
  Uk2ToastComponent,
  Uk2ToastTypeEnum,
} from '@axos/uikit-v2-lib';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-file-uploader-drag-drop',
  templateUrl: './file-uploader-drag-drop.component.html',
  styleUrls: ['./file-uploader-drag-drop.component.scss'],
})
export class FileUploadDragDropComponent {
  @ViewChild('flyoutMenu') flyoutMenu!: Uk2FlyoutMenuDirective;

  uploaderIcon: Uk2Tier1FilesEnum = Uk2Tier1FilesEnum.picture;
  spinnerIcon: Uk2Tier1NavigationEnum = Uk2Tier1NavigationEnum.arrowsCircular;
  iconExpand = Uk2Tier1MiscEnum.expandImage;
  iconCollapse = Uk2Tier1MiscEnum.collapseImage;
  iconEllipses = Uk2Tier1NavigationEnum.ellipsesVertical;

  fileTypes = ['image/png', 'image/jpeg', 'application/pdf'];

  isUploading = false;
  isLoading = false;
  isDisabled = false;

  uploadedFiles: ExpandedUk2File[] = [];

  maxFileSize = 1048576; //1 MB

  elementPosition = Uk2ElementPositionEnum;
  uk2TextButtonVariant: Uk2TextButtonVariant = Uk2TextButtonVariant.button;
  buttonSize = Uk2ButtonSizeEnum;

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

  constructor(private _snackBar: MatSnackBar, private cd: ChangeDetectorRef, private sanitizer: DomSanitizer) {}

  isImage(file: Uk2File) {
    const imageTypes = ['image/png', 'image/jpeg'];
    return imageTypes.includes(file.fileContent.type);
  }

  isPdfFile(file: Uk2File) {
    return file.fileContent.type == 'application/pdf';
  }

  getPreview(contentSrc: string, file: ExpandedUk2File) {
    let previewSrc: string | SafeUrl = contentSrc;
    if (this.isImage(file)) {
      previewSrc = this.sanitizer.bypassSecurityTrustUrl(contentSrc);
    }
    file.contentSrc = previewSrc;
  }

  getUploadedFiles(files: Uk2File[]) {
    this.isUploading = true;
    setTimeout(() => {
      this.successToast();
      this.isUploading = false;
      this.uploadedFiles = [...this.uploadedFiles, ...files];
      this.cd.markForCheck();
    }, 1000);
  }

  getErrorMessage(message: string) {
    this._snackBar.openFromComponent(Uk2ToastComponent, {
      duration: 5 * 1000,
      data: {
        message: message,
        type: Uk2ToastTypeEnum.alert,
      },
    });
  }

  private successToast() {
    this._snackBar.openFromComponent(Uk2ToastComponent, {
      duration: 5 * 1000,
      data: {
        message: 'File was uploaded successfully',
        type: Uk2ToastTypeEnum.success,
      },
    });
  }
}

// Helper type for this example (keeps track of the configuration values in a loop of files)
export type ExpandedUk2File = Uk2File & {
  isExpanded?: boolean;
  contentSrc?: SafeUrl | string;
};
