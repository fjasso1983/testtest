import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { MessagingCardBasicUsageComponent } from './messaging-card-basic-usage.component';
import messagingCardDocumentation from './messaging-card-basic-usage.docs.mdx';
import { MessagingCardBasicUsageModule } from './messaging-card-basic-usage.module';
import {
  Uk2MessagingCardTypeEnum,
  Uk2Tier1AlertsEnum,
  Uk2Tier1BiometricsEnum,
  Uk2Tier1CommunicationEnum,
  Uk2Tier1FilesEnum,
  Uk2Tier1FinancialEnum,
  Uk2Tier1InvestEnum,
  Uk2Tier1MiscEnum,
  Uk2Tier1NavigationEnum,
  Uk2Tier1UtilityEnum,
  Uk2Tier1ValueMovementsEnum,
} from '@axos/uikit-v2-lib';
import { useArgs } from '@storybook/client-api';

export default {
  title: 'Components/Messaging Card',
  component: MessagingCardBasicUsageComponent,
  argTypes: {
    type: {
      name: 'Messaging Card type',
      control: 'radio',
      description: 'Select one from the Messaging Card type configuration.',
      options: Uk2MessagingCardTypeEnum,
    },
    headerText: {
      name: 'Header text',
      description: 'Header text.',
    },
    svgIconName: {
      name: 'Icon name',
      description: 'Icon name Tier 1 from Uk2 Icon library.',
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
    },
    showIcon: {
      name: 'Show Icon',
      description: 'Show/Hide left Icon.',
      control: 'boolean',
    },
    isLoading: {
      name: 'Is Loading',
      description: 'Toggle to switch from default state to skeleton state.',
      control: 'boolean',
    },
    isExpandable: {
      name: 'Is Expandable',
      description: 'Toggle to switch from expandable state to status state.',
      control: 'boolean',
    },
    isExpanded: {
      name: 'Is Expanded',
      description: 'Toggle to switch from collapsed to expanded.',
      control: 'boolean',
    },
  },
  parameters: {
    docs: {
      page: messagingCardDocumentation,
    },
    controls: {
      exclude: ['ngOnInit', 'ngOnChanges', 'typeChanged', 'isExpandableChanged'],
    },
  },
  decorators: [
    moduleMetadata({
      imports: [MessagingCardBasicUsageModule],
    }),
  ],
} as unknown as Meta<MessagingCardBasicUsageComponent>;

const basicUsageTemplate: Story<MessagingCardBasicUsageComponent> = (args: MessagingCardBasicUsageComponent) => {
  const [{}, updateArgs] = useArgs();

  if (args.type != Uk2MessagingCardTypeEnum.alert) {
    args.typeChanged = () => updateArgs({ svgIconName: '' });
    args.typeChanged = () => updateArgs({ showIcon: true });
  }

  if (args.isExpandable == true) {
    args.isExpandableChanged = () => updateArgs({ isExpanded: false });
  }

  return {
    component: MessagingCardBasicUsageComponent,
    props: {
      ...args,
    },
  };
};

export const basicUsage = basicUsageTemplate.bind({});
basicUsage.args = {
  type: Uk2MessagingCardTypeEnum.inform,
  isLoading: false,
  headerText: 'Lorem ipsum dolor sit amet',
  svgIconName: '',
};
