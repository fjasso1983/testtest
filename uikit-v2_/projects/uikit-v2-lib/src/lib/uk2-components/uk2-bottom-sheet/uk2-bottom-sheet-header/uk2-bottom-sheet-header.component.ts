import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'uk2-bottom-sheet-header',
  template: `
    <section id="uk2-bottom-sheet-header">
      <span id="uk2-bottom-sheet-header-title">{{ title }}</span>
      <span id="uk2-bottom-sheet-header-description">{{ description }}</span>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Uk2BottomSheetHeaderComponent {
  @Input() title!: string;
  @Input() description!: string;
}
