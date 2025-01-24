import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: 'a[uk2Anchor]',
})
export class Uk2AnchorDirective implements OnInit {
  constructor(private el: ElementRef<HTMLAnchorElement>) {}
  ngOnInit(): void {
    this.el.nativeElement.classList.add('uk2-link');
  }
}
