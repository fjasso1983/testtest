import { Component, ElementRef, Input, AfterViewInit, ViewChild } from '@angular/core';
import { Uk2Tier1UtilityEnum } from '@axos/uikit-v2-lib/src/lib/uk2-services';
import { uk2TextTileErrorConstants } from './constants';

@Component({
  selector: 'uk2-text-tile',
  templateUrl: './uk2-text-tile.component.html',
})
export class Uk2TextTileComponent implements AfterViewInit {
  @Input() uk2TextTileDisplayBackground = true;
  @Input() uk2TextTileIsStandaloneTile = true;
  @Input() uk2TextTileSvgIconName: string = Uk2Tier1UtilityEnum.cog;
  @Input() uk2TextTileTitle = '';
  @ViewChild('uk2TextTileContent') uk2TextTileContent!: ElementRef<HTMLDivElement>;

  constructor() {}

  ngAfterViewInit(): void {
    this.validateInputs();
  }

  validateInputs(): void {
    if (this.uk2TextTileTitle === undefined) {
      throw new Error(uk2TextTileErrorConstants.errorUk2TextTileTitle);
    }

    if (
      this.uk2TextTileContent.nativeElement.childNodes.length === 0 ||
      this.uk2TextTileContent.nativeElement.innerHTML.trim().length === 0
    ) {
      throw new Error(uk2TextTileErrorConstants.errorUk2TextTileContent);
    }
  }

  getTextTileClasses(): string[] {
    return [
      'uk2-text-tile-base',
      this.uk2TextTileDisplayBackground ? 'uk2-text-tile-with-background' : 'uk2-text-tile-without-background',
      this.uk2TextTileIsStandaloneTile ? 'uk2-text-tile-standalone' : 'uk2-text-tile-nonstandalone',
    ];
  }
}
