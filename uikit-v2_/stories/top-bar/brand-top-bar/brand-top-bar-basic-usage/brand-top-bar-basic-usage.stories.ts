import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { BrandTopBarBasicUsageComponent } from './brand-top-bar-basic-usage.component';
import brandTopBarDocumentation from './brand-top-bar-basic-usage.docs.mdx';
import { BrandTopBarBasicUsageModule } from './brand-top-bar-basic-usage.module';

export default {
  title: 'Components/Top Bar/Brand Top Bar',
  component: BrandTopBarBasicUsageComponent,
  argTypes: {
    uk2IsAxos: {
      name: 'Axos Padding',
      description: "Toggle to apply specific padding to logo axos when 'Button visible' is false.",
      table: { category: 'States' },
    },
    uk2IsLoading: {
      name: 'Is Loading',
      description: 'Toggle to switch from default state to skeleton state.',
      table: { category: 'States' },
    },
    theme: {
      name: 'Logo',
      control: 'select',
      description:
        'Select one from the pre-loaded organization logos. Select [No logo] to see organization name instead.',
      options: ['Axos', 'Lexman Advisors', 'Nation Wide', 'Ufb Direct', '[No logo]'],
      table: { category: 'Theming' },
    },
    organizationName: {
      name: 'Organization Name',
      description: 'This name will display when [No logo] has been configured.',
      table: { category: 'Theming' },
    },
    withButton: {
      name: 'Button visible',
      description: 'Add button action to Top bar.',
      control: 'boolean',
      table: { category: 'Button action mode' },
    },
    labelText: {
      name: 'Text button',
      description: 'Text button action',
      control: 'text',
      table: { category: 'Button action mode' },
    },
    svgIconName: {
      name: 'Icon',
      description: 'Icon name from Uk2 Icon library.',
      control: 'text',
      table: { category: 'Button action mode' },
    },
    showCloseButton: {
      name: 'Show close button',
      description: 'Add close button action to Top bar.',
      control: 'boolean',
      table: { category: 'Close button action mode' },
    },
    urlRedirection: {
      name: 'Url redirection',
      description: 'Url to redirect on logo click.',
      control: 'text',
      table: { category: 'Logo redirection' },
    },
    openOnNewTab: {
      name: 'Open on new tab',
      description: 'Redirect on new tab or on same tab.',
      control: 'boolean',
      table: { category: 'Logo redirection' },
    },
    clickEventButtonTopBar: {
      action: 'clickEventButtonTopBar',
      table: { disable: true },
    },
    clickEventCloseButtonTopBar: {
      action: 'clickEventCloseButtonTopBar',
      table: { disable: true },
    },
  },
  parameters: {
    docs: {
      page: brandTopBarDocumentation,
    },
    controls: {
      exclude: [
        'ngOnChanges',
        'ngOnInit',
        'logo',
        'ngOnDestroy',
        'labeledIconButton',
        'button',
        'ngAfterViewInit',
        'handleThemeChange',
        'setButtonStyle',
        'clickButtonTopBar',
        'setAxosBranding',
        'isComponent',
        'clickCloseButtonTopBar',
        'urlRedirectionConfig',
        'changeLabelText',
        'changeWithButton',
        'changeSvgIconName',
        'changeUrlRedirectionConfig',
      ],
    },
  },
  decorators: [
    moduleMetadata({
      imports: [BrandTopBarBasicUsageModule],
    }),
  ],
} as unknown as Meta<BrandTopBarBasicUsageComponent>;

const basicUsageTemplate: Story<BrandTopBarBasicUsageComponent> = (args: BrandTopBarBasicUsageComponent) => ({
  component: BrandTopBarBasicUsageComponent,
  props: {
    ...args,
  },
});

export const basicUsage = basicUsageTemplate.bind({});
basicUsage.args = {
  theme: 'Axos',
  urlRedirection: 'http://www.axosbank.com',
  openOnNewTab: true,
};
