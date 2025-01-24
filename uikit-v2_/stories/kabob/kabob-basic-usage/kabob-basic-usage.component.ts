import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import {
  Uk2ButtonSizeEnum,
  Uk2FlyoutMenuDirective,
  Uk2FlyoutMenuXPosition,
  Uk2FlyoutMenuYPosition,
  Uk2IconRegistryService,
  Uk2TextButtonVariant,
} from '@axos/uikit-v2-lib';

@Component({
  selector: 'app-kabob',
  templateUrl: './kabob-basic-usage.component.html',
  styleUrls: ['./kabob-basic-usage.component.scss', '../../../projects/uikit-v2-lib/src/styles/uk2.scss'],
})
export class KabobBasicUsageComponent {
  @ViewChild('flyoutMenu') flyoutMenu!: Uk2FlyoutMenuDirective;

  @Input() buttonCentered: boolean = false;
  @Input() buttonIcon: string = 'uk2-ellipses-vertical';
  @Input() buttonSize: Uk2ButtonSizeEnum = Uk2ButtonSizeEnum.small;
  @Input() flyoutOriginXPosition: Uk2FlyoutMenuXPosition = Uk2FlyoutMenuXPosition.end;
  @Input() flyoutOverlayXPosition: Uk2FlyoutMenuXPosition = Uk2FlyoutMenuXPosition.end;
  @Input() flyoutOriginYPosition: Uk2FlyoutMenuYPosition = Uk2FlyoutMenuYPosition.bottom;
  @Input() flyoutOverlayYPosition: Uk2FlyoutMenuYPosition = Uk2FlyoutMenuYPosition.top;
  @Input() flyoutOverlayHasBackdrop = false;
  @Input() flyoutOverlayYOffset: number = 4;
  @Input() closeOnClickOutside: boolean = false;
  @Input() closeOnClickItem: boolean = true;

  @Output() downloadEvent = new EventEmitter();
  @Output() shareEvent = new EventEmitter();
  @Output() uploadEvent = new EventEmitter();

  uk2TextButtonVariant: Uk2TextButtonVariant = Uk2TextButtonVariant.button;
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

  ngOnChanges(_: SimpleChanges) {
    if (this.flyoutMenu) {
      this.flyoutMenu.close();
    }
  }

  constructor(private iconRegistryService: Uk2IconRegistryService) {
    this.iconRegistryService.registerAllCategories();
  }

  clickDownload() {
    this.downloadEvent.emit();
    this.checkFlyoutClose();
  }

  clickShare() {
    this.shareEvent.emit();
    this.checkFlyoutClose();
  }

  clickUpload() {
    this.uploadEvent.emit();
    this.checkFlyoutClose();
  }

  private checkFlyoutClose() {
    if (this.closeOnClickItem) {
      this.flyoutMenu.close();
    }
  }
}
