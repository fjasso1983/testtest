import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import ModalDocumentation from './modal-basic-usage.docs.mdx';
import { ModalComponent } from './modal-basic-usage.component';
import { ModalModule } from './modal-basic-usage.module';
import {
  Uk2ModalTitleAlignEnum,
  Uk2ModalActionsGridEnum,
  Uk2ModalFontWeightEnum,
  Uk2ModalHeaderVariant,
  Uk2ModalTitleTextBehaviorEnum,
  Uk2ModalUniversalHeaderDensity,
} from '@axos/uikit-v2-lib';
import { useArgs } from '@storybook/client-api';

export default {
  title: 'Components/Modal',
  component: ModalComponent,
  argTypes: {
    headerVariant: {
      name: 'Header Variant',
      description: 'Header variant displayed by the modal',
      options: [Uk2ModalHeaderVariant.defaultHeader, Uk2ModalHeaderVariant.universalHeader],
      control: { type: 'radio' },
      table: { category: 'Header' },
    },
    title: {
      name: 'Header',
      description: 'Customize the modal title',
      table: { category: 'Header' },
    },
    subtitle: {
      name: 'Subline',
      description: 'Customize the modal subtile (default header variant only).',
      table: { category: 'Header (Default variant)' },
    },
    titleAlign: {
      name: 'Header Alignment',
      description: 'Customize the modal title align (default header variant only).',
      options: [Uk2ModalTitleAlignEnum.left, Uk2ModalTitleAlignEnum.center],
      control: { type: 'radio' },
      table: { category: 'Header (Default variant)' },
    },
    titleFontWeight: {
      name: 'Header Font Weight',
      description: 'Customize the modal title font weight (default header variant only).',
      options: [Uk2ModalFontWeightEnum.bold400, Uk2ModalFontWeightEnum.bold300],
      control: { type: 'radio' },
      table: { category: 'Header (Default variant)' },
    },
    showCloseButton: {
      name: 'Is Close Button Visible',
      description: 'Customize the modal close button',
      table: { category: 'Header' },
    },
    showTitleDivider: {
      name: 'Is Header Divider Line Visible',
      description: 'Customize the modal top divider',
      table: { category: 'Header' },
    },
    showHeader: {
      name: 'Is Header Visible',
      description: 'Show / Hide header modal.',
      table: { category: 'Header' },
    },
    uk2UniversalHeaderTextBehavior: {
      name: 'Truncate Header title',
      description: 'Set if the title should truncate or wrap. (universal header variant only)',
      table: { category: 'Header (Universal variant)' },
      options: [Uk2ModalTitleTextBehaviorEnum.wrap, Uk2ModalTitleTextBehaviorEnum.truncate],
      control: { type: 'radio' },
    },
    uk2UniversalHeaderDensity: {
      name: 'Header density',
      description: 'Sets the header density size. (universal header variant only)',
      table: { category: 'Header (Universal variant)' },
      options: [
        Uk2ModalUniversalHeaderDensity.small,
        Uk2ModalUniversalHeaderDensity.medium,
        Uk2ModalUniversalHeaderDensity.large,
      ],
      control: { type: 'radio' },
    },
    uk2UniversalHeaderIsLoading: {
      name: 'Is Loading Header',
      description: 'Toggle to switch the header from default state to skeleton state. (universal header variant only)',
      table: { category: 'Header (Universal variant)' },
    },
    uk2UniversalHeaderShowBackButton: {
      name: 'Is Back Button visible',
      description: 'Toggle to show or hide the back button on the header. (universal header variant only)',
      table: { category: 'Header (Universal variant)' },
    },
    contentTemplate: {
      name: 'Body Text',
      description:
        'The content of a modal is an ng-template that can receive components. For this example a customizable text component is created',
      table: { category: 'Content' },
    },
    contentAlign: {
      name: 'Content Alignment',
      description: 'Customize the modal content align',
      options: [Uk2ModalTitleAlignEnum.left, Uk2ModalTitleAlignEnum.center],
      control: { type: 'radio' },
      table: { category: 'Content' },
    },
    showActionsDivider: {
      name: 'Is Footer Divider Line Visible',
      description: 'Customize the modal bottom divider',
      table: { category: 'Footer' },
    },
    actionsGrid: {
      name: 'Footer Buttons Placement',
      description: 'Customize the actions grid',
      options: [
        Uk2ModalActionsGridEnum.side,
        Uk2ModalActionsGridEnum.sideSpaced,
        Uk2ModalActionsGridEnum.stacked,
        Uk2ModalActionsGridEnum.centered,
      ],
      control: { type: 'radio' },
      table: { category: 'Footer' },
    },
    primaryButton: {
      name: 'Is Primary Button Visible',
      description: 'Customize the actions buttons',
      table: { category: 'Buttons' },
    },
    primaryButtonCloseModal: {
      name: 'Modal Closes On Primary Button Click',
      description: 'Customize the actions buttons',
      table: { category: 'Buttons' },
    },
    primaryButtonText: {
      name: 'Primary Button Text',
      description: 'Customize the actions buttons',
      table: { category: 'Buttons' },
    },
    secondaryButton: {
      name: 'Is Secondary Button Visible',
      description: 'Customize the actions buttons',
      table: { category: 'Buttons' },
    },
    secondaryButtonCloseModal: {
      name: 'Modal Closes On Secondary Button Click',
      description: 'Customize the actions buttons',
      table: { category: 'Buttons' },
    },
    secondaryButtonText: {
      name: 'Secondary Button Text',
      description: 'Customize the actions buttons',
      table: { category: 'Buttons' },
    },
    textButton: {
      name: 'Is Text Button Visible',
      description: 'Customize the actions buttons',
      table: { category: 'Buttons' },
    },
    textButtonCloseModal: {
      name: 'Modal Closes On Text Button Click',
      description: 'Customize the actions buttons',
      table: { category: 'Buttons' },
    },
    textButtonText: {
      name: 'Text Button Text',
      description: 'Customize the actions buttons',
      table: { category: 'Buttons' },
    },
    disabledCloseOverlayBackdrop: {
      name: 'Is Click-Overlay-To-Close Disabled',
      description: 'Customize action to close modal on backdrop',
      table: { category: 'Actions' },
    },
    hasBackdrop: {
      name: 'Display backdrop',
      description:
        'Toggle backdrop visibility when modal is opened. This will be overwritten with true when Is Click-Overlay-To-Close Disabled is false.',
      table: { category: 'Actions' },
    },
    enableResponsiveFullscreen: {
      name: 'Responsive fullscreen mode',
      description: 'Enables fullscreen on responsive height. (Forces universal header variant when active)',
      table: { category: 'Modal' },
    },
    clickEvent: {
      action: 'clickEvent',
      table: { disable: true },
    },
    backButtonClickEvent: {
      action: 'backButtonClickEvent',
      table: { disable: true },
    },
  },
  parameters: {
    docs: {
      page: ModalDocumentation,
    },
    controls: {
      exclude: [
        'buttonSize',
        'labeledIconButton',
        'modal',
        'openModal',
        'closeModal',
        'onClickEvent',
        'ngOnChanges',
        'forceHasBackdrop',
        'backButtonAction',
      ],
    },
  },
  decorators: [
    moduleMetadata({
      imports: [ModalModule],
    }),
  ],
} as Meta<ModalComponent>;

const modalTemplate: Story<ModalComponent> = (args: ModalComponent) => {
  const [{}, updateArgs] = useArgs();

  args.forceHasBackdrop = () => updateArgs({ hasBackdrop: true });

  return {
    component: ModalComponent,
    props: {
      ...args,
    },
  };
};

export const basicUsage = modalTemplate.bind({});
basicUsage.args = {
  contentTemplate:
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  title: 'Lorem ipsum dolor',
  subtitle: 'Amet consecutar etum',
  showCloseButton: false,
  headerVariant: Uk2ModalHeaderVariant.defaultHeader,
  primaryButton: true,
  primaryButtonText: 'Lorem Ipsum',
  primaryButtonCloseModal: false,
  secondaryButton: true,
  secondaryButtonText: 'Lorem Ipsum',
  secondaryButtonCloseModal: false,
  textButton: true,
  textButtonText: 'Lorem Ipsum',
  textButtonCloseModal: false,
  disabledCloseOverlayBackdrop: true,
  hasBackdrop: true,
  showTitleDivider: false,
  showActionsDivider: false,
  showHeader: true,
  actionsGrid: Uk2ModalActionsGridEnum.side,
  titleFontWeight: Uk2ModalFontWeightEnum.bold400,
  titleAlign: Uk2ModalTitleAlignEnum.left,
  contentAlign: Uk2ModalTitleAlignEnum.left,
  enableResponsiveFullscreen: false,
  uk2UniversalHeaderTextBehavior: Uk2ModalTitleTextBehaviorEnum.truncate,
  uk2UniversalHeaderIsLoading: false,
  uk2UniversalHeaderDensity: Uk2ModalUniversalHeaderDensity.medium,
  uk2UniversalHeaderShowBackButton: false,
};
