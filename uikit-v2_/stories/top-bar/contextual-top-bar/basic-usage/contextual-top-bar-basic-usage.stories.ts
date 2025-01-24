import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';

import Documentation from './contextual-top-bar-basic-usage.docs.mdx';
import { ContextualTopBarBasicUsageModule } from './contextual-top-bar-basic-usage.module';
import { ContextualTopBarBasicUsageComponent } from './contextual-top-bar-basic-usage.component';

export default {
  title: 'Components/Top Bar/Contextual Top Bar',
  component: ContextualTopBarBasicUsageComponent,
  argTypes: {
    hasTopBar: {
      name: 'It has Top Bar',
      description: 'Flag to indicate if the page has a top bar',
      table: { category: 'Inputs' },
    },
    isLoading: {
      name: 'Is Loading',
      description: 'Toggle skeleton view',
      table: {
        category: 'Inputs',
      },
    },
    isSticky: {
      name: 'It is Sticky',
      description: 'Flag to indicate if contextual top bar is sticky',
      table: {
        category: 'Inputs',
      },
    },
    title: {
      name: 'Page Label',
      description: 'Customize page label for the contextual top bar',
      table: {
        category: 'Labels',
      },
    },
    itHasContextualArea: {
      name: 'It Has Contextual Area',
      description: 'Simulate Contextual Area',
      table: {
        category: 'Inputs',
      },
    },
    showBackButton: {
      name: 'Show Back Button',
      description: 'Flag to indicate if the back button is visible only for mobile view ports',
      table: {
        category: 'Inputs',
      },
    },
    showCloseButton: {
      name: 'Show Close Button',
      description: 'Flag to indicate if the close button is visible only for mobile view ports',
      table: {
        category: 'Inputs',
      },
    },
    hasBreadCrumbs: {
      name: 'It has Bread Crumbs',
      description: 'Flag to indicate if the contextual top bar bread crumbs',
      table: { category: 'Inputs' },
    },
    hasGlobalTabs: {
      name: 'It has Global Tabs',
      description: 'Flag to indicate if the global tabs are visible',
      table: { category: 'Inputs' },
    },
    organizationName: {
      name: 'Organization Name',
      description: 'This name will display when [No logo] has been configured.',
      table: { category: 'Inputs' },
    },
    theme: {
      name: 'Logo',
      control: 'select',
      description:
        'Select one from the pre-loaded organization logos. Select [No logo] to see organization name instead.',
      options: ['Axos', 'Lexman Advisors', 'Nation Wide', 'Ufb Direct', '[No logo]'],
      table: { category: 'Brand Top Bar' },
    },
  },
  parameters: {
    docs: {
      page: Documentation,
    },
    controls: {
      exclude: [
        'ngOnChange',
        'ngOnChange',
        'updateItems',
        'ngAfterViewInit',
        'resetItems',
        'bindAnchorsClick',
        'breadcrumbItems',
        'uk2ButtonSize',
        'ngOnChanges',
        'arrowBackIcon',
        'uk2ButtonSize',
        'breadcrumbs',
        'goBack',
        'logoUrl',
        'items',
        'uk2BackButtonSize',
        'ngOnDestroy',
        'onItemSelected',
        'selectedTab',
        'xIcon',
        'leftButtonIcon',
        'tabChange',
        'brandedTopBarHandler',
        'urlRedirectionConfig',
        'isAxos',
        'labeledIconButton',
        'leftButtonSize',
        'closeIconButton',
        'mobileLogoUrl',
        'horizontalTabsDisabled',
        'horizontalTabsIconsHidden',
        'horizontalTabsBadgesHidden',
        'ngOnInit',
        'handleTopBarLogo',
        'Uk2ContextualTopBarDirective',
        'uk2ContextualTopBar',
      ],
    },
  },
  decorators: [
    moduleMetadata({
      imports: [ContextualTopBarBasicUsageModule],
    }),
  ],
} as unknown as Meta<ContextualTopBarBasicUsageComponent>;

const basicUsageTemplate: Story<ContextualTopBarBasicUsageComponent> = (args: ContextualTopBarBasicUsageComponent) => ({
  component: ContextualTopBarBasicUsageComponent,
  props: {
    ...args,
  },
});

export const basicUsage = basicUsageTemplate.bind({});
basicUsage.args = {
  isLoading: false,
  hasBreadCrumbs: true,
  showBackButton: false,
  showCloseButton: false,
  hasTopBar: false,
  hasGlobalTabs: true,
  title: 'Title',
};
basicUsage.parameters = {
  backgrounds: {
    default: 'whitesmoke',
    values: [
      {
        name: 'whitesmoke',
        value: '#F8F8F8',
      },
    ],
  },
};
