import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { AlertBannerBasicUsageComponent } from './alert-banner-basic-usage.component';
import alertBannerDocumentation from './alert-banner-basic-usage.docs.mdx';
import { AlertBannerBasicUsageModule } from './alert-banner-basic-usage.module';
import {
  Uk2AlertBannerBehaviorEnum,
  Uk2AlertBannerTypeEnum,
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
  title: 'Components/Alert Banner',
  component: AlertBannerBasicUsageComponent,
  argTypes: {
    alertType: {
      name: 'Alert type',
      control: 'radio',
      description: 'Select one from the alert type configuration.',
      options: Uk2AlertBannerTypeEnum,
    },
    alertBehavior: {
      name: 'Alert behavior',
      control: 'radio',
      description: 'Select one from the alert behavior configuration.',
      options: Uk2AlertBannerBehaviorEnum,
    },
    headerText: {
      name: 'Header text',
      description: 'Header text.',
    },
    bodyText: {
      name: 'Body text',
      description: 'Body text.',
    },
    hyperLink: {
      name: 'Hyper link',
      description: 'Hyper link text.',
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
    showBanner: {
      name: 'Is Displayed',
      description: 'Toggle visibility and trigger animation.',
      control: 'boolean',
    },
    isLoading: {
      name: 'Is Loading',
      description: 'Toggle to switch from default state to skeleton state.',
      control: 'boolean',
    },
    animateAlertBanner: {
      name: 'Is Animated',
      description: 'Toggle to switch if Alert banner should be animated on display.',
      control: 'boolean',
    },
  },
  parameters: {
    docs: {
      page: alertBannerDocumentation,
    },
    controls: {
      exclude: ['ngOnInit', 'ngOnChanges', 'dismissButtonClick', 'urlClick', 'typeChanged'],
    },
  },
  decorators: [
    moduleMetadata({
      imports: [AlertBannerBasicUsageModule],
    }),
  ],
} as unknown as Meta<AlertBannerBasicUsageComponent>;

const basicUsageTemplate: Story<AlertBannerBasicUsageComponent> = (args: AlertBannerBasicUsageComponent) => {
  const [{}, updateArgs] = useArgs();
  args.dismissButtonClick = () => updateArgs({ showBanner: false });

  let updatedSvgIconName = '';
  if (args.alertType == Uk2AlertBannerTypeEnum.inform) {
    updatedSvgIconName = Uk2Tier1AlertsEnum.exclamationTriangle;
  } else if (args.alertType == Uk2AlertBannerTypeEnum.alert) {
    updatedSvgIconName = Uk2Tier1AlertsEnum.infoCircle;
  }

  args.typeChanged = () => updateArgs({ svgIconName: updatedSvgIconName });

  return {
    component: AlertBannerBasicUsageComponent,
    props: {
      ...args,
    },
  };
};

export const basicUsage = basicUsageTemplate.bind({});
basicUsage.args = {
  alertType: Uk2AlertBannerTypeEnum.inform,
  alertBehavior: Uk2AlertBannerBehaviorEnum.dismissible,
  isLoading: false,
  bodyText:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  headerText: 'Lorem Ipsum Dolor',
  svgIconName: Uk2Tier1AlertsEnum.infoCircle,
  animateAlertBanner: true,
};
