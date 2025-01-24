import {Meta, moduleMetadata, Story} from '@storybook/angular';
import {ChipComponent} from './chip.component';
import ChipDocumentation from './chip.docs.mdx';
import {ChipBasicUsageModule} from './chip.module';
import {Uk2ChipSizesEnum, Uk2ChipTypesEnum} from '@axos/uikit-v2-lib';

export default {
  title: 'Components/Chip',
  components: ChipComponent,
  argTypes: {
    chipText: {
      name: 'Chip Text',
      description: 'Text content on the chip.',
      table: {
        category: 'Content',
      },
    },
    trailingIcon: {
      name: 'Trailing Icon',
      description: 'Trailing icon on the chip.',
      control: 'text',
      table: {
        category: 'Content',
      },
    },
    leadingIcon: {
      name: 'Leading Icon',
      description: 'Leading icon on the chip.',
      control: 'text',
      table: {
        category: 'Content',
      },
    },
    chipSize: {
      name: 'Chip Size',
      description: 'Sets the size of the chip.',
      control: { type: 'radio' },
      options: ['Extra Small', 'Small', 'Medium', 'Large'],
      mapping: {
        'Extra Small': Uk2ChipSizesEnum.extraSmall,
        Small: Uk2ChipSizesEnum.small,
        Medium: Uk2ChipSizesEnum.medium,
        Large: Uk2ChipSizesEnum.large,
      },
      table: {
        category: 'Chip',
      },
    },
    chipType: {
      name: 'Chip Type',
      description: 'Sets the type of the chip.',
      control: { type: 'radio' },
      options: [Uk2ChipTypesEnum.square, Uk2ChipTypesEnum.rounded],
      table: {
        category: 'Chip',
      },
    },
    showBorder: {
      name: 'Display border',
      description: 'Toggles the border on the chip.',
      table: {
        category: 'Chip',
      },
    },
    clickableChip: {
      name: 'Enable click event',
      description: 'Makes the chip a clickable element.',
      table: {
        category: 'Chip',
      },
    },
    hasChipIndicator: {
      name: 'Display chip indicator',
      description: 'Toggles the chip indicator in rounded chips.',
      table: {
        category: 'Chip',
      },
    },
    chipActive: {
      name: 'Active',
      description: 'Toggles the active state on the chip.',
      table: {
        category: 'Chip',
      },
    },
    disabled: {
      name: 'Disabled',
      description: 'Toggle to disable the chip.',
      table: {
        category: 'States',
      },
    },
    isLoading: {
      name: 'Is Loading',
      description: 'Toggle to switch from default state to skeleton state.',
      table: {
        category: 'States',
      },
    },
    clickChip: {
      action: 'clickChip',
      table: { disable: true },
    },
  },
  parameters: {
    actions: {
      handles: ['clickChip'],
    },
    docs: {
      page: ChipDocumentation,
    },
  },
  decorators: [
    moduleMetadata({
      imports: [ChipBasicUsageModule],
    }),
  ],
} as Meta<ChipComponent>;

const basicUsageTemplate: Story<ChipComponent> = (args: ChipComponent) => ({
  component: ChipComponent,
  props: {
    ...args,
  },
});
export const basicUsage = basicUsageTemplate.bind({});
basicUsage.args = {
  chipText: 'Lorem ipsum',
  chipSize: Uk2ChipSizesEnum.medium,
  chipType: Uk2ChipTypesEnum.square,
  hasChipIndicator: false,
  trailingIcon: 'uk2-info-circle' as any,
  leadingIcon: 'uk2-info-circle' as any,
  showBorder: true,
  disabled: false,
  isLoading: false,
  chipActive: false,
  clickableChip: false,
};
