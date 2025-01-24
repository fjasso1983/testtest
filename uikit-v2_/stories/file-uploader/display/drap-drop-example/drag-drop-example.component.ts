import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Uk2File, Uk2IconRegistryService, Uk2Tier1FilesEnum, Uk2Tier1NavigationEnum } from '@axos/uikit-v2-lib';

@Component({
  selector: 'app-drag-drop-example',
  templateUrl: './drag-drop-example.component.html',
  styleUrls: ['./drag-drop-example.component.scss'],
})
export class FileDragDropExampleComponent {
  @Output() uploadStart = new EventEmitter<void>();
  @Output() uploadReady = new EventEmitter<Uk2File>();

  uploaderAllowedType: string[] = ['image/png', 'image/jpeg', 'application/pdf'];
  maxFileSize = 1048576; //1 MB
  isUploading: boolean = false;

  uploaderIcon: Uk2Tier1FilesEnum = Uk2Tier1FilesEnum.picture;
  spinnerIcon: Uk2Tier1NavigationEnum = Uk2Tier1NavigationEnum.arrowsCircular;

  constructor(private iconRegistryService: Uk2IconRegistryService) {
    this.iconRegistryService.registerAllCategories();
  }

  onSuccessAction(file: Uk2File[]) {
    this.uploadStart.emit();
    this.isUploading = true;
    setTimeout(() => {
      this.isUploading = false;
      this.uploadReady.emit(file[0]);
    }, 500);
  }
}
