import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { ToastBasicUsageComponent } from './toast-basic-usage.component';
import toastDocumentation from './toast-basic-usage.docs.mdx';
import { ToastBasicUsageModule } from './toast-basic-usage.module';
import { Uk2ToastTypeEnum } from '@axos/uikit-v2-lib';

export default {
  title: 'Components/Toast',
  component: ToastBasicUsageComponent,
  argTypes: {
    type: {
      name: 'Toast type',
      control: 'radio',
      description: 'Select one from the toast type configuration.',
      options: ['alert', 'success', 'loading'],
    },
    message: {
      name: 'Toast text',
      description: 'Toast text.',
      control: 'text',
    },
    duration: {
      name: 'Duration',
      description: 'Toast duration in seconde.',
      control: 'number',
    },
  },
  parameters: {
    docs: {
      page: toastDocumentation,
    },
    controls: {
      exclude: ['ngOnInit', 'openToast', 'buttonSize'],
    },
  },
  decorators: [
    moduleMetadata({
      imports: [ToastBasicUsageModule],
    }),
  ],
} as unknown as Meta<ToastBasicUsageComponent>;

const basicUsageTemplate: Story<ToastBasicUsageComponent> = (args: ToastBasicUsageComponent) => ({
  component: ToastBasicUsageComponent,
  props: {
    ...args,
  },
});

export const basicUsage = basicUsageTemplate.bind({});
basicUsage.args = {
  type: Uk2ToastTypeEnum.success,
};
