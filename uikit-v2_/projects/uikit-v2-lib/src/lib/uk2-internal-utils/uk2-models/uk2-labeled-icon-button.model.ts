export class Uk2LabeledIconButtonModel {
  svgIconName: string;
  labelText: string;

  constructor(uk2LabeledIconButton: any) {
    this.svgIconName = uk2LabeledIconButton.svgIconName || '';
    this.labelText = uk2LabeledIconButton.labelText || '';
  }
}
