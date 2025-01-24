import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  inject,
  HostBinding,
} from '@angular/core';

import { Uk2TooltipSizeEnum } from '../../uk2-tooltip';
import { Uk2TileHeaderTextBehaviorEnum } from './enums';

@Component({
  selector: 'uk2-tile-header-link',
  templateUrl: './uk2-tile-header-link.component.html',
})
export class Uk2TileHeaderLinkComponent implements AfterContentInit {
  @Input() uk2TooltipIconName!: string;
  @Input() uk2ShowTooltip = false;
  @Input() uk2TextBehavior: Uk2TileHeaderTextBehaviorEnum = Uk2TileHeaderTextBehaviorEnum.truncate;
  @Output() uk2ChevronClick = new EventEmitter<void>();

  anchorInside = false;
  smallTooltipSize = Uk2TooltipSizeEnum.small;
  private readonly elementRef = inject(ElementRef);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private element: HTMLElement = this.elementRef.nativeElement;

  ngAfterContentInit() {
    this.anchorInside = this.element.querySelector('a') !== null;
    this.changeDetectorRef.detectChanges();
  }

  @HostBinding('class.uk2-tile-header-truncate') get uk2TileHeaderTruncateClass() {
    return this.uk2TextBehavior === Uk2TileHeaderTextBehaviorEnum.truncate;
  }

  onChevronClick() {
    this.uk2ChevronClick.emit();
  }

  contentChanges() {
    this.anchorInside = this.element.querySelector('a') !== null;
    this.changeDetectorRef.detectChanges();
  }
}
