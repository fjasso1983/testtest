import { TextTileBasicUsageComponent } from './text-tile-basic-usage.component';
import textTileBasicUsageDocumantation from './text-tile-basic-usage.docs.mdx';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { TextTileBasicUsageModule } from './text-tile-basic-usage.module';
import {
  Uk2Tier1AlertsEnum,
  Uk2Tier1BiometricsEnum,
  Uk2Tier1CommunicationEnum,
  Uk2Tier1FilesEnum,
  Uk2Tier1FinancialEnum,
  Uk2Tier1InvestEnum,
  Uk2Tier1MiscEnum,
  Uk2Tier1NavigationEnum,
  Uk2Tier1UtilityEnum,
  Uk2Tier1ValueMovementsEnum,
} from '@axos/uikit-v2-lib';

export default {
  title: 'Components/Text Tile',
  component: TextTileBasicUsageComponent,
  argTypes: {
    uk2TextTileDisplayBackground: {
      name: 'Show background',
      description: 'Toggle to show or hide the background',
      table: { category: 'States', defaultValue: { summary: 'true' } },
      defaultValue: true,
    },
    uk2TextTileIsStandaloneTile: {
      name: 'Standalone tile mode',
      description: 'Toggle to show standalone mode (with rounded corners)',
      table: { category: 'States', defaultValue: { summary: 'true' } },
      defaultValue: true,
    },
    uk2TextTileTitle: {
      name: 'Title',
      description: 'Customize the title',
      table: { category: 'Labels', defaultValue: { summary: 'undefined' } },
      defaultValue: 'Lorem ipsum dolor sit amet consectetur.',
      type: 'string',
    },
    uk2TextTileContent: {
      name: 'Content',
      description: 'Customize the content. This is defined by the client application, it can be text or custom html',
      table: { category: 'Labels', defaultValue: { summary: 'undefined' } },
      type: 'string',
      defaultValue:
        'Lorem ipsum dolor sit amet consectetur. Tempor nulla mauris fames dolor convallis ut purus pharetra consequat. Ut consequat pharetra a risus nisi donec dui diam.',
    },
    uk2TextTileSvgIconName: {
      name: 'Icon name',
      description: 'Customize the svg icon name',
      control: 'select',
      options: {
        ...(Uk2Tier1AlertsEnum as unknown as String),
        ...(Uk2Tier1BiometricsEnum as unknown as String),
        ...(Uk2Tier1CommunicationEnum as unknown as String),
        ...(Uk2Tier1FilesEnum as unknown as String),
        ...(Uk2Tier1InvestEnum as unknown as String),
        ...(Uk2Tier1MiscEnum as unknown as String),
        ...(Uk2Tier1NavigationEnum as unknown as String),
        ...(Uk2Tier1UtilityEnum as unknown as String),
        ...(Uk2Tier1ValueMovementsEnum as unknown as String),
        ...(Uk2Tier1FinancialEnum as unknown as String),
      },
      table: { category: 'Icons', defaultValue: { summary: 'uk2-cog' } },
      defaultValue: 'uk2-cog',
      type: 'string',
    },
  },
  parameters: {
    docs: {
      page: textTileBasicUsageDocumantation,
    },
    controls: {
      exclude: ['ngOnInit'],
    },
  },
  decorators: [
    moduleMetadata({
      imports: [TextTileBasicUsageModule],
    }),
  ],
} as unknown as Meta<TextTileBasicUsageComponent>;

const textTileBasicUsageTemplate: Story<TextTileBasicUsageComponent> = (args: TextTileBasicUsageComponent) => ({
  component: TextTileBasicUsageComponent,
  props: {
    ...args,
  },
});

export const basicUsage = textTileBasicUsageTemplate.bind({});
basicUsage.args = {};
basicUsage.parameters = {
  layout: 'fullscreen',
  backgrounds: {
    default: 'whitesmoke',
    values: [
      {
        name: 'whitesmoke',
        value: '#EBEBEB',
      },
    ],
  },
};
