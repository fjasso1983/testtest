import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Uk2AnchorDirective } from './uk2-anchor/uk2-anchor.directive';
import { Uk2HintDisplayPatternDirective } from './uk2-hint-display/uk2-hint-display-pattern.directive';
import { Uk2DatePickerDirective, Uk2DatepickerClearButtonDirective } from './uk2-datepicker';
import { Uk2InputDirective } from './uk2-input/uk2-input.directive';
import { Uk2DropdownDirective } from './uk2-dropdown/uk2-dropdown-single/uk2-dropdown.directive';
import { Uk2InternalUtilsServicesModule } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';
import { Uk2TextButtonDirective } from './uk2-buttons/uk2-text-button';
import { Uk2TextIconButtonDirective } from './uk2-buttons/uk2-text-icon-button';
import { Uk2CheckboxDirective } from './uk2-checkbox/uk2-checkbox.directive';
import { Uk2PrimaryButtonDirective } from './uk2-buttons/uk2-primary-button';
import { Uk2NoteCardDirective } from './uk2-note-card';
import { Uk2SecondaryButtonDirective } from './uk2-buttons/uk2-secondary-button';
import { Uk2CheckboxSelectionCardsDirective } from './uk2-checkbox-selection-cards/uk2-checkbox-selection-cards.directive';
import { Uk2ContextualTopBarActionRowDirective, Uk2ContextualTopBarDirective } from './uk2-contextual-top-bar';
import { Uk2ButtonToggleGroupDirective } from './uk2-button-toggle-group';
import {
  Uk2PrimaryIconButtonDirective,
  Uk2SecondaryIconButtonDirective,
  Uk2LabeledIconButtonDirective,
  Uk2MenuButtonDirective,
} from './uk2-buttons';
import { Uk2StretchTabsDirective } from './uk2-stretch-tabs';
import { Uk2DeterminateProgressBarDirective } from './uk2-determinate-progress-bar';
import { Uk2LoadingSkeletonDirective } from './uk2-loading-skeleton';
import { Uk2RadioButtonDirective } from './uk2-radio-button/uk2-radio-button.directive';
import { Uk2BottomSheetLinkDirective } from './uk2-bottom-sheet-link';
import { Uk2TagInputChipsDirective } from './uk2-tag-input-chips';
import { Uk2DropdownMultipleDirective } from './uk2-dropdown/uk2-dropdown-multiple';
import { Uk2ButtonInlineLoadingDirective } from './uk2-button-inline-loading';
import { Uk2DropdownAriaOwnsDirective } from './uk2-dropdown';
import { Uk2NotificationBadgeDirective } from './uk2-notification-badge';
import {
  Uk2ProductTileActionsDirective,
  Uk2ProductTileComponentDirective,
  Uk2ProductTileDirective,
  Uk2ProductTileGridDirective,
  Uk2ProductTileHeaderDirective,
} from './uk2-product-tile';
import { Uk2JustifyContentCenterDirective, Uk2JustifyContentSpaceBetweenDirective } from './uk2-layout';
import { Uk2VerticalTabGroupDirective } from './uk2-vertical-tabs';
import { Uk2HorizontalLabelAlignedTabsDirective } from './uk2-horizontal-label-aligned-tabs';
import {
  Uk2SearchInputClearIconDirective,
  Uk2SearchMenuDirective,
  Uk2SearchMenuItemDirective,
  Uk2SearchMenuOverlayDirective,
} from './uk2-search-menu';
import {
  Uk2FileViewerContainerDirective,
  Uk2FileViewerHeaderDirective,
  Uk2FileViewerFooterDirective,
  Uk2FileViewerZoomControlDirective,
  Uk2FileViewerPageControlDirective,
  Uk2FileViewerActionControlDirective,
  Uk2FileViewerFileNameDirective,
  Uk2FileViewerElementPositionDirective,
} from './uk2-file-viewer';
//import { Uk2ElementResizeDirective } from './uk2-element-resize';
import { Uk2ElementResizeModule } from './uk2-element-resize';
import { Uk2ElementPositionModule } from './uk2-element-position';

@NgModule({
  declarations: [
    Uk2AnchorDirective,
    Uk2HintDisplayPatternDirective,
    Uk2InputDirective,
    Uk2TextButtonDirective,
    Uk2PrimaryButtonDirective,
    Uk2SecondaryButtonDirective,
    Uk2MenuButtonDirective,
    Uk2CheckboxDirective,
    Uk2NoteCardDirective,
    Uk2DeterminateProgressBarDirective,
    Uk2DropdownDirective,
    Uk2CheckboxSelectionCardsDirective,
    Uk2ContextualTopBarDirective,
    Uk2ContextualTopBarActionRowDirective,
    Uk2ButtonToggleGroupDirective,
    Uk2PrimaryIconButtonDirective,
    Uk2StretchTabsDirective,
    Uk2SecondaryIconButtonDirective,
    Uk2DatePickerDirective,
    Uk2TextIconButtonDirective,
    Uk2LabeledIconButtonDirective,
    Uk2LoadingSkeletonDirective,
    Uk2RadioButtonDirective,
    Uk2BottomSheetLinkDirective,
    Uk2DropdownAriaOwnsDirective,
    Uk2DropdownMultipleDirective,
    Uk2TagInputChipsDirective,
    Uk2ButtonInlineLoadingDirective,
    Uk2DatepickerClearButtonDirective,
    Uk2NotificationBadgeDirective,
    Uk2VerticalTabGroupDirective,
    Uk2ProductTileDirective,
    Uk2JustifyContentSpaceBetweenDirective,
    Uk2JustifyContentCenterDirective,
    Uk2ProductTileActionsDirective,
    Uk2ProductTileComponentDirective,
    Uk2ProductTileHeaderDirective,
    Uk2ProductTileGridDirective,
    Uk2HorizontalLabelAlignedTabsDirective,
    Uk2SearchMenuDirective,
    Uk2SearchMenuItemDirective,
    Uk2SearchMenuOverlayDirective,
    Uk2SearchInputClearIconDirective,
    Uk2FileViewerContainerDirective,
    Uk2FileViewerHeaderDirective,
    Uk2FileViewerFooterDirective,
    Uk2FileViewerZoomControlDirective,
    Uk2FileViewerPageControlDirective,
    Uk2FileViewerActionControlDirective,
    Uk2FileViewerFileNameDirective,
    Uk2FileViewerElementPositionDirective,
  ],
  imports: [CommonModule, Uk2InternalUtilsServicesModule],
  exports: [
    Uk2AnchorDirective,
    Uk2HintDisplayPatternDirective,
    Uk2InputDirective,
    Uk2TextButtonDirective,
    Uk2CheckboxDirective,
    Uk2PrimaryButtonDirective,
    Uk2NoteCardDirective,
    Uk2DeterminateProgressBarDirective,
    Uk2DropdownDirective,
    Uk2SecondaryButtonDirective,
    Uk2MenuButtonDirective,
    Uk2CheckboxSelectionCardsDirective,
    Uk2ContextualTopBarDirective,
    Uk2ContextualTopBarActionRowDirective,
    Uk2ButtonToggleGroupDirective,
    Uk2PrimaryIconButtonDirective,
    Uk2StretchTabsDirective,
    Uk2SecondaryIconButtonDirective,
    Uk2DatePickerDirective,
    Uk2TextIconButtonDirective,
    Uk2LabeledIconButtonDirective,
    Uk2LoadingSkeletonDirective,
    Uk2RadioButtonDirective,
    Uk2BottomSheetLinkDirective,
    Uk2DropdownAriaOwnsDirective,
    Uk2DropdownMultipleDirective,
    Uk2TagInputChipsDirective,
    Uk2ButtonInlineLoadingDirective,
    Uk2DatepickerClearButtonDirective,
    Uk2NotificationBadgeDirective,
    Uk2VerticalTabGroupDirective,
    Uk2ProductTileDirective,
    Uk2JustifyContentSpaceBetweenDirective,
    Uk2JustifyContentCenterDirective,
    Uk2ProductTileActionsDirective,
    Uk2ProductTileComponentDirective,
    Uk2ProductTileHeaderDirective,
    Uk2ProductTileGridDirective,
    Uk2HorizontalLabelAlignedTabsDirective,
    Uk2SearchMenuDirective,
    Uk2SearchMenuItemDirective,
    Uk2SearchMenuOverlayDirective,
    Uk2SearchInputClearIconDirective,
    Uk2FileViewerContainerDirective,
    Uk2FileViewerHeaderDirective,
    Uk2FileViewerFooterDirective,
    Uk2FileViewerZoomControlDirective,
    Uk2FileViewerPageControlDirective,
    Uk2FileViewerActionControlDirective,
    Uk2FileViewerFileNameDirective,
    Uk2FileViewerElementPositionDirective,
    Uk2ElementPositionModule,
    Uk2ElementResizeModule,
  ],
})
export class Uk2DirectivesModule {}
