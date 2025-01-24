import { Component, Input } from '@angular/core';
import { StoryBookUk2ScrollbarClassEnum } from './enums/srollbar-classes.enums';

@Component({
  selector: 'storybook-scrollbar',
  templateUrl: './scrollbar.component.html',
  styleUrls: ['./scrollbar.component.scss'],
})
export class ScrollbarComponent {
  @Input() class = StoryBookUk2ScrollbarClassEnum.medium;
  @Input() backgroundColor = '#d4e5fa';

  constructor() {}
}
