import { Meta, moduleMetadata, Story } from '@storybook/angular';
import LoadingSpinnerDocs from './loading-spinner-basic-usage.docs.mdx';
import { LoadingSpinnerBasicUsageComponent } from './loading-spinner-basic-usage.component';
import { LoadingSpinnerBasicUsageModule } from './loading-spinner-basic-usage.module';

export default {
  title: 'Components/Loading Spinner',
  component: LoadingSpinnerBasicUsageComponent,
  argTypes: {
    diameter: {
      name: 'Spinner diameter',
      description: 'Customize the spinner diameter.',
      table: { category: 'Dimensions' },
    },
    strokeWidth: {
      name: 'Spinner stroke width',
      description: 'Customize the spinner stroke width.',
      table: { category: 'Dimensions' },
    },
  },
  parameters: {
    docs: {
      page: LoadingSpinnerDocs,
    },
    cssprops: {
      disable: true,
    },
  },
  decorators: [
    moduleMetadata({
      imports: [LoadingSpinnerBasicUsageModule],
    }),
  ],
} as unknown as Meta<LoadingSpinnerBasicUsageComponent>;

const basicUsageTemplate: Story<LoadingSpinnerBasicUsageComponent> = (args: LoadingSpinnerBasicUsageComponent) => ({
  component: LoadingSpinnerBasicUsageComponent,
  props: {
    ...args,
  },
});
export const basicUsage = basicUsageTemplate.bind({});
basicUsage.args = {
  diameter: 32,
  strokeWidth: 4,
};
