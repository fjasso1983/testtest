import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { IconComponent } from './iconography.component';
import { IconographyModule } from './iconography.module';
import IconDocumentation from './iconography.docs.mdx';

export default {
  title: 'Iconography',
  component: IconComponent,
  argTypes: {
    tier1Color: {
      name: 'Tier 1 icons color',
      description: 'Sets the color, for the Tier 1 icons.',
      control: 'color',
      value: '#4A5560',
    }, // Color controls will be detected automatically
    tier2Color: {
      name: 'Tier 2 icons color (Mono)',
      description: 'Sets the color, for the Tier 2 Mono icons.',
      control: 'color',
      value: '#4A5560',
    }, // Color controls will be detected automatically
    tier2IsSelectedState: {
      name: 'Tier 2 Colored with Accent is selected',
      description: 'Sets the selected state for Tier 2 Colored with Accent icons.',
      control: 'boolean',
    },
  },
  parameters: {
    docs: {
      page: IconDocumentation,
    },
    controls: {
      exclude: [
        'themeWrapper',
        'ngOnChanges',
        'ngOnInit',
        'alertIcons',
        'biometricsIcons',
        'communicationIcons',
        'filesIcons',
        'financialEnum',
        'investEnum',
        'miscEnum',
        'navigationEnum',
        'utilityEnum',
        'valueMovementsEnum',
        'monoEnum',
        'coloredWithAccentEnum',
        'tier3',
      ],
    },
  },
  decorators: [
    moduleMetadata({
      imports: [IconographyModule],
    }),
  ],
} as unknown as Meta<IconComponent>;

const iconographyTemplate: Story<IconComponent> = (args: IconComponent) => ({
  component: IconComponent,
  props: {
    ...args,
  },
});
export const iconography = iconographyTemplate.bind({});
iconography.args = {};
