import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { FileDragDropModule } from './display-basic-usage.module';
import { FileUploaderDisplayBasicUsageComponent } from './display-basic-usage.component';
import fileUploaderDisplayDocs from './display-basic-usage.component.mdx';

export default {
  title: 'Components/File Uploader/File Display',
  component: FileUploaderDisplayBasicUsageComponent,
  parameters: {
    actions: {
      handles: ['onFileUpload', 'flyoutItemEvent'],
    },
    docs: {
      page: fileUploaderDisplayDocs,
    },
    controls: {
      exclude: [
        'onFileUpload',
        'buttonSmallSize',
        'buttonVariant',
        'elementPosition',
        'flyoutItemClick',
        'fileFileUrl',
        'iconExpand',
        'iconCollapse',
        'iconEllipses',
        'showPreview',
        'firstItem',
        'secondItem',
        'thirdItem',
        'fourthItem',
        'getFileUrl',
        'isImage',
        'fileUrl',
        'safeUrl',
        'file',
        'deleteFile',
        'flyoutMenu',
        'onExpandButtonClick'
      ],
    },
  },
  decorators: [
    moduleMetadata({
      imports: [FileDragDropModule],
    }),
  ],
  argTypes: {
    showFileSize: {
      name: 'Show file size',
      description: 'Shows the file size besides the file name.',
      table: { category: 'Display' },
    },
    showPreview: {
      name: 'Shows the file preview',
      description: 'Toggle to display the file preview',
      table: { category: 'Display' },
    },
    showCollapseButton: {
      name: 'Show expand/collapse button',
      description: 'Shows the expand and collapse button on the description bar.',
      table: { category: 'Display' },
    },
    isLoading: {
      name: 'Is loading',
      description: 'Toggle to switch from default state to skeleton state.',
      table: { category: 'States' },
    },
    flyoutItemClickEvent: {
      action: 'flyoutItemClickEvent',
      table: { disable: true },
    },
    expantButtonClickEvent: {
      action: 'expantButtonClickEvent',
      table: { disable: true },
    },
  },
} as Meta<FileUploaderDisplayBasicUsageComponent>;

const basicUsageTemplate: Story<FileUploaderDisplayBasicUsageComponent> = (
  args: FileUploaderDisplayBasicUsageComponent
) => ({
  component: FileUploaderDisplayBasicUsageComponent,
  props: {
    ...args,
  },
});
export const basicUsage = basicUsageTemplate.bind({});
basicUsage.args = {
  showCollapseButton: false,
  showFileSize: false,
  isLoading: false,
  showPreview: false,
};
