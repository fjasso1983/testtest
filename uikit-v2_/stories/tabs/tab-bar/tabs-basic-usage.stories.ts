import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';

import { Uk2StretchTabsSizeEnum } from '@axos/uikit-v2-lib';

import { TabsBasicUsageComponent } from './tabs-basic-usage.component';
import tabsDocumentation from './tabs-basic-usage.docs.mdx';
import { TabsBasicUsageModule } from './tabs-basic-usage.module';

export default {
  title: 'Components/Tabs/Tab Bar',
  component: TabsBasicUsageComponent,
  argTypes: {
    sizeTabs: {
      name: 'size',
      control: 'radio',
      description: 'Select one from the size tabs configuration.',
      options: [Uk2StretchTabsSizeEnum.small, Uk2StretchTabsSizeEnum.medium],
    },
  },
  parameters: {
    docs: {
      page: tabsDocumentation,
    },
    controls: {
      exclude: ['ngOnInit'],
    },
  },
  decorators: [
    moduleMetadata({
      imports: [TabsBasicUsageModule],
    }),
  ],
} as unknown as Meta<TabsBasicUsageComponent>;

const basicUsageTemplate: Story<TabsBasicUsageComponent> = (args: TabsBasicUsageComponent) => ({
  component: TabsBasicUsageComponent,
  props: {
    ...args,
  },
});

export const basicUsage = basicUsageTemplate.bind({});
basicUsage.args = {
  sizeTabs: Uk2StretchTabsSizeEnum.medium,
};

basicUsage.parameters = {
  backgrounds: {
    default: 'whitesmoke',
    values: [
      {
        name: 'whitesmoke',
        value: '#F8F8F8',
      },
    ],
  },
};
