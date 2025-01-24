import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';

import { Uk2BadgeTypeEnum } from '@axos/uikit-v2-lib';

import NotificationBadgeDocumentation from './notification-badge.docs.mdx';
import { NotificationBadgeComponent } from './notification-badge.component';
import { NotificationBadgeModule } from './notification-badge.module';

export default {
  title: 'Components/Notification Badge',
  component: NotificationBadgeComponent,
  argTypes: {
    text: {
      name: 'Text',
      description: 'Customize the text for badge.',
      table: { category: 'Labels' },
    },
    isLoading: {
      name: 'Is Loading',
      description: 'Toggle skeleton state',
      table: { category: 'States' },
    },
    isHidden: {
      name: 'Is Hidden',
      description: 'Hide badge if is true',
      table: { category: 'States' },
    },
    type: {
      name: 'Badge Type',
      description: 'Change badge styles depending on the type',
      table: { category: 'States' },
    },
    isSelected: {
      name: 'Is Selected',
      description: 'Toggle selected state',
      table: { category: 'States' },
    },
    hasHover: {
      name: 'Has Hover',
      description: 'Add hover styles if is true',
      table: { category: 'States' },
    },
  },
  parameters: {
    docs: {
      page: NotificationBadgeDocumentation,
    },
  },
  decorators: [
    moduleMetadata({
      imports: [NotificationBadgeModule],
    }),
  ],
} as Meta<NotificationBadgeComponent>;

const basicUsageTemplate: Story<NotificationBadgeComponent> = (args: NotificationBadgeComponent) => ({
  component: NotificationBadgeComponent,
  props: {
    ...args,
  },
});
export const basicUsage = basicUsageTemplate.bind({});
basicUsage.args = {
  text: '',
  isLoading: false,
  isHidden: false,
  type: Uk2BadgeTypeEnum.notification,
  isSelected: false,
  hasHover: false,
};
