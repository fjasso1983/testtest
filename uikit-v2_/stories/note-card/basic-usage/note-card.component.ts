import { Component, Input } from '@angular/core';
import { Uk2NoteCardFontSizeEnum } from '@axos/uikit-v2-lib';
@Component({
  selector: 'storybook-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss'],
})
export class NoteCardComponent {
  @Input() uk2IsLoading = false;
  @Input() text =
    'Lorem ipsum: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at neque interdum integer lacus.At quis mi lacus odio auctor urna, orci.';
  @Input() hyperLinkText = 'Hyperlink at end';
  @Input() href = 'https://www.google.com';
  @Input() uk2NoteCardHasCheckbox = true;
  @Input() uk2FontNoteCard: Uk2NoteCardFontSizeEnum = Uk2NoteCardFontSizeEnum.small;
  @Input() checkboxVisible = true;
  constructor() {}
}
