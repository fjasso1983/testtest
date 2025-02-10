import currencyBasicUsageDocumentation from './currency-basic-usage.docs.mdx';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { CurrencyBasicUsageComponent } from './currency-basic-usage.component';
import { CurrencyBasicUsageModule } from './currency-basic-usage.module';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/Currency',
  component: CurrencyBasicUsageComponent,
  argTypes: {
    amount: {
      name: 'Amount value',
      description: 'Amount to format',
      table: { category: 'Number' },
      defaultValue: 123456.99,
      type: 'number',
    },
    currencySymbol: {
      name: 'Currency symbol',
      description: 'Currency symbol to display. Example: USD',
      table: { category: 'Labels' },
      defaultValue: 'USD',
      control: { type: 'text' },
    },
    showCurrencySymbol: {
      name: 'Show currency symbol',
      description: 'Toggle to show currency symbol',
      table: { category: 'Behavior' },
      defaultValue: true,
      control: { type: 'boolean' },
    },
    truncate: {
      name: 'Truncate',
      description: 'Toggle to truncate the amount',
      table: { category: 'Behavior' },
      defaultValue: true,
      control: { type: 'boolean' },
    },
    digitsInfo: {
      name: 'Number format',
      description:
        'Format for amount. Example: 1.2-2; 1 is the minimum number of integer digits, 2 is the minimum number of fractional digits, 2 is the maximum number of fractional digits',
      table: { category: 'Labels' },
      defaultValue: '1.2-2',
      control: { type: 'text' },
    },
  },
  parameters: {
    docs: {
      page: currencyBasicUsageDocumentation,
    },
    controls: {
      exclude: ['ngOnInit'],
    },
  },
  decorators: [
    moduleMetadata({
      imports: [CurrencyBasicUsageModule],
    }),
  ],
} as unknown as Meta<CurrencyBasicUsageComponent>;

const currencyBasicUsageTemplate: Story<CurrencyBasicUsageComponent> = (args: CurrencyBasicUsageComponent) => ({
  component: CurrencyBasicUsageComponent,
  props: {
    ...args,
    onArchiveTask: action(''),
  },
});

export const basicUsage = currencyBasicUsageTemplate.bind({});

basicUsage.args = {};
