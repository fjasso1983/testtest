import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { ScrollbarComponent } from './scrollbar.component';
import { ScrollbarModule } from './scrollbar.module';
import ScrollbarDocumentation from './scrollbar.docs.mdx';
import { StoryBookUk2ScrollbarClassEnum } from './enums/srollbar-classes.enums';

export default {
  title: 'Scrollbar',
  component: ScrollbarComponent,
  argTypes: {
    class: {
      name: 'Scrollbar class',
      description: 'Set the scrollbar class to the container.',
      control: 'select',
      options: {
        ...(StoryBookUk2ScrollbarClassEnum as unknown as String),
      },
    },
    backgroundColor: {
      name: 'Background color',
      description: 'Background color of the container',
      control: 'color',
      value: '#d4e5fa',
    },
  },
  parameters: {
    docs: {
      page: ScrollbarDocumentation,
    },
    controls: {
      exclude: [],
    },
  },
  decorators: [
    moduleMetadata({
      imports: [ScrollbarModule],
    }),
  ],
} as unknown as Meta<ScrollbarComponent>;

const scrollbarTemplate: Story<ScrollbarComponent> = (args: ScrollbarComponent) => ({
  component: ScrollbarComponent,
  props: {
    ...args,
  },
});
export const scrollbar = scrollbarTemplate.bind({});
scrollbar.args = {
  class: StoryBookUk2ScrollbarClassEnum.medium,
  backgroundColor: '#d4e5fa',
};
