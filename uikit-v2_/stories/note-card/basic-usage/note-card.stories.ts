import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { Uk2NoteCardFontSizeEnum } from '@axos/uikit-v2-lib';
import NoteCardDocumentation from './note-card.docs.mdx';
import { NoteCardComponent } from './note-card.component';
import { NoteCardModule } from './note-card.module';

export default {
  title: 'Components/Note Card',
  component: NoteCardComponent,
  argTypes: {
    uk2FontNoteCard: {
      name: 'Font size',
      description: 'Card font size. It could be large or small.',
      table: { category: 'Inputs' },
    },
    checkboxVisible: {
      name: 'Checkbox is visible',
      description: 'Toggle the visibility of the checkbox element',
      table: { category: 'Inputs' },
    },
    uk2IsLoading: {
      name: 'Is Loading',
      description: 'Toggle to switch from default state to skeleton state.',
      table: { category: 'States' },
    },
    text: {
      name: 'Body text',
      description: 'Customize body text.',
      table: { category: 'Labels' },
    },
    hyperLinkText: {
      name: 'Hyperlink text',
      description: 'Customize hyperlink text.',
      table: { category: 'Labels' },
    },
    href: {
      name: 'Hyperlink URL',
      description: 'Customize the URL for the hyperlink',
      table: { category: 'Labels'},
    },
  },
  parameters: {
    docs: {
      page: NoteCardDocumentation,
    },
    controls: { exclude: ['uk2NoteCardHasCheckbox', 'ngOnChanges', 'ngOnInit', 'ngOnDestroy', 'toggleLoading'] },
  },
  decorators: [
    moduleMetadata({
      imports: [NoteCardModule],
    }),
  ],
} as unknown as Meta<NoteCardComponent>;

const basicUsageNoteCardTemplate: Story<NoteCardComponent> = (args: NoteCardComponent) => ({
  component: NoteCardComponent,
  props: {
    ...args,
  },
});
export const basicUsage = basicUsageNoteCardTemplate.bind({});
basicUsage.args = {};
basicUsage.args.uk2FontNoteCard = Uk2NoteCardFontSizeEnum.small;
