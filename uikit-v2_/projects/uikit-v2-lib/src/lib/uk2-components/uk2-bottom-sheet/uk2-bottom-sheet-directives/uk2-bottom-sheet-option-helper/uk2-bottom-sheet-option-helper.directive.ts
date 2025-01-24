import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[uk2BottomSheetOptionHelper]',
})
export class Uk2BottomSheetOptionHelperDirective implements OnInit {
  @Input() uk2BottomSheetOptionHelper!: HTMLElement;
  constructor(private element: ElementRef) {}

  ngOnInit() {
    if (this.uk2BottomSheetOptionHelper) this.element.nativeElement.appendChild(this.uk2BottomSheetOptionHelper);
  }
}
