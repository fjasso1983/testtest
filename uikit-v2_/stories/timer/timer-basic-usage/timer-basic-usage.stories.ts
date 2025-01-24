import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { TimerBasicUsageComponent } from './timer-basic-usage.component';
import timerDocumentation from './timer-basic-usage.docs.mdx';
import { TimerBasicUsageModule } from './timer-basic-usage.module';

export default {
  title: 'Components/Timer',
  component: TimerBasicUsageComponent,
  argTypes: {
    time: {
      name: 'Time',
      description: 'Initial time value in seconds for timer.',
      control: { type: 'range', min: 1, max: 3599, step: 1 },
    },
    timerEvent: {
      action: 'timerEvent',
      table: { disable: true },
    },
  },
  parameters: {
    docs: {
      page: timerDocumentation,
    },
    controls: {
      exclude: ['isRunning', 'isStop', 'running', 'stop', 'uk2TimerEvent'],
    },
  },
  decorators: [
    moduleMetadata({
      imports: [TimerBasicUsageModule],
    }),
  ],
} as unknown as Meta<TimerBasicUsageComponent>;

const basicUsageTemplate: Story<TimerBasicUsageComponent> = (args: TimerBasicUsageComponent) => ({
  component: TimerBasicUsageComponent,
  props: {
    ...args,
  },
});
export const basicUsage = basicUsageTemplate.bind({});
basicUsage.args = {
  time: 3599,
};
