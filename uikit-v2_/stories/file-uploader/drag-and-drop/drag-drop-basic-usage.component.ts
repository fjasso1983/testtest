import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Uk2File, Uk2IconRegistryService, Uk2Tier1FilesEnum, Uk2Tier1NavigationEnum } from '@axos/uikit-v2-lib';

@Component({
  selector: 'app-file-uploader-drag-drop',
  templateUrl: './drag-drop-basic-usage.component.html',
  styleUrls: ['./drag-drop-basic-usage.component.scss'],
})
export class FileDragDropBasicUsageComponent implements OnChanges {
  @Input() allowedFileTypes: string = 'image/png';
  @Input() canUploadMultipleFiles: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() isLoading: boolean = false;
  @Input() maxFileSize = 1048576; //1 MB
  isUploading: boolean = false;

  uploaderIcon: Uk2Tier1FilesEnum = Uk2Tier1FilesEnum.picture;
  spinnerIcon: Uk2Tier1NavigationEnum = Uk2Tier1NavigationEnum.arrowsCircular;
  uploaderAllowedType: string[] = ['image/png'];

  constructor(private iconRegistryService: Uk2IconRegistryService) {
    this.iconRegistryService.registerAllCategories();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.allowedFileTypes) {
      this.uploaderAllowedType = [changes.allowedFileTypes.currentValue];
    }
  }

  onSuccessAction(files: Uk2File[]) {
    this.isUploading = true;
    setTimeout(() => {
      if (!this.isLoading) {
        this.isUploading = false;
        this.fileUploaderSuccess(files);
      }
    }, 2000);
  }

  fileUploaderSuccess(files: Uk2File[]) {}

  onErrorAction(error: string) {}
}
