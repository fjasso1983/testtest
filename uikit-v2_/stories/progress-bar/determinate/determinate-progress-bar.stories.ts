import { Meta, moduleMetadata, Story } from '@storybook/angular';
import DeterminateProgressBarDocs from './determinate-progress-bar.docs.mdx';
import { DeterminateProgressBarBasicUsageModule } from './determinate-progress-bar.module';
import { DeterminateProgressBarBasicUsageComponent } from './determinate-progress-bar.component';

export default {
  title: 'Components/Progress Bar/Determinate',
  component: DeterminateProgressBarBasicUsageComponent,
  argTypes: {
    value: {
      name: 'Value',
      description: 'It is the value that the progress bar will have.',
      table: { category: 'Inputs' },
    },
  },
  parameters: {
    docs: {
      page: DeterminateProgressBarDocs,
    },
  },
  decorators: [
    moduleMetadata({
      imports: [DeterminateProgressBarBasicUsageModule],
    }),
  ],
} as unknown as Meta<DeterminateProgressBarBasicUsageComponent>;

const basicUsageTemplate: Story<DeterminateProgressBarBasicUsageComponent> = (
  args: DeterminateProgressBarBasicUsageComponent
) => ({
  component: DeterminateProgressBarBasicUsageComponent,
  props: {
    ...args,
  },
});

export const basicUsage = basicUsageTemplate.bind({});
basicUsage.args = {};
