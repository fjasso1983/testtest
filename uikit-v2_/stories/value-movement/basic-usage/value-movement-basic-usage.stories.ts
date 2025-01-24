import { ValueMovementBasicUsageComponent } from './value-movement-basic-usage.component';
import valueMovementBasicUsageDocumantation from './value-movement-basic-usage.docs.mdx';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { ValueMovementBasicUsageModule } from './value-movement-basic-usage.module';
import {
  Uk2ValueMovementDisplayTypeEnum,
  Uk2ValueMovementSizeEnum,
  Uk2ValueMovementTrendFormatEnum,
  Uk2ValueMovementTypeEnum,
} from '@axos/uikit-v2-lib';

export default {
  title: 'Components/Value Movement',
  component: ValueMovementBasicUsageComponent,
  argTypes: {
    isLoading: {
      name: 'Is Loading',
      description: 'Toggle to switch from default state to skeleton state.',
      table: { category: 'States' },
    },
    amount: {
      name: 'Amount value',
      description: 'Amount to display the component',
      table: { category: 'number' },
      control: { type: 'number' },
    },
    percentage: {
      name: 'Percentage value',
      description: 'Customize the placeholder text for percentage',
      table: { category: 'number' },
      control: { type: 'number' },
    },
    description: {
      name: 'Description',
      description: 'Customize the placeholder text for description',
      table: { category: 'Labels' },
    },
    valueMovementType: {
      name: 'Movement type',
      description: 'Customize the svg icon name',
      table: { category: 'Format' },
    },
    displayType: {
      name: 'Display type',
      description: 'Customize the display type',
      table: { category: 'Format' },
    },
    size: {
      name: 'Size',
      description: 'Customize the size',
      table: { category: 'Format' },
    },
    trendFormat: {
      name: 'Trend format',
      description: 'Customize the svg icon trend format',
      table: { category: 'Format' },
    },
    isEmpty: {
      name: 'Is Empty',
      description: 'Toggle to switch from default state to empty state',
      table: { category: 'States' },
    },
    isIconOnly: {
      name: 'is Icon Only',
      description: 'Toggle to switch from default state to display only the icon',
      table: { category: 'States' },
    },
    isAmountUndefined: {
      name: 'Is Amount Undefined',
      description: 'Toggle to switch from Amount value to undefined',
      table: { category: 'Behavior' },
    },
    isPercentageUndefined: {
      name: 'Is Percentage Undefined',
      description: 'Toggle to switch from Percentage value to undefined',
      table: { category: 'Behavior' },
    },
  },
  parameters: {
    docs: {
      page: valueMovementBasicUsageDocumantation,
    },
    controls: {
      exclude: ['ngOnInit'],
    },
  },
  decorators: [
    moduleMetadata({
      imports: [ValueMovementBasicUsageModule],
    }),
  ],
} as unknown as Meta<ValueMovementBasicUsageComponent>;

const valueMovementBasicUsageTemplate: Story<ValueMovementBasicUsageComponent> = (
  args: ValueMovementBasicUsageComponent
) => ({
  component: ValueMovementBasicUsageComponent,
  props: {
    ...args,
    onArchiveTask: action(''),
  },
});

export const basicUsage = valueMovementBasicUsageTemplate.bind({});

basicUsage.args = {
  valueMovementType: Uk2ValueMovementTypeEnum.increasePositive,
  displayType: Uk2ValueMovementDisplayTypeEnum.noContainer,
  trendFormat: Uk2ValueMovementTrendFormatEnum.triangle,
  size: Uk2ValueMovementSizeEnum.medium,
};
