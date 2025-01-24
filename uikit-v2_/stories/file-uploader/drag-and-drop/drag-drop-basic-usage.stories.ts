import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { FileDragDropBasicUsageComponent } from './drag-drop-basic-usage.component';
import FileUploaderDragDropDocs from './drag-drop-basic-usage.docs.mdx';
import { FileDragDropModule } from './drag-drop-basic-usage.module';

export default {
  title: 'Components/File Uploader/Drag and drop',
  component: FileDragDropBasicUsageComponent,
  parameters: {
    actions: {
      handles: ['fileUploaderSuccess', 'onErrorAction'],
    },
    docs: {
      page: FileUploaderDragDropDocs,
    },
    controls: {
      exclude: ['onSuccessAction', 'uploaderAllowedType', 'uploaderIcon', 'spinnerIcon', 'isUploading', 'ngOnChanges'],
    },
  },
  decorators: [
    moduleMetadata({
      imports: [FileDragDropModule],
    }),
  ],
  argTypes: {
    isLoading: {
      name: 'Is Loading',
      description: 'Toggle to switch from default state to skeleton state.',
      table: { category: 'States' },
    },
    isDisabled: {
      name: 'Is Disabled',
      description: 'Toggle to disabled the uploader',
      table: { category: 'States' },
    },
    canUploadMultipleFiles: {
      name: 'Can upload multiple files',
      description: 'Customize the uploader to allow uploading multiple files',
      table: { category: 'Uploader restrictions' },
    },
    allowedFileTypes: {
      name: 'Allowed file type',
      description: 'Customize the uploader allowed file type',
      options: ['image/jpeg', 'image/png', 'application/pdf'],
      control: { type: 'radio' },
      table: { category: 'Uploader restrictions' },
    },
    maxFileSize: {
      name: 'Maximum file size',
      description: 'Customize the uploader maximum allowed size',
      options: [524288, 1048576, 2097152, 5242880],
      control: {
        type: 'radio',
        labels: {
          524288: '0.5 MB',
          1048576: '1 MB',
          2097152: '2 MB',
          5242880: '5 MB',
        },
      },
    },
    fileUploaderSuccess: {
      action: 'fileUploaderSuccess',
      table: { disable: true },
    },
    onErrorAction: {
      action: 'onErrorAction',
      table: { disable: true },
    },
  },
} as Meta<FileDragDropBasicUsageComponent>;

const basicUsageTemplate: Story<FileDragDropBasicUsageComponent> = (args: FileDragDropBasicUsageComponent) => ({
  component: FileDragDropBasicUsageComponent,
  props: {
    ...args,
  },
});
export const basicUsage = basicUsageTemplate.bind({});
basicUsage.args = {
  canUploadMultipleFiles: false,
  allowedFileTypes: 'image/png',
  maxFileSize: 1048576,
  isDisabled: false,
  isLoading: false,
};
