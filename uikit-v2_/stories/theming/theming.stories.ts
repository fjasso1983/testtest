import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import themingDocumentation from './theming.docs.mdx';
import { ThemingComponent } from './theming.component';
import { ThemingModule } from './theming.module';

export default {
  title: 'Theming',
  component: ThemingComponent,
  argTypes: {
    predefinedTheme: {
      name: 'Theme',
      description: 'Changes all color values to the branding of an specific organization',
      control: 'select',
      options: ['Default', 'Lexman', 'Org1', 'Org2', 'Org3'],
      table: { category: 'Predefined Themes' },
    },
    accentColor: {
      name: 'primary/accent 400',
      description:
        'Sets the primary/accent 400 color, where the different shades will be generated from. This generated palette will be applied to all components supporting White Label tokens.',
      control: 'color',
      value: '#2F5B88',
      table: { category: 'Auto-generated palettes' },
    },
  },
  parameters: {
    docs: {
      page: themingDocumentation,
    },
    controls: {
      exclude: [
        'ngOnChanges',
        'themeWrapper',
        'extractHSLValues',
        'hexToHsl',
        'rgbaToHsl',
        'convertRgbToHsl',
        'getHslFormat',
        'handlePrimaryAccentColorChange',
        'handleTooltipLabelColorChange',
        'handleActiveFormFieldBorderColorChange',
        'handleSelectorCardsColorChange',
        'handleThemeChange',
        'loadAxosTheme',
        'loadDefaultTheme',
        'loadLexmanTheme',
        'loadRIA1Theme',
        'loadRIA2Theme',
        'loadRIA3Theme',
        'loadTheme',
        'setPrimaryAccentHsl',
        'resetAccentColorHslVariables',
        'resetComponentSpecificVariables',
        'resetGlobalVariables',
        'setRiaSpecificVariables',
        'setRIAVariableOverwrites',
      ],
    },
  },
  decorators: [
    moduleMetadata({
      imports: [ThemingModule],
    }),
  ],
} as Meta<ThemingComponent>;

const themingTemplate: Story<ThemingComponent> = (args: ThemingComponent) => ({
  component: ThemingComponent,
  props: {
    ...args,
  },
});
export const theming = themingTemplate.bind({});
theming.args = {
  accentColor: '#2F5B88',
};
