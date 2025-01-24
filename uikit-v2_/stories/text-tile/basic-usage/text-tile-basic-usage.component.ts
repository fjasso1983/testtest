import { Component, Input, OnInit } from '@angular/core';
import { Uk2IconRegistryService } from '@axos/uikit-v2-lib';

@Component({
  selector: 'app-text-tile',
  templateUrl: './text-tile-basic-usage.component.html',
  styleUrls: ['./text-tile-basic-usage.component.scss', '../../../projects/uikit-v2-lib/src/styles/uk2.scss'],
})
export class TextTileBasicUsageComponent implements OnInit {
  @Input() uk2TextTileSvgIconName = '';
  @Input() uk2TextTileTitle = '';
  @Input() uk2TextTileContent = '';
  @Input() uk2TextTileDisplayBackground = true;
  @Input() uk2TextTileIsStandaloneTile = true;

  constructor(private iconRegistryService: Uk2IconRegistryService) {}

  ngOnInit(): void {
    this.iconRegistryService.registerAllCategories();
  }
}
