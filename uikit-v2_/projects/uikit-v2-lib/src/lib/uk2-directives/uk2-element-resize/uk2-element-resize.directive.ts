import { Directive, HostListener, ElementRef, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[uk2ElementResize]',
})
export class Uk2ElementResizeDirective implements AfterViewInit {
  @Input() uk2Height!: string | number | undefined;
  @Input() uk2MinHeight!: number;
  @Input() uk2MaxHeight!: number;
  @Input() uk2IsElementResizable = true;
  @Input() isLoading = false;
  @Input() showElement!: boolean;
  @Output() elementClosed = new EventEmitter<void>();

  private element: HTMLElement = this.el.nativeElement;
  private isGrabbing = false;
  private startY: number = 0;
  private startHeight: number = 0;
  private isResizing = false;
  private touchTimeout: any;

  constructor(public el: ElementRef) {}

  ngAfterViewInit(): void {
    if (!this.isLoading) {
      const grabber = this.element.querySelector('.uk2-bottom-sheet-grabber') as HTMLElement;
      grabber.style.visibility = 'visible';
    }
  }

  newHeight(height: number) {
    if (height > this.uk2MinHeight && height < this.uk2MaxHeight) {
      this.el.nativeElement.style.height = `${height}px`;
    } else if (height + 10 < this.uk2MinHeight) {
      this.elementClosed.emit();
    }
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    if (this.uk2IsElementResizable) {
      this.touchTimeout = setTimeout(() => {
        this.isGrabbing = true;
        this.startY = event.touches[0].clientY;
        this.startHeight = this.el.nativeElement.offsetHeight;
        this.isResizing = true;
        event.preventDefault();
      }, 200); // 200ms delay to differentiate between tap and resize
    }
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    if (this.isGrabbing) {
      const newHeight = this.startHeight + (this.startY - event.touches[0].clientY);
      this.newHeight(newHeight);
      event.preventDefault();
    }
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    clearTimeout(this.touchTimeout);
    if (this.isGrabbing) {
      this.isGrabbing = false;
      this.isResizing = false;
      event.preventDefault();
    }
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.isResizing) {
      event.stopPropagation();
    }
  }
}
