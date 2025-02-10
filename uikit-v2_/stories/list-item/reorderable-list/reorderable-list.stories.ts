import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { ReordableListItemComponent } from './reorderable-list.component';
import { ReordableListModule } from './reordable-list.module';
import ReordableListDocumentation from './reorderable-list.doc.mdx';

export default {
  title: 'Components/List Item',
  component: ReordableListItemComponent,
  parameters:{
    docs:{
      page:ReordableListDocumentation
    },
    controls:{
      exclude:[
        'ListItemFirst',
        'ListItemSecond',
        'ListItemThird',
        'ngOnInit',
        'listItems',
        'currencyOptions',
        'listItemFirst',
        'listItemSecond',
        'listItemThird',
        'menuItemFirst',
        'menuItemSecond',
        'menuItemThird',
        'menuListItems',
        'dropEvent',
        'dragIcon',
      ]
    }
  },
  decorators: [
    moduleMetadata({
      imports: [ReordableListModule],
    }),
  ],
} as Meta;

const Template: Story<ReordableListItemComponent> = (args: ReordableListItemComponent) => ({
  props: args,
});

export const ReordableListItem = Template.bind({});
ReordableListItem.args = {
  // Aquí puedes definir las propiedades por defecto de tu componente
};
