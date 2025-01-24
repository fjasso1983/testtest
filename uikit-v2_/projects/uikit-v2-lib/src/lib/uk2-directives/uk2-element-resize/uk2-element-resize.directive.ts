import { Directive, HostListener, ElementRef, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { uk2ElementPositionResize } from '../uk2-element-resize/enums';

@Directive({
  selector: '[uk2ElementResize]',
})
export class Uk2ElementResizeDirective implements AfterViewInit {
  @Input() uk2Width!: string | number | undefined;
  @Input() uk2MinWidth!: string | number | undefined;
  @Input() uk2MaxWidth!: string | number | undefined;
  @Input() uk2Position: uk2ElementPositionResize = uk2ElementPositionResize.Right;
  @Input() uk2IsElementResizable = false;
  //@Input() uk2IsPanelResizable = false;
  @Input() isLoading = false;
  @Output() elementClosed = new EventEmitter<void>();
  //@Output() panelClosed = new EventEmitter<void>();

  public isGrabbing = false;
  private resizableGrabberWidth = 16;

  constructor(public el: ElementRef) {}

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
    console.log('size properties', this.uk2MinWidth, ' ', this.uk2MaxWidth, ' ', this.uk2Width);

    //this.updateWidth(100);
    this.updateWidth(75);

    this.updateWidth(this.uk2Width);

    /* if (this.uk2IsElementResizable && !this.isLoading) {
      const grabbers = this.el.nativeElement.getElementsByClassName('uk2-panel-grabber') as HTMLCollection;
      var grabber = grabbers[0] as HTMLElement;
      grabber.style.visibility = 'visible';
      if (this.uk2Position === 'right') {
        grabber.classList.add('uk2-grabber-resize-left');
      } else {
        grabber.classList.add('uk2-grabber-resize-right');
      }
    } */
  }
  private updateWidth(width: string | number | undefined): void {
    console.log('updateWidth', this.el.nativeElement.style);

    //this.elementRef.nativeElement.style.width = typeof width === 'number' ? `${width}px` : width;
    this.el.nativeElement.style.width = typeof width === 'number' ? `${width}%` : width;
  }

  newWidth(width: number) {
    const newWidth = this.el.nativeElement.clientWidth + width;
    if (newWidth > this.uk2MinWidth! && newWidth < this.uk2MaxWidth!) {
      this.el.nativeElement.style.width = newWidth + 'px';
    } else if (newWidth + 100 < this.uk2MinWidth!) {
      this.elementClosed.emit();
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    //console.log('on directive mousemove');
    /* if (this.isGrabbing) {
      if (this.uk2Position === 'right') {
        this.newWidth(this.el.nativeElement.offsetLeft - event.clientX);
      } else {
        this.newWidth(event.clientX - this.el.nativeElement.clientWidth);
      }
      event.stopPropagation();
    } */
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    //console.log('on directive mouseup');
    /*   if (this.isGrabbing) {
      this.isGrabbing = false;
      event.stopPropagation();
    } */
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    if (this.inDragArea(event) && this.uk2IsElementResizable) {
      this.isGrabbing = true;
      event.stopPropagation();
    }
  }

  private inDragArea(event: MouseEvent): boolean {
    if (this.uk2Position === 'right') {
      return event.clientX - this.el.nativeElement.offsetLeft < this.resizableGrabberWidth;
    }

    return this.el.nativeElement.clientWidth - event.clientX < this.resizableGrabberWidth;
  }
}
