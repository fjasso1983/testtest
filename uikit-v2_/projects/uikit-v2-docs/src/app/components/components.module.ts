import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  Uk2DirectivesModule,
  Uk2ValueMovementModule,
  Uk2PasswordRulesModule,
  Uk2SuggestedActionModule,
  Uk2BrandTopBarModule,
  Uk2ModalModule,
  Uk2BreadCrumbsModule,
  Uk2ToastModule,
  Uk2PoweredByModule,
  Uk2ProgressBarModule,
  Uk2TooltipModule,
  Uk2MenuButtonModule,
  Uk2SliderModule,
  Uk2BottomSheetModule,
  Uk2AlertBannerModule,
  Uk2TextTileModule,
  Uk2MessagingCardModule,
  Uk2TimerModule,
  Uk2PanelModule,
  Uk2ListItemModule,
  Uk2FileUploaderDragDropModule,
  Uk2MenuListItemModule,
  Uk2LoadingSpinnerModule,
  Uk2FileUploaderDisplayModule,
  Uk2ElementPositionModule,
  Uk2FlyoutMenuModule,
} from '@axos/uikit-v2-lib';

import { AppMaterialModule } from '../app-material.module';
import { ComponentsRoutingModule } from './components-routing.module';
import { HyperlinkComponent } from './hyperlink/hyperlink.component';
import { InputComponent } from './input/input.component';
import { PasswordRulesComponent } from './password-rules/password-rules.component';
import { TextButtonComponent } from './buttons/text-button/text-button.component';
import { PrimaryButtonComponent } from './buttons/primary-button/primary-button.component';
import { ModalComponent } from './modal/modal.component';
import { SecondaryButtonComponent } from './buttons/secondary-button/secondary-button.component';
import { ValueMovementComponent } from './value-movement/value-movement.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { IconComponent } from './icon/icon.component';
import { SuggestedActionComponent } from './suggested-action/suggested-action.component';
import { BrandTopBarComponent } from './brand-top-bar/brand-top-bar.component';
import { NoteCardComponent } from './note-card/note-card.component';
import { CheckboxSelectionCardsComponent } from './checkbox-selection-cards/checkbox-selection-cards.component';
import { DatePickerComponent } from './datePicker/datePicker.component';
import { ThemingComponent } from './theming/theming.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HomeComponent } from './breadcrumbs/home/home.component';
import { ItemsComponent } from './breadcrumbs/items/items.component';
import { TvGamesComponent } from './breadcrumbs/tv-games/tv-games.component';
import { XboxComponent } from './breadcrumbs/xbox/xbox.component';
import { BreadcrumbsService } from './breadcrumbs/breadcrumbs.service';
import { ToastComponent } from './toast/toast.component';
import { ContextualTopBarComponent } from './contextual-top-bar/contextual-top-bar.component';
import { ParentPageComponent } from './contextual-top-bar/parent-page/parent-page.component';
import { ChildPageComponent } from './contextual-top-bar/child-page/child-page.component';
import { GrandChildPageComponent } from './contextual-top-bar/grand-child-page/grand-child-page.component';
import { ButtonToggleGroupComponent } from './button-toggle-group/button-toggle-group.component';
import { PoweredByComponent } from './powered-by/powered-by.component';
import { PrimaryIconButtonComponent } from './buttons-icon/primary-icon-button/primary-icon-button.component';
import { TabsComponent } from './tabs/tabs.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { SecondaryIconButtonComponent } from './buttons-icon/secondary-icon-button/secondary-icon-button.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { LabeledIconButtonComponent } from './buttons-icon/labeled-icon-button/labeled-icon-button.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { MenuButtonComponent } from './buttons/menu-button/menu-button.component';
import { SliderComponent } from './slider/slider.component';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';
import { AlertBannerComponent } from './alert-banner/alert-banner.component';
import { TypographyComponent } from './typography/typography.component';
import { TextTileComponent } from './text-tile/text-tile.component';
import { MessagingCardComponent } from './messaging-card/messaging-card.component';
import { ScrollbarComponent } from './scrollbar/scrollbar.component';
import { TimerComponent } from './timer/timer.component';
import { ChipsComponent } from './chips/chips.component';
import { PanelComponent } from './panel/panel.component';
import { FlyoutComponent } from './flyout/flyout.component';
import { FileViewerComponent } from './file-viewer/file-viewer.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FileViewerFullScreenComponent } from './file-viewer/file-viewer-full-screen/file-viewer-full-screen.component';
import { FileUploadDragDropComponent } from './file-uploader-drag-drop/file-uploader-drag-drop.component';
import { Uk2ChipModule } from '@axos/uikit-v2-lib';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { FileUploaderPdfViewerComponent } from './file-uploader-drag-drop/file-uploader-pdf-viewer/file-uploader-pdf-viewer.component';

@NgModule({
  declarations: [
    HyperlinkComponent,
    InputComponent,
    PasswordRulesComponent,
    ValueMovementComponent,
    SuggestedActionComponent,
    TextButtonComponent,
    CheckboxComponent,
    IconComponent,
    PrimaryButtonComponent,
    BrandTopBarComponent,
    NoteCardComponent,
    SecondaryButtonComponent,
    CheckboxSelectionCardsComponent,
    DatePickerComponent,
    ModalComponent,
    ThemingComponent,
    BreadcrumbsComponent,
    HomeComponent,
    ItemsComponent,
    TvGamesComponent,
    XboxComponent,
    ButtonToggleGroupComponent,
    ToastComponent,
    ContextualTopBarComponent,
    ParentPageComponent,
    ChildPageComponent,
    GrandChildPageComponent,
    PoweredByComponent,
    PrimaryIconButtonComponent,
    TabsComponent,
    TooltipComponent,
    SecondaryIconButtonComponent,
    ProgressBarComponent,
    LabeledIconButtonComponent,
    MenuButtonComponent,
    SliderComponent,
    RadioButtonComponent,
    BottomSheetComponent,
    AlertBannerComponent,
    TypographyComponent,
    TextTileComponent,
    MessagingCardComponent,
    ScrollbarComponent,
    TimerComponent,
    ChipsComponent,
    PanelComponent,
    FlyoutComponent,
    FileViewerComponent,
    FileViewerFullScreenComponent,
    FileUploadDragDropComponent,
    LoadingSpinnerComponent,
    FileUploaderPdfViewerComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ComponentsRoutingModule,
    AppMaterialModule,
    Uk2DirectivesModule,
    Uk2PasswordRulesModule,
    Uk2ValueMovementModule,
    Uk2BrandTopBarModule,
    Uk2SuggestedActionModule,
    Uk2ModalModule,
    Uk2BreadCrumbsModule,
    Uk2ToastModule,
    Uk2PoweredByModule,
    Uk2ProgressBarModule,
    Uk2TooltipModule,
    Uk2MenuButtonModule,
    Uk2SliderModule,
    NgxMaskDirective,
    NgxMaskPipe,
    Uk2BottomSheetModule,
    Uk2AlertBannerModule,
    Uk2TextTileModule,
    Uk2MessagingCardModule,
    Uk2TimerModule,
    Uk2ChipModule,
    Uk2PanelModule,
    Uk2ListItemModule,
    PdfViewerModule,
    Uk2FileUploaderDragDropModule,
    Uk2MenuListItemModule,
    Uk2LoadingSpinnerModule,
    Uk2FileUploaderDisplayModule,
    Uk2ElementPositionModule,
    Uk2FlyoutMenuModule,
  ],
  providers: [BreadcrumbsService, provideNgxMask()],
})
export class ComponentsModule {}
