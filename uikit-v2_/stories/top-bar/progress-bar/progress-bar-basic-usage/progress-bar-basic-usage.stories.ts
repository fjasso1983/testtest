import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { ProgressBarBasicUsageComponent } from './progress-bar-basic-usage.component';
import progressBarDocumentation from './progress-bar-basic-usage.docs.mdx';
import { ProgressBarBasicUsageModule } from './progress-bar-basic-usage.module';

export default {
  title: 'Components/Top Bar/Progress Bar',
  component: ProgressBarBasicUsageComponent,
  argTypes: {
    theme: {
      name: 'Logo',
      control: 'select',
      description:
        'Select one from the pre-loaded organization logos. Select [No logo] to see organization name instead.',
      options: ['Axos', 'Lexman Advisors', 'Nation Wide', 'Ufb Direct', '[No logo]'],
      table: { category: 'Theming' },
    },
    uk2IsLoading: {
      name: 'Is Loading',
      description: 'Toggle to switch from default state to skeleton state.',
      table: { category: 'States' },
    },
    uk2OrganizationName: {
      name: 'Organization Name',
      description: 'This name will display when [No logo] has been configured.',
      table: { category: 'Theming' },
    },
    uk2ProgressBarValue: {
      name: 'Progress Bar Value',
      description: 'It is the value that the progress bar will have.',
      table: { category: 'Progress Bar' },
    },
    uk2HeaderText: {
      name: 'Title Text',
      description: 'It is the value that the title text will have.',
      table: { category: 'Header Label' },
    },
    withHeaderButton: {
      name: 'Has Button',
      description: 'It is a flag to determine if the header button will be rendered or not',
      table: { category: 'Header Button' },
    },
    svgIconNameHeaderButton: {
      name: 'SVG Icon',
      description: 'It is the svg icon of the header button',
      table: { category: 'Header Button' },
    },
    labelTextHeaderButton: {
      name: 'Label',
      description: 'It is the label of the header button',
      table: { category: 'Header Button' },
    },
    withFooterButton: {
      name: 'Has Button',
      description:
        'It is a flag to determine if the footer button will be rendered or not. In small resolutions this will be seen on the left side of the header title.',
      table: { category: 'Footer Button' },
    },
    svgIconNameFooterButton: {
      name: 'SVG Icon',
      description: 'It is the svg icon of the footer button',
      table: { category: 'Footer Button' },
    },
    labelTextFooterButton: {
      name: 'Label',
      description: 'It is the label of the footer button',
      table: { category: 'Footer Button' },
    },
    uk2HeaderCallBackButton: {
      table: { disable: true },
    },
    uk2FooterCallBackButton: {
      table: { disable: true },
    },
  },
  parameters: {
    docs: {
      page: progressBarDocumentation,
    },
    controls: {
      exclude: [
        'uk2HeaderIconButton',
        'uk2FooterIconButton',
        'uk2LogoImgPath',
        'buttons',
        'ngOnInit',
        'ngOnChanges',
        'uk2HeaderIconButtonChange',
        'uk2FooterIconButtonChange',
        'ngAfterViewInit',
        'ngOnDestroy',
        'handleThemeChange',
        'setAxosBranding',
        'setButtonStyle',
      ],
    },
  },
  decorators: [
    moduleMetadata({
      imports: [ProgressBarBasicUsageModule],
    }),
  ],
} as unknown as Meta<ProgressBarBasicUsageComponent>;

const basicUsageTemplate: Story<ProgressBarBasicUsageComponent> = (args: ProgressBarBasicUsageComponent) => ({
  component: ProgressBarBasicUsageComponent,
  props: {
    ...args,
  },
});

export const basicUsage = basicUsageTemplate.bind({});
basicUsage.args = {
  theme: 'Axos',
};
