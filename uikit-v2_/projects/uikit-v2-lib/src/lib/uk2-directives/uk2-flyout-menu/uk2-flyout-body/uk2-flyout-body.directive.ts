import { Directive, ElementRef, HostBinding, OnInit, inject } from '@angular/core';

@Directive({
  selector: 'div[uk2FlyoutMenuBody]',
})
export class Uk2FlyoutMenuBodyDirective implements OnInit {
  @HostBinding('class.uk2-flyout-menu-body') uk2Class = true;
  @HostBinding('class.uk2-scrollbar--medium') scrollClass = true;

  elementRef = inject(ElementRef);
  nativeElement = this.elementRef.nativeElement;

  ngOnInit() {
    this.addGradientEffect();
    this.addScrollEvent();
  }

  addGradientEffect() {
    if (this.nativeElement.scrollHeight > this.nativeElement.clientHeight) {
      this.nativeElement.classList.add('uk2-gradient-margin');
    }
  }

  addScrollEvent() {
    if (this.nativeElement.onscroll) {
      return;
    }

    this.nativeElement.onscroll = () => {
      const { scrollTop, scrollHeight, offsetHeight } = this.getScrollData();

      if (scrollTop >= scrollHeight - offsetHeight - 5) {
        this.nativeElement.classList.remove('uk2-gradient-margin');
      } else {
        this.nativeElement.classList.add('uk2-gradient-margin');
      }
    };
  }

  private getScrollData() {
    return {
      scrollTop: this.nativeElement.scrollTop,
      scrollHeight: this.nativeElement.scrollHeight,
      offsetHeight: this.nativeElement.offsetHeight,
    };
  }
}
