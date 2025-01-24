import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

import { Uk2ButtonSizeEnum } from '@axos/uikit-v2-lib/src/lib/uk2-directives';
import { IUk2IsLoading, MATERIAL_CLASSES, UK2_BREAKPOINTS } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';

import { Uk2MenuButtonItemHeight, Uk2MenuButtonScrollStrategy, Uk2MenuButtonSelectionTypeEnum } from './enums';
import { Uk2MenuButtonCSSProperty, Uk2MenuButtonItem } from './types';
import { BreakpointObserver } from '@angular/cdk/layout';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { uk2MenuButtonConstants } from './constants';
import { Uk2MenuButtonOverlayComponent } from './uk2-menu-button-overlay/uk2-menu-button-overlay.component';

@Component({
  selector: 'uk2-menu-button',
  templateUrl: './uk2-menu-button.component.html',
  exportAs: 'uk2MenuButton',
})
export class Uk2MenuButtonComponent implements AfterContentInit, AfterViewInit, OnChanges, IUk2IsLoading {
  @ContentChild('option', { static: false }) optionTemplateRef!: TemplateRef<any>;
  @ContentChild('divider', { static: false }) optionDividerLine!: TemplateRef<any>;

  @Input() uk2ButtonType: Uk2MenuButtonSelectionTypeEnum = Uk2MenuButtonSelectionTypeEnum.single;
  @Input() uk2KeepLastSelection = true;
  @Input() uk2ItemList: Uk2MenuButtonItem[] = [];
  @Input() uk2ActiveStateText = '';
  @Input() uk2IsDisabled = false;
  @Input() uk2IsLoading = false;
  @Input() uk2DefaultStateText = '';
  @Input() uk2SvgIconName = '';
  @Input() uk2CSSPortalProperties: Uk2MenuButtonCSSProperty[] = [];
  @Input() uk2IconButtonSizeClass: string | undefined;
  @Input() uk2ContentClass = uk2MenuButtonConstants.defaultContentClass;
  @Input() uk2DividerLineClass = uk2MenuButtonConstants.defaultDividerLineClass;
  @Input() uk2IsIconOnly = false;
  @Input() uk2DisplayBorder = true;
  @Input() uk2DisplayBadge = false;
  @Input() uk2BackdropIsEnabled = true;
  @Input() uk2BackdropIsHidden = true;
  @Input() uk2BackdropCanBeClosedWhenHasBeenClicked = true;
  @Input() uk2BackdropClass = uk2MenuButtonConstants.defaultBackdropClass;
  @Input() uk2ScrollStrategy = Uk2MenuButtonScrollStrategy.block;
  @Input() uk2BottomSheetTitle?: string;
  @Input() uk2BottomSheetDescription?: string;

  @Output() uk2OnItemSelected = new EventEmitter<Uk2MenuButtonItem[]>();
  @Output() uk2BottomSheetOpened = new EventEmitter<void>();
  /**
   * @deprecated
   * uk2ButtonSize is no longer required as input property, it is now a constant value
   * since all instances of uk2-menu-button are using the same button size.
   */
  readonly uk2ButtonSize: Uk2ButtonSizeEnum = Uk2ButtonSizeEnum.small;

  @ViewChild('menuButton', { read: ElementRef }) button?: ElementRef;
  @ViewChild(Uk2MenuButtonOverlayComponent) uk2MenuButtonOverlayComponent!: Uk2MenuButtonOverlayComponent;
  buttonLabel!: HTMLElement;
  destroyed = new Subject<void>();
  selectedOptions: Uk2MenuButtonItem[] = [];
  buttonType = Uk2MenuButtonSelectionTypeEnum;
  menuItemsContainerMinHeight!: number;
  isMobileSize = false;

  private menuItemDefaultHeight = Uk2MenuButtonItemHeight.default;

  constructor(
    private el: ElementRef<HTMLElement>,
    public viewContainerRef: ViewContainerRef,
    private breakpointObserver: BreakpointObserver,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngAfterContentInit() {
    this.buttonLabel = this.el.nativeElement.querySelector(`.${MATERIAL_CLASSES.buttonLabel}`)!;
  }

  ngAfterViewInit() {
    this.updateLabelText();
    this.breakpointObserver
      .observe(['(max-width: ' + UK2_BREAKPOINTS.md + 'px)'])
      .pipe(takeUntil(this.destroyed))
      .subscribe(result => {
        this.isMobileSize = result.matches;
        this.updateLabelText();
        this.changeDetectorRef.markForCheck();
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.uk2ItemList) {
      this.handleChangesItemList(changes);
    }

    if (changes.uk2DefaultStateText && !changes.uk2DefaultStateText.firstChange) {
      this.uk2DefaultStateText = changes.uk2DefaultStateText.currentValue;
      this.updateLabelText();
    }

    if (changes.uk2ActiveStateText && !changes.uk2ActiveStateText.firstChange) {
      this.uk2ActiveStateText = changes.uk2ActiveStateText.currentValue;
      this.updateLabelText();
    }

    if (changes.uk2IsIconOnly && !changes.uk2IsIconOnly.firstChange) {
      this.uk2IsIconOnly = changes.uk2IsIconOnly.currentValue;
      this.updateLabelText();
    }
  }

  handleChangesItemList(changes: SimpleChanges) {
    if (changes.uk2ItemList.currentValue?.length) {
      this.menuItemsContainerMinHeight = changes.uk2ItemList.currentValue.length * this.menuItemDefaultHeight;
    }
    switch (this.uk2ButtonType) {
      case Uk2MenuButtonSelectionTypeEnum.multiple: {
        this.selectedOptions = changes.uk2ItemList.currentValue.filter((item: Uk2MenuButtonItem) => item.isSelected);
        break;
      }
      case Uk2MenuButtonSelectionTypeEnum.single: {
        changes.uk2ItemList.currentValue.every((item: Uk2MenuButtonItem) => {
          if (item.isSelected) {
            this.selectedOptions[0] = item;
          }

          return !item.isSelected;
        });
        break;
      }
    }
  }

  toggleFlyout() {
    this.uk2MenuButtonOverlayComponent.uk2ItemList = this.uk2ItemList;
    this.uk2MenuButtonOverlayComponent.open();
    this.uk2BottomSheetOpened.emit();
  }

  selectOption(index: number) {
    const selectedItem = this.uk2ItemList[index];
    const isSelected = !selectedItem.isSelected;
    switch (this.uk2ButtonType) {
      case Uk2MenuButtonSelectionTypeEnum.single:
        if (this.selectedOptions.length > 0) {
          const currentSelectedItem = this.selectedOptions[0];
          const isNewSelectionDiffThanCurrent = currentSelectedItem.value !== selectedItem.value;
          if (isNewSelectionDiffThanCurrent) {
            selectedItem.isSelected = isSelected;
            currentSelectedItem.isSelected = false;
            this.selectedOptions = [this.uk2ItemList[index]];
            this.uk2OnItemSelected.emit(this.selectedOptions);
            this.updateLabelText();
            this.uk2MenuButtonOverlayComponent.close();

            return;
          }
          if (!this.uk2KeepLastSelection) {
            selectedItem.isSelected = isSelected;
            currentSelectedItem.isSelected = false;
            this.selectedOptions = [];
            this.uk2OnItemSelected.emit(this.selectedOptions);
            this.updateLabelText();
            this.uk2MenuButtonOverlayComponent.close();

            return;
          }

          return;
        } else {
          selectedItem.isSelected = isSelected;
          this.selectedOptions = [selectedItem];
          this.uk2OnItemSelected.emit(this.selectedOptions);
          this.uk2MenuButtonOverlayComponent.close();

          this.updateLabelText();
        }
        break;
      case Uk2MenuButtonSelectionTypeEnum.multiple: {
        const optionIsAlreadySelected = this.selectedOptions.find(option => option.value === selectedItem.value);
        selectedItem.isSelected = isSelected;
        if (!optionIsAlreadySelected) {
          this.selectedOptions = [...this.selectedOptions, selectedItem];
        } else if (!this.uk2KeepLastSelection && optionIsAlreadySelected && this.selectedOptions.length <= 1) {
          this.selectedOptions = [];
        } else {
          this.selectedOptions = this.selectedOptions.filter(option => option.value !== selectedItem.value);
        }
        this.uk2OnItemSelected.emit(this.selectedOptions);
        this.updateLabelText();

        break;
      }
      default:
        break;
    }
  }

  multipleOptionsSelect(options: Uk2MenuButtonItem[]) {
    this.selectedOptions = options.filter(option => option.isSelected);
    this.uk2ItemList = options;
    this.uk2OnItemSelected.emit(this.selectedOptions);
    this.updateLabelText();
  }

  close() {
    this.uk2MenuButtonOverlayComponent?.close();
  }

  isAnyOptionSelected(): boolean {
    return this.uk2MenuButtonOverlayComponent?.isAnyOptionSelected();
  }

  applySelectedOptions() {
    this.uk2MenuButtonOverlayComponent?.handleBottomSheetApplyButton();
  }

  private updateLabelText() {
    switch (this.uk2ButtonType) {
      case Uk2MenuButtonSelectionTypeEnum.multiple: {
        this.setMultipleTypeLabel();
        break;
      }
      case Uk2MenuButtonSelectionTypeEnum.single: {
        this.setSingleTypeLabel();
        break;
      }
    }
  }

  private setMultipleTypeLabel() {
    let buttonText = this.uk2DefaultStateText;
    if (this.selectedOptions.length > 1 || (this.isMobileSize && this.selectedOptions.length > 0)) {
      buttonText = this.uk2ActiveStateText;
    } else if (this.selectedOptions.length === 1) {
      buttonText = this.selectedOptions[0].text;
    }
    this.setTruncationClass(this.selectedOptions.length == 1 && !this.isMobileSize);
    this.setActiveClass(this.selectedOptions.length > 0);
    this.setButtonLabelInnerText(buttonText);
  }

  private setSingleTypeLabel() {
    let buttonText = this.uk2DefaultStateText;
    const selectedOption = this.selectedOptions[0];
    if (selectedOption) {
      if (this.isMobileSize) {
        buttonText = this.uk2ActiveStateText;
      } else {
        buttonText = selectedOption.text;
      }
    }
    this.setTruncationClass(selectedOption !== undefined && !this.isMobileSize);
    this.setActiveClass(selectedOption !== undefined);
    this.setButtonLabelInnerText(buttonText);
  }

  private setButtonLabelInnerText(buttonText: string): void {
    this.buttonLabel.innerText = this.uk2IsIconOnly ? '' : buttonText;
  }

  private setTruncationClass(addTruncation: boolean) {
    if (addTruncation) {
      this.button!.nativeElement.classList.add('label-truncate');
    } else {
      this.button!.nativeElement.classList.remove('label-truncate');
    }
  }

  private setActiveClass(active: boolean) {
    if (active) {
      this.button!.nativeElement.classList.add('active');
    } else {
      this.button!.nativeElement.classList.remove('active');
    }
  }
}
