import { moduleMetadata, Story } from '@storybook/angular';
import { HorizontalTabsBasicUsageComponent } from './horizontal-tabs-basic-usage.component';
import { HorizontalTabsBasicUsageModule } from './horizontal-tabs-basic-usage.module';
import HorizontalTabsDocs from './horizontal-tabs-basic-usage.component.docs.mdx';
export default {
  title: 'Components/Tabs/Global',
  component: HorizontalTabsBasicUsageComponent,
  argTypes: {
    isLoading: {
      name: 'Is Loading',
      description: 'Toggle to switch from default state to skeleton state.',
      table: { category: 'States' },
    },
    disabled: {
      name: 'disabled',
      description: 'Toggle to disabled state on tabs.',
      table: { category: 'States' },
    },
    badgesHidden: {
      name: 'Badges Hidden',
      description: 'Toggle to hide badges on tabs.',
      table: { category: 'Extra elements' },
    },
    iconsHidden: {
      name: 'Icons Hidden',
      description: 'Toggle to hide icons on tabs.',
      table: { category: 'Extra elements' },
    },
  },
  parameters: {
    docs: {
      page: HorizontalTabsDocs,
    },
    controls: {
      exclude: [
        'tabsList',
        'selectedTab',
        'tabChange',
        'addTab',
        'removeTab',
        'icon',
        'badgeText',
        'badgesHidden',
        'buttonSize',
        'ngOnInit',
      ],
    },
  },
  decorators: [
    moduleMetadata({
      imports: [HorizontalTabsBasicUsageModule],
    }),
  ],
};

const basicUsageTemplate: Story<HorizontalTabsBasicUsageComponent> = (args: HorizontalTabsBasicUsageComponent) => ({
  component: HorizontalTabsBasicUsageComponent,
  props: {
    ...args,
  },
});
export const basicUsage = basicUsageTemplate.bind({});
basicUsage.args = {
  isLoading: false,
  disabled: false,
  iconsHidden: false,
  badgesHidden: true,
};
