import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { SuggestedActionBasicUsageComponent } from './suggested-action-basic-usage.component';
import suggestedActionBasicUsageDocumentation from './suggested-action-basic-usage.docs.mdx';
import { Uk2SuggestedActionModule, Uk2ServicesModule, Uk2TooltipPlacementEnum } from '@axos/uikit-v2-lib';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { action } from '@storybook/addon-actions';
import { StoriesCommonModule } from 'stories/stories-common.module';

export default {
  title: 'Components/Suggested Action Module',
  component: SuggestedActionBasicUsageComponent,
  argTypes: {
    headerSvgIconName: {
      name: 'Header icon',
      description: 'Define the icon name for the header',
      table: { category: 'Labels' },
    },
    panelTitle: {
      name: 'Header label',
      description: 'Customize the panel title',
      table: { category: 'Labels' },
    },
    panelSubtitle: {
      name: 'Body label',
      description: 'Customize the placeholder text for panel subtitle',
      table: { category: 'Labels' },
    },
    buttonText: {
      name: 'Button Text',
      description: 'Customize the placeholder text for the button',
      table: { category: 'Labels' },
    },
    hideButton: {
      name: 'Hide button',
      description: 'Toggle to hide the component button.',
      table: { category: 'States' },
    },
    isExpandable: {
      name: 'Is expandable',
      description: 'Toggle to let component to be expandable when this is true.',
      table: { category: 'States' },
    },
    isExpanded: {
      name: 'Is expanded',
      description: 'Toggle to let component to be expanded when this is true.',
      table: { category: 'States' },
    },
    isTooltipEnable: {
      name: 'Is tooltip icon visible',
      description: 'Toggle to let component to show tooltip when this is true.',
      table: { category: 'Tooltip' },
    },
    tooltipDisplayCloseButton: {
      name: 'Display close button',
      description: 'Toggle to display close button in tooltip when this is true.',
      table: { category: 'Tooltip' },
    },
    tooltipBodyText: {
      name: 'Tooltip body text',
      description: 'Text to display in tooltip.',
      table: { category: 'Tooltip' },
    },
    tooltipPlacement: {
      name: 'tooltip Placement',
      description:
        "The <strong>preferred</strong> placement of the Tooltip box. Note that Tooltip's flip modifier can change this to the opposite placement if it has more space.",
      options: Uk2TooltipPlacementEnum,
      control: { type: 'radio' },
      table: { category: 'Tooltip' },
    },
    tooltipArrowOffset: {
      name: 'Arrow offset position',
      description: 'Add offset to arrow tooltip box position.',
      control: 'number',
      table: { category: 'Tooltip' },
    },
  },
  parameters: {
    docs: {
      page: suggestedActionBasicUsageDocumentation,
    },
    controls: {
      exclude: [
        'ngOnChanges',
        'ngOnInit',
        'toggleToolTipIcon',
        'tooltipConfig',
        'oldTooltipConfig',
        'toggleToolTipConfig',
      ],
    },
  },
  decorators: [
    moduleMetadata({
      imports: [
        StoriesCommonModule,
        Uk2SuggestedActionModule,
        MatIconModule,
        MatExpansionModule,
        MatTooltipModule,
        MatButtonModule,
        BrowserAnimationsModule,
        BrowserModule,
        HttpClientModule,
        Uk2ServicesModule,
      ],
    }),
  ],
} as unknown as Meta<SuggestedActionBasicUsageComponent>;

const suggestedActionbasicUsageTemplate: Story<SuggestedActionBasicUsageComponent> = (
  args: SuggestedActionBasicUsageComponent
) => ({
  component: SuggestedActionBasicUsageComponent,
  props: {
    ...args,
    onArchiveTask: action(''),
  },
});
export const basicUsage = suggestedActionbasicUsageTemplate.bind({});
basicUsage.args = {
  tooltipBodyText: 'Example tooltip',
  tooltipDisplayCloseButton: true,
  tooltipPlacement: Uk2TooltipPlacementEnum.top,
  tooltipArrowOffset: 0,
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
