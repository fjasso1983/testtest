import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Uk2Tier1UtilityEnum } from '@axos/uikit-v2-lib';

@Component({
  selector: 'app-text-tile',
  templateUrl: './text-tile.component.html',
  styleUrls: ['./text-tile.component.scss'],
})
export class TextTileComponent implements OnInit, OnDestroy {
  utilityIcons = Uk2Tier1UtilityEnum;
  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.elementRef.nativeElement.closest('.side-nav-content').classList.add('background-grey');
  }

  ngOnDestroy(): void {
    this.elementRef.nativeElement.closest('.side-nav-content').classList.remove('background-grey');
  }
}
