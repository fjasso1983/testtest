import { Routes } from '@angular/router';
import { TextButtonComponent } from './buttons/text-button/text-button.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { componentsRoutesNames } from './components.routes.names';
import { HyperlinkComponent } from './hyperlink/hyperlink.component';
import { IconComponent } from './icon/icon.component';
import { SuggestedActionComponent } from './suggested-action/suggested-action.component';
import { InputComponent } from './input/input.component';
import { PasswordRulesComponent } from './password-rules/password-rules.component';
import { ValueMovementComponent } from './value-movement/value-movement.component';
import { PrimaryButtonComponent } from './buttons/primary-button/primary-button.component';
import { BrandTopBarComponent } from './brand-top-bar/brand-top-bar.component';
import { NoteCardComponent } from './note-card/note-card.component';
import { SecondaryButtonComponent } from './buttons/secondary-button/secondary-button.component';
import { CheckboxSelectionCardsComponent } from './checkbox-selection-cards/checkbox-selection-cards.component';
import { DatePickerComponent } from './datePicker/datePicker.component';
import { ModalComponent } from './modal/modal.component';
import { ThemingComponent } from './theming/theming.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HomeComponent } from './breadcrumbs/home/home.component';
import { TvGamesComponent } from './breadcrumbs/tv-games/tv-games.component';
import { ItemsComponent } from './breadcrumbs/items/items.component';
import { XboxComponent } from './breadcrumbs/xbox/xbox.component';
import { ToastComponent } from './toast/toast.component';
import { ButtonToggleGroupComponent } from './button-toggle-group/button-toggle-group.component';
import { ContextualTopBarComponent } from './contextual-top-bar/contextual-top-bar.component';
import { ParentPageComponent } from './contextual-top-bar/parent-page/parent-page.component';
import { ChildPageComponent } from './contextual-top-bar/child-page/child-page.component';
import { GrandChildPageComponent } from './contextual-top-bar/grand-child-page/grand-child-page.component';
import { PoweredByComponent } from './powered-by/powered-by.component';
import { PrimaryIconButtonComponent } from './buttons-icon/primary-icon-button/primary-icon-button.component';
import { TabsComponent } from './tabs/tabs.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { SecondaryIconButtonComponent } from './buttons-icon/secondary-icon-button/secondary-icon-button.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { LabeledIconButtonComponent } from './buttons-icon/labeled-icon-button/labeled-icon-button.component';
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
import { FileViewerFullScreenComponent } from './file-viewer/file-viewer-full-screen/file-viewer-full-screen.component';
import { TableComponent } from './table/table.component';
import { FileUploadDragDropComponent } from './file-uploader-drag-drop/file-uploader-drag-drop.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

export const componentsRoutes: Routes = [
  {
    path: componentsRoutesNames.empty,
    redirectTo: componentsRoutesNames.hyperlink,
    pathMatch: 'full',
  },
  {
    path: componentsRoutesNames.loadingSpinner,
    component: LoadingSpinnerComponent,
  },
  {
    path: componentsRoutesNames.hyperlink,
    component: HyperlinkComponent,
  },
  {
    path: componentsRoutesNames.icon,
    component: IconComponent,
  },
  {
    path: componentsRoutesNames.input,
    component: InputComponent,
  },
  {
    path: componentsRoutesNames.input,
    component: InputComponent,
  },
  {
    path: componentsRoutesNames.formField,
    loadChildren: () => import('./form-field/form-field.module').then(m => m.FormFieldModule),
  },
  {
    path: componentsRoutesNames.passwordRules,
    component: PasswordRulesComponent,
  },
  {
    path: componentsRoutesNames.valueMovement,
    component: ValueMovementComponent,
  },
  {
    path: componentsRoutesNames.textButton,
    component: TextButtonComponent,
  },
  {
    path: componentsRoutesNames.primaryButton,
    component: PrimaryButtonComponent,
  },
  {
    path: componentsRoutesNames.secondaryButton,
    component: SecondaryButtonComponent,
  },
  {
    path: componentsRoutesNames.menuButton,
    component: MenuButtonComponent,
  },
  {
    path: componentsRoutesNames.checkbox,
    component: CheckboxComponent,
  },
  {
    path: componentsRoutesNames.suggestedAction,
    component: SuggestedActionComponent,
  },
  {
    path: componentsRoutesNames.brandTopBar,
    component: BrandTopBarComponent,
  },
  {
    path: componentsRoutesNames.noteCard,
    component: NoteCardComponent,
  },
  {
    path: componentsRoutesNames.checkboxSelectionCards,
    component: CheckboxSelectionCardsComponent,
  },
  {
    path: componentsRoutesNames.datepicker,
    component: DatePickerComponent,
  },
  {
    path: componentsRoutesNames.theming,
    component: ThemingComponent,
  },
  {
    path: componentsRoutesNames.buttonToggleGroup,
    component: ButtonToggleGroupComponent,
  },
  {
    path: componentsRoutesNames.modal,
    component: ModalComponent,
  },
  {
    path: componentsRoutesNames.breadcrumbs,
    component: BreadcrumbsComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'items',
        component: ItemsComponent,
      },
      {
        path: 'tv-games',
        component: TvGamesComponent,
      },
      {
        path: 'x-box',
        component: XboxComponent,
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: componentsRoutesNames.contextualTopBar,
    component: ContextualTopBarComponent,
    children: [
      {
        path: 'parent-page',
        component: ParentPageComponent,
      },
      {
        path: 'child-page',
        component: ChildPageComponent,
      },
      {
        path: 'grand-child-page',
        component: GrandChildPageComponent,
      },
      {
        path: '',
        redirectTo: 'parent-page',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: componentsRoutesNames.toast,
    component: ToastComponent,
  },
  {
    path: componentsRoutesNames.poweredBy,
    component: PoweredByComponent,
  },
  {
    path: componentsRoutesNames.primaryIconButton,
    component: PrimaryIconButtonComponent,
  },
  {
    path: componentsRoutesNames.tabs,
    component: TabsComponent,
  },
  {
    path: componentsRoutesNames.secondaryIconButton,
    component: SecondaryIconButtonComponent,
  },
  {
    path: componentsRoutesNames.progressBar,
    component: ProgressBarComponent,
  },
  {
    path: componentsRoutesNames.tooltip,
    component: TooltipComponent,
  },
  {
    path: componentsRoutesNames.labeledIconButton,
    component: LabeledIconButtonComponent,
  },
  {
    path: componentsRoutesNames.slider,
    component: SliderComponent,
  },
  {
    path: componentsRoutesNames.radioButton,
    component: RadioButtonComponent,
  },
  {
    path: componentsRoutesNames.bottomSheet,
    component: BottomSheetComponent,
  },
  {
    path: componentsRoutesNames.alertBanner,
    component: AlertBannerComponent,
  },
  {
    path: componentsRoutesNames.matOption,
    loadChildren: () => import('./mat-option-poc/mat-option-poc.module').then(m => m.MatOptionPocModule),
  },
  {
    path: componentsRoutesNames.typography,
    component: TypographyComponent,
  },
  {
    path: componentsRoutesNames.textTile,
    component: TextTileComponent,
  },
  {
    path: componentsRoutesNames.messagingCard,
    component: MessagingCardComponent,
  },
  {
    path: componentsRoutesNames.scrollbar,
    component: ScrollbarComponent,
  },
  {
    path: componentsRoutesNames.timer,
    component: TimerComponent,
  },
  {
    path: componentsRoutesNames.fileViewer,
    component: FileViewerComponent,
  },
  {
    path: componentsRoutesNames.fileViewerFullScreen,
    component: FileViewerFullScreenComponent,
  },
  {
    path: componentsRoutesNames.chip,
    component: ChipsComponent,
  },
  {
    path: componentsRoutesNames.productTile,
    loadChildren: () => import('./product-tile/product-tile.module').then(m => m.ProductTileModule),
  },
  {
    path: componentsRoutesNames.searchInput,
    loadChildren: () => import('./search-input/search-input.module').then(m => m.SearchInputModule),
  },
  {
    path: componentsRoutesNames.panel,
    component: PanelComponent,
  },
  {
    path: componentsRoutesNames.flyoutButton,
    component: FlyoutComponent,
  },
  {
    path: componentsRoutesNames.table,
    component: TableComponent,
  },
  {
    path: componentsRoutesNames.fileUploadDragDrop,
    component: FileUploadDragDropComponent,
  },
  {
    path: 'filter-chip',
    children: [
      {
        path: 'label',
        loadChildren: () =>
          import('./filter-chip/filter-chip-label/filter-chip-label.module').then(m => m.FilterChipLabelModule),
      },
    ],
  },
  {
    path: 'table',
    children: [
      {
        path: '',
        loadChildren: () => import('./table/table.module').then(m => m.TableModule),
      },
    ],
  },
];
