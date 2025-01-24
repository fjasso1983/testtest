import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { Uk2ButtonSizeEnum, Uk2LabeledIconPositionEnum } from '@axos/uikit-v2-lib';
import LabeledIconButtonDocumentation from './labeled-icon-button.docs.mdx';
import { LabeledIconButtonComponent } from './labeled-icon-button.component';
import { LabeledIconButtonModule } from './labeled-icon-button.module';
import {
  Uk2Tier1AlertsEnum,
  Uk2Tier1BiometricsEnum,
  Uk2Tier1CommunicationEnum,
  Uk2Tier1FilesEnum,
  Uk2Tier1InvestEnum,
  Uk2Tier1MiscEnum,
  Uk2Tier1NavigationEnum,
  Uk2Tier1UtilityEnum,
  Uk2Tier1ValueMovementsEnum,
  Uk2Tier1FinancialEnum,
} from '@axos/uikit-v2-lib/src/lib/uk2-services';

export default {
  title: 'Components/Buttons',
  component: LabeledIconButtonComponent,
  argTypes: {
    label: {
      name: 'Text',
      description: 'Customize the text for button.',
      control: 'text',
      table: { category: 'Inputs' },
    },
    uk2ButtonSize: {
      name: 'Button size',
      control: 'radio',
      options: ['small', 'medium'],
      description: 'Size of the button. It could be medium or small.',
      table: { category: 'Inputs' },
    },
    uk2IsLoading: {
      name: 'Is Loading',
      description: 'Toggle to switch from default state to skeleton state.',
      table: { category: 'States' },
    },
    isDisabled: {
      name: 'Is Disabled',
      description: 'Toggle to disabled state when this is true.',
      table: { category: 'States' },
    },
    svgIconName: {
      name: 'Icon name',
      description: 'Icon name from Uk2 Icon library, (Only icon from Tiers 1 are accepted)',
      control: 'select',
      options: {
        ...(Uk2Tier1AlertsEnum as unknown as String),
        ...(Uk2Tier1BiometricsEnum as unknown as String),
        ...(Uk2Tier1CommunicationEnum as unknown as String),
        ...(Uk2Tier1FilesEnum as unknown as String),
        ...(Uk2Tier1InvestEnum as unknown as String),
        ...(Uk2Tier1MiscEnum as unknown as String),
        ...(Uk2Tier1NavigationEnum as unknown as String),
        ...(Uk2Tier1UtilityEnum as unknown as String),
        ...(Uk2Tier1ValueMovementsEnum as unknown as String),
        ...(Uk2Tier1FinancialEnum as unknown as String),
      },
      table: { category: 'Icon' },
    },
    uk2LabeledIconPosition: {
      name: 'Icon position',
      description: 'Icon position',
      control: 'radio',
      options: Uk2LabeledIconPositionEnum,
      table: { category: 'Icon' },
    },
  },
  parameters: {
    docs: {
      page: LabeledIconButtonDocumentation,
    },
    controls: { exclude: 'icon' },
  },
  decorators: [
    moduleMetadata({
      imports: [LabeledIconButtonModule],
    }),
  ],
} as Meta<LabeledIconButtonComponent>;

const labeledIconButtonTemplate: Story<LabeledIconButtonComponent> = (args: LabeledIconButtonComponent) => ({
  component: LabeledIconButtonComponent,
  props: {
    ...args,
  },
});
export const labeledIconButton = labeledIconButtonTemplate.bind({});
labeledIconButton.args = {
  uk2LabeledIconPosition: Uk2LabeledIconPositionEnum.left,
  uk2ButtonSize: Uk2ButtonSizeEnum.small,
  svgIconName: 'uk2-pencil',
};
