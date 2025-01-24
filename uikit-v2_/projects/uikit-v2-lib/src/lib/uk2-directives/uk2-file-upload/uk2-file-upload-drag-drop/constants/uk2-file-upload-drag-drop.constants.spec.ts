import { uk2FileUploadDragDropConstants } from './uk2-file-upload-drag-drop.constants';

describe('uk2FileUploadDragDropConstants', () => {
  it('should return the correct error message for invalid file type', () => {
    const fileName = 'test-file.pdf';
    const messageResult = uk2FileUploadDragDropConstants.errorMessages.invalidFileType(fileName);

    expect(messageResult).toEqual(`File 'test-file.pdf' is of an invalid type`);
  });

  it('should return the correct error message for invalid file size', () => {
    const fileName = 'test-file.pdf';
    const messageResult = uk2FileUploadDragDropConstants.errorMessages.invalidFileSize(fileName);

    expect(messageResult).toEqual(`File 'test-file.pdf' exceeds the allowed file size`);
  });
});
