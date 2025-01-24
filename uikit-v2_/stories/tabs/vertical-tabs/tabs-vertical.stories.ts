import { Meta, Story, moduleMetadata } from '@storybook/angular';

import { Uk2VerticalTabSizeEnum } from '@axos/uikit-v2-lib';

import { TabsVerticalComponent } from './tabs-vertical.component';
import tabsVerticalDocumentation from './tabs-vertical-docs.mdx';
import { TabsVerticalModule } from './tabs-vertical.module';

export default {
  title: 'Components/Tabs/Vertical Tabs',
  component: TabsVerticalComponent,
  argTypes: {
    sizeTabs: {
      name: 'size',
      control: 'radio',
      description: 'Select one from the size tabs configuration.',
      options: [Uk2VerticalTabSizeEnum.small, Uk2VerticalTabSizeEnum.medium],
      table: { category: 'Labels' },
    },
    isLoading: {
      name: 'Is Loading',
      description: 'Toggle skeleton view when this is true',
      table: { category: 'States' },
    },
    isDisabled: {
      name: 'Is Disabled',
      description: 'Toggle to disabled state when this is true.',
      table: { category: 'States' },
    },
    isBadgeHidden: {
      name: 'Is Badge Hidden',
      description: 'Toggle to hide the badge when this is true.',
      table: { category: 'States' },
    },
  },
  parameters: {
    docs: {
      page: tabsVerticalDocumentation,
    },
    controls: {
      exclude: ['ngOnInit'],
    },
  },
  decorators: [
    moduleMetadata({
      imports: [TabsVerticalModule],
    }),
  ],
} as unknown as Meta<TabsVerticalComponent>;

const tabsVerticalTemplate: Story<TabsVerticalComponent> = (args: TabsVerticalComponent) => ({
  component: TabsVerticalComponent,
  props: {
    ...args,
  },
});

export const basicUsage = tabsVerticalTemplate.bind({});
basicUsage.args = {
  sizeTabs: Uk2VerticalTabSizeEnum.medium,
  isBadgeHidden: false,
};
