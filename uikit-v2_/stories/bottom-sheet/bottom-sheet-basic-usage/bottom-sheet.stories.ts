import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import bottomSheetDocumentation from './bottom-sheet.docs.mdx';
import { BottomSheetComponent } from './bottom-sheet.component';
import { BottomSheetModule } from './bottom-sheet.module';

export default {
  title: 'Components/Bottom Sheet',
  component: BottomSheetComponent,
  argTypes: {
    uk2IsLoading: {
      name: 'Is Loading',
      description: 'Toggle to switch from default state to skeleton state.',
      table: { category: 'States' },
    },
    title: {
      name: 'Title',
      description: 'Title of bottom sheet header',
      table: { category: 'Labels' },
    },
    description: {
      name: 'Description',
      description: 'Description of bottom sheet header',
      table: { category: 'Labels' },
    },
    showPrimaryButton: {
      name: 'Show primary button',
      description: 'Toggle visibility of primary button in footer',
      table: { category: 'Input' },
    },
    showSecondaryButton: {
      name: 'Show secondary button',
      description: 'Toggle visibility of secondary button in footer',
      table: { category: 'Input' },
    },
  },
  parameters: {
    docs: {
      page: bottomSheetDocumentation,
    },
    controls: {
      exclude: ['ngOnChange', 'onClickComplete', 'completeTemplateRef', 'completeTemplate', 'alignment', 'size'],
    },
    viewport: {
      defaultViewport: 'smallDevice',
    },
  },
  decorators: [
    moduleMetadata({
      imports: [BottomSheetModule],
    }),
  ],
} as Meta<BottomSheetComponent>;

const basicUsageTemplate: Story<BottomSheetComponent> = (args: BottomSheetComponent) => ({
  component: BottomSheetComponent,
  props: {
    ...args,
  },
});
export const basicUsage = basicUsageTemplate.bind({});
basicUsage.args = {};
