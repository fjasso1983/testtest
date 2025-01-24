import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import {
  Uk2ButtonSizeEnum,
  Uk2ElementPositionEnum,
  Uk2IconRegistryService,
  Uk2TextButtonVariant,
  Uk2File,
  Uk2FlyoutMenuDirective,
} from '@axos/uikit-v2-lib';

@Component({
  selector: 'app-file-uploader-display',
  templateUrl: './display-basic-usage.component.html',
  styleUrls: ['./display-basic-usage.component.scss'],
})
export class FileUploaderDisplayBasicUsageComponent {
  @ViewChild('flyoutMenu') flyoutMenu!: Uk2FlyoutMenuDirective;
  @Input() showCollapseButton = false;
  @Input() showFileSize = false;
  @Input() isLoading = false;
  @Output() flyoutItemClickEvent = new EventEmitter();

  iconExpand = 'uk2-expand-image';
  iconCollapse = 'uk2-collapse-image';
  iconEllipses = 'uk2-ellipses-vertical';
  elementPosition = Uk2ElementPositionEnum;

  buttonSmallSize: Uk2ButtonSizeEnum = Uk2ButtonSizeEnum.small;
  buttonVariant: Uk2TextButtonVariant = Uk2TextButtonVariant.button;

  showPreview = false;
  isImage = false;

  file: Uk2File | undefined;
  fileUrl: string | undefined;
  safeUrl: SafeUrl | undefined;

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
  fourthItem = {
    showControl: false,
    bodyText: 'Delete',
    svgIconName: 'uk2-trash',
    value: '',
  };

  constructor(private iconRegistryService: Uk2IconRegistryService, private sanitizer: DomSanitizer) {
    this.iconRegistryService.registerAllCategories();
  }

  onFileUpload(file: Uk2File) {
    const imageTypes = ['image/png', 'image/jpeg'];
    this.isImage = imageTypes.includes(file.fileContent.type);
    this.showPreview = false;
    this.file = file;
  }

  getFileUrl(fileUrl: string) {
    this.fileUrl = fileUrl;
    this.safeUrl = this.sanitizer.bypassSecurityTrustUrl(fileUrl);
  }

  flyoutItemClick() {
    this.flyoutItemClickEvent.emit();
    this.flyoutMenu.close();
  }

  deleteFile() {
    this.file = undefined;
  }
}
