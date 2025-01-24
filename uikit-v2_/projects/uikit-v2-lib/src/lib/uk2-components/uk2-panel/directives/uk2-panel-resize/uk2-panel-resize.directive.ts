import { Directive, HostListener, ElementRef, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { uk2PanelPosition } from '../../enums';

@Directive({
  selector: '[uk2PanelResize]',
})
export class Uk2PanelResizeDirective implements AfterViewInit {
  @Input() uk2MinWidth!: string | number | undefined;
  @Input() uk2MaxWidth!: string | number | undefined;
  @Input() uk2Position: uk2PanelPosition = uk2PanelPosition.Right;
  @Input() uk2IsPanelResizable = false;
  @Input() isLoading = false;
  @Output() panelClosed = new EventEmitter<void>();

  public isGrabbing = false;
  private resizableGrabberWidth = 16;

  constructor(public el: ElementRef) {}

  ngAfterViewInit(): void {
    if (this.uk2IsPanelResizable && !this.isLoading) {
      const grabbers = this.el.nativeElement.getElementsByClassName('uk2-panel-grabber') as HTMLCollection;
      var grabber = grabbers[0] as HTMLElement;
      grabber.style.visibility = 'visible';
      if (this.uk2Position === 'right') {
        grabber.classList.add('uk2-grabber-resize-left');
      } else {
        grabber.classList.add('uk2-grabber-resize-right');
      }
    }
  }

  newWidth(width: number) {
    const newWidth = this.el.nativeElement.clientWidth + width;
    if (newWidth > this.uk2MinWidth! && newWidth < this.uk2MaxWidth!) {
      this.el.nativeElement.style.width = newWidth + 'px';
    } else if (newWidth + 100 < this.uk2MinWidth!) {
      this.panelClosed.emit();
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.isGrabbing) {
      if (this.uk2Position === 'right') {
        this.newWidth(this.el.nativeElement.offsetLeft - event.clientX);
      } else {
        this.newWidth(event.clientX - this.el.nativeElement.clientWidth);
      }
      event.stopPropagation();
    }
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    if (this.isGrabbing) {
      this.isGrabbing = false;
      event.stopPropagation();
    }
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    if (this.inDragArea(event) && this.uk2IsPanelResizable) {
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
