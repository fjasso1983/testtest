import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { KabobBasicUsageComponent } from './kabob-basic-usage.component';
import { Uk2ButtonSizeEnum, Uk2FlyoutMenuXPosition, Uk2FlyoutMenuYPosition } from '@axos/uikit-v2-lib';
import KabobDocumentation from './kabob-basic-usage.docs.mdx';
import { KabobBasicUsageModule } from './kabob-basic-usage.module';

export default {
  title: 'Components/Kabob',
  component: KabobBasicUsageComponent,
  argTypes: {
    buttonCentered: {
      name: 'Center Button',
      description: 'Centers the button where the flyout is displayed for this example',
      table: {
        category: 'Button',
      },
    },
    buttonIcon: {
      name: 'Button Icon',
      description: 'Icon of the button',
      table: {
        category: 'Button',
      },
    },
    buttonSize: {
      name: 'Button Size',
      description: 'Size of the button. It could be large, medium or small.',
      options: [Uk2ButtonSizeEnum.small, Uk2ButtonSizeEnum.medium, Uk2ButtonSizeEnum.large],
      control: { type: 'radio' },
      table: {
        category: 'Button',
      },
    },
    closeOnClickOutside: {
      name: 'Close flyout on click outside',
      description: 'Defines if the flyout closes when clicking outside of the overlay',
      table: {
        category: 'Flyout Control',
      },
    },
    closeOnClickItem: {
      name: 'Close flyout on item click',
      description: 'Defines if the flyout closes when clicking an item',
      table: {
        category: 'Flyout Control',
      },
    },
    flyoutOriginXPosition: {
      name: 'Flyout Horizontal Origin Position',
      description: 'Customize the overlay horizontal display position relative to the button origin',
      options: [Uk2FlyoutMenuXPosition.start, Uk2FlyoutMenuXPosition.center, Uk2FlyoutMenuXPosition.end],
      control: { type: 'radio' },
      table: { category: 'Position' },
    },
    flyoutOverlayXPosition: {
      name: 'Flyout Horizontal Position',
      description: 'Customize the overlay horizontal display position',
      options: [Uk2FlyoutMenuXPosition.start, Uk2FlyoutMenuXPosition.center, Uk2FlyoutMenuXPosition.end],
      control: { type: 'radio' },
      table: { category: 'Position' },
    },
    flyoutOriginYPosition: {
      name: 'Flyout Vertical Origin Position',
      description: 'Customize the overlay vertical display position relative to the button origin',
      options: [Uk2FlyoutMenuYPosition.bottom, Uk2FlyoutMenuYPosition.center, Uk2FlyoutMenuYPosition.top],
      control: { type: 'radio' },
      table: { category: 'Position' },
    },
    flyoutOverlayYPosition: {
      name: 'Flyout Vertical Position',
      description: 'Customize the overlay vertical display position',
      options: [Uk2FlyoutMenuYPosition.bottom, Uk2FlyoutMenuYPosition.center, Uk2FlyoutMenuYPosition.top],
      control: { type: 'radio' },
      table: { category: 'Position' },
    },
    flyoutOverlayYOffset: {
      name: 'Flyout Vertical Offset',
      description: 'Customize the vertical distance of the flyout relative to the button origin in pixels',
      table: { category: 'Position' },
    },
    downloadEvent: {
      action: 'downloadEvent',
      table: { disable: true },
    },
    shareEvent: {
      action: 'shareEvent',
      table: { disable: true },
    },
    uploadEvent: {
      action: 'uploadEvent',
      table: { disable: true },
    },
    flyoutOverlayHasBackdrop: {
      name: 'Flyout Overlay Has Backdrop',
      description: 'Defines if the flyout overlay has a backdrop',
      table: {
        category: 'Flyout Control',
      },
    },
  },
  parameters: {
    actions: {
      handles: ['downloadEvent', 'shareEvent', 'uploadEvent'],
    },
    docs: {
      page: KabobDocumentation,
    },
    controls: {
      exclude: [
        'flyoutMenu',
        'uk2TextButtonVariant',
        'firstItem',
        'secondItem',
        'thirdItem',
        'ngOnChanges',
        'clickDownload',
        'clickShare',
        'clickUpload',
        'checkFlyoutClose',
      ],
    },
  },
  decorators: [
    moduleMetadata({
      imports: [KabobBasicUsageModule],
    }),
  ],
} as Meta<KabobBasicUsageComponent>;

const basicUsageTemplate: Story<KabobBasicUsageComponent> = (args: KabobBasicUsageComponent) => ({
  component: KabobBasicUsageComponent,
  props: {
    ...args,
  },
});
export const basicUsage = basicUsageTemplate.bind({});
basicUsage.args = {
  flyoutOriginXPosition: Uk2FlyoutMenuXPosition.end,
  flyoutOverlayXPosition: Uk2FlyoutMenuXPosition.end,
  flyoutOriginYPosition: Uk2FlyoutMenuYPosition.bottom,
  flyoutOverlayYPosition: Uk2FlyoutMenuYPosition.top,
  flyoutOverlayYOffset: 4,
  closeOnClickOutside: false,
  closeOnClickItem: true,
  buttonCentered: false,
  buttonIcon: 'uk2-ellipses-vertical',
  buttonSize: Uk2ButtonSizeEnum.small,
  flyoutOverlayHasBackdrop: false,
};
