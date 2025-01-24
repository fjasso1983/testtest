import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';

import docs from './flyout-menu.docs.mdx';
import { FlyoutMenuComponent } from './flyout-menu.component';
import { FlyoutMenuModule } from './flyout-menu.module';
import { Uk2FlyoutMenuXPosition, Uk2FlyoutMenuYPosition } from '@axos/uikit-v2-lib';

export default {
  title: 'Components/Flyout Menu',
  component: FlyoutMenuComponent,
  argTypes: {
    flyoutOriginXPosition: {
      name: 'Flyout Horizontal Origin Position',
      description: 'The x position of the flyout origin',
      table: {
        category: 'Flyout Control',
      },
    },
    flyoutOverlayXPosition: {
      name: 'Flyout Horizontal Overlay Position',
      description: 'The x position of the flyout overlay',
      table: {
        category: 'Flyout Control',
      },
    },
    flyoutOriginYPosition: {
      name: 'Flyout Vertical Origin Position',
      description: 'The y position of the flyout origin',
      table: {
        category: 'Flyout Control',
      },
    },
    flyoutOverlayYPosition: {
      name: 'Flyout Vertical Overlay Position',
      description: 'The y position of the flyout overlay',
      table: {
        category: 'Flyout Control',
      },
    },
    flyoutOverlayYOffset: {
      name: 'Flyout Vertical Offset',
      description: 'The y offset of the flyout overlay',
      table: {
        category: 'Flyout Control',
      },
    },
    flyoutOverlayHasBackdrop: {
      name: 'Flyout Overlay Has Backdrop',
      description: 'Defines if the flyout overlay has a backdrop',
      table: {
        category: 'Flyout Control',
      },
    },
    closeOnClickBackdrop: {
      name: 'Close on Click Backdrop',
      description: 'Defines if the flyout closes when clicking backdrop element',
      table: {
        category: 'Flyout Control',
      },
    },
    flyoutOverlayBackdropClass: {
      name: 'Flyout Overlay Backdrop Class',
      description: 'The class of the flyout overlay backdrop',
      control: {
        type: 'radio',
        options: ['none', 'custom-backdrop-class-1', 'custom-backdrop-class-2'],
      },
      table: {
        category: 'Flyout Control',
      },
    },
    showVerticalTabs: {
      name: 'Show Vertical Tabs',
      description: 'Defines if the vertical tabs are shown',
      table: {
        category: 'Custom Scenario',
      },
    },
    showHeader: {
      name: 'Show Header',
      description: 'Defines if the header is shown',
      table: {
        category: 'Custom Scenario',
      },
    },
    showFooter: {
      name: 'Show Footer',
      description: 'Defines if the footer is shown',
      table: {
        category: 'Custom Scenario',
      },
    },
  },
  parameters: {
    docs: {
      page: docs,
    },
    controls: {
      exclude: [
        'elementPosition',
        'chevronIcon',
        'ellipsisIcon',
        'documentTypeOptions',
        'timePeriodOptions',
        'selectedDocumentType',
        'selectedTimePeriod',
      ],
    },
  },
  decorators: [
    moduleMetadata({
      imports: [FlyoutMenuModule],
    }),
  ],
} as Meta<FlyoutMenuComponent>;

const basicUsageTemplate: Story<FlyoutMenuComponent> = (args: FlyoutMenuComponent) => ({
  component: FlyoutMenuComponent,
  props: {
    ...args,
  },
});
export const basicUsage = basicUsageTemplate.bind({});
basicUsage.args = {
  flyoutOriginXPosition: Uk2FlyoutMenuXPosition.start,
  flyoutOverlayXPosition: Uk2FlyoutMenuXPosition.start,
  flyoutOriginYPosition: Uk2FlyoutMenuYPosition.bottom,
  flyoutOverlayYPosition: Uk2FlyoutMenuYPosition.top,
  flyoutOverlayHasBackdrop: true,
  flyoutOverlayYOffset: 4,
  closeOnClickBackdrop: true,
  flyoutOverlayBackdropClass: 'none',
  showVerticalTabs: false,
  showHeader: true,
  showFooter: true,
};
