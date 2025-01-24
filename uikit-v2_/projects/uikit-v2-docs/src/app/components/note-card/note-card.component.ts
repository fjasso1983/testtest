import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Uk2NoteCardFontSizeEnum } from '@axos/uikit-v2-lib';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss'],
})
export class NoteCardComponent implements OnInit, OnDestroy {
  isLoading = false;
  fontSize = Uk2NoteCardFontSizeEnum;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.elementRef.nativeElement.closest('.side-nav-content').classList.add('no-padding');
  }

  toggleLoading() {
    this.isLoading = !this.isLoading;
  }

  ngOnDestroy(): void {
    this.elementRef.nativeElement.closest('.side-nav-content').classList.remove('no-padding');
  }
}
