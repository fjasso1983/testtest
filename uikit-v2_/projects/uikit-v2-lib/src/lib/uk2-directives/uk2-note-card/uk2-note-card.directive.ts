import { Directive, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { IUk2IsLoading, MATERIAL_CLASSES } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';
import { uk2NoteCardConstants } from './constants/constants';
import { Uk2NoteCardFontSizeEnum } from './enums/uk2-note-card-font-size.enum';
@Directive({
  selector: 'mat-card[uk2NoteCard]',
})
export class Uk2NoteCardDirective implements OnInit, OnChanges, IUk2IsLoading {
  @Input() uk2IsLoading = false;
  @Input() uk2NoteCardFontSize: Uk2NoteCardFontSizeEnum = Uk2NoteCardFontSizeEnum.small;
  @Input() uk2NoteCardHasCheckbox = false;

  uk2NoteCardSkeletonTemplate: HTMLElement = this.renderer.createElement('div');
  matCard: HTMLElement = this.elementRef.nativeElement.closest(MATERIAL_CLASSES.card);

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.changeFontSize(this.uk2NoteCardFontSize);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      !this.uk2NoteCardSkeletonTemplate.classList.contains(uk2NoteCardConstants.cssClasses.skeletonNoCheckbox) &&
      !this.uk2NoteCardSkeletonTemplate.classList.contains(uk2NoteCardConstants.cssClasses.skeleton)
    ) {
      this.uk2NoteCardSkeletonTemplate = this.createSkeletonTemplate(
        this.elementRef.nativeElement as HTMLElement,
        this.uk2NoteCardHasCheckbox
      );
    }
    if (changes.uk2IsLoading) {
      this.toggleIsLoading(
        changes.uk2IsLoading.currentValue,
        this.elementRef.nativeElement as HTMLElement,
        this.uk2NoteCardSkeletonTemplate
      );
    }
    if (changes.uk2NoteCardFontSize) {
      this.changeFontSize(this.uk2NoteCardFontSize);
    }
  }
  private changeFontSize(uk2NoteCardFontSize: Uk2NoteCardFontSizeEnum): void {
    switch (uk2NoteCardFontSize) {
      case Uk2NoteCardFontSizeEnum.small:
        this.elementRef.nativeElement.classList.remove(uk2NoteCardConstants.cssClasses.largeFont);
        this.elementRef.nativeElement.classList.add(uk2NoteCardConstants.cssClasses.smallFont);
        break;
      case Uk2NoteCardFontSizeEnum.large:
        this.elementRef.nativeElement.classList.remove(uk2NoteCardConstants.cssClasses.smallFont);
        this.elementRef.nativeElement.classList.add(uk2NoteCardConstants.cssClasses.largeFont);
        break;
      default:
        this.elementRef.nativeElement.classList.remove(uk2NoteCardConstants.cssClasses.largeFont);
        this.elementRef.nativeElement.classList.add(uk2NoteCardConstants.cssClasses.smallFont);
        break;
    }
  }
  private toggleIsLoading(uk2IsLoading: Boolean, target: HTMLElement, template: HTMLElement) {
    if (uk2IsLoading) {
      this.renderer.addClass(target, uk2NoteCardConstants.cssClasses.hidden);
      this.renderer.removeClass(template, uk2NoteCardConstants.cssClasses.hidden);
    } else {
      this.renderer.removeClass(target, uk2NoteCardConstants.cssClasses.hidden);
      this.renderer.addClass(template, uk2NoteCardConstants.cssClasses.hidden);
    }
  }

  private createSkeletonTemplate(target: HTMLElement, hasCheckbox: boolean) {
    const template = this.renderer.createElement('div'),
      checkboxSkeleton = this.renderer.createElement('div'),
      textSkeletonContainer = this.renderer.createElement('div'),
      textSkeleton = this.renderer.createElement('div'),
      textSkeleton2 = this.renderer.createElement('div'),
      textSkeleton3 = this.renderer.createElement('div'),
      textSkeleton4 = this.renderer.createElement('div'),
      containerCard = this.renderer.createElement('div');

    if (hasCheckbox) {
      this.renderer.addClass(template, uk2NoteCardConstants.cssClasses.skeleton);
    } else {
      this.renderer.addClass(template, uk2NoteCardConstants.cssClasses.skeletonNoCheckbox);
    }
    this.renderer.addClass(checkboxSkeleton, uk2NoteCardConstants.cssClasses.skeletonCheckboxContainer);
    this.renderer.addClass(containerCard, uk2NoteCardConstants.cssClasses.skeletonContainer);
    this.renderer.appendChild(template, containerCard);
    this.renderer.appendChild(containerCard, checkboxSkeleton);
    this.renderer.addClass(textSkeletonContainer, uk2NoteCardConstants.cssClasses.textSkeleton);
    this.renderer.appendChild(containerCard, textSkeletonContainer);
    this.renderer.addClass(textSkeleton, uk2NoteCardConstants.cssClasses.startText);
    this.renderer.appendChild(textSkeletonContainer, textSkeleton);
    this.renderer.addClass(textSkeleton2, uk2NoteCardConstants.cssClasses.textSkeleton2);
    this.renderer.appendChild(textSkeletonContainer, textSkeleton2);
    this.renderer.addClass(textSkeleton4, uk2NoteCardConstants.cssClasses.textSkeleton4);
    this.renderer.appendChild(textSkeletonContainer, textSkeleton4);
    this.renderer.addClass(textSkeleton3, uk2NoteCardConstants.cssClasses.textSkeleton3);
    this.renderer.appendChild(textSkeletonContainer, textSkeleton3);
    this.renderer.addClass(template, uk2NoteCardConstants.cssClasses.hidden);
    this.renderer.insertBefore(this.renderer.parentNode(target), template, target);

    return template;
  }
}
