const invalidFileTypeFn = (fileName: string) => `File '${fileName}' is of an invalid type`;

const invalidFileSizeFn = (fileName: string) => `File '${fileName}' exceeds the allowed file size`;

export const uk2FileUploadDragDropConstants = {
  errorMessages: {
    missingReadyState:
      'Uk2FileUploadDragDropDirective needs an element with the attribute "uk2-file-upload-ready" as a default state.',
    missingInput: 'Uk2FileUploadDragDropDirective needs to contain an input with the attribute type="file".',
    multipleFiles: 'Uploading multiple files is not allowed',
    invalidFileType: invalidFileTypeFn,
    invalidFileSize: invalidFileSizeFn,
  },
};
