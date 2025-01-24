import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { HyperLinkBasicUsageComponent } from './hyperlink-basic-usage.component';
import HyperlinkDocs from './hyperlink-basic-usage.docs.mdx';
import { StoriesCommonModule } from 'stories/stories-common.module';

export default {
  title: 'Components/Hyperlink',
  component: HyperLinkBasicUsageComponent,
  argTypes: {
    text: {
      name: 'Hyperlink text',
      description: 'Customize hyperlink text.',
      table: { category: 'Labels' },
    },
  },
  parameters: {
    docs: {
      page: HyperlinkDocs,
    },
    cssprops: {
      disable: true,
    },
  },
  decorators: [
    moduleMetadata({
      imports: [StoriesCommonModule],
    }),
  ],
} as unknown as Meta<HyperLinkBasicUsageComponent>;

const basicUsageTemplate: Story<HyperLinkBasicUsageComponent> = (args: HyperLinkBasicUsageComponent) => ({
  component: HyperLinkBasicUsageComponent,
  props: {
    ...args,
  },
});
export const basicUsage = basicUsageTemplate.bind({});
basicUsage.args = {};
