import {
  Component,
  Input,
} from '@angular/core';

@Component({
  selector: 'loading-skeleton-basic-usage',
  templateUrl: './loading-skeleton.component.html',
  styles: [`
    .spacing-bottom {
      margin-bottom: 1rem;
    }

    .grid-item {
      margin-bottom: 1rem;
    }
  `],
})
export class LoadingSkeletonComponent {
  @Input() uk2IsLoading = true;
  @Input() uk2LoadingHeight: number = 30;
  @Input() uk2LoadingWidth: number = 300;
  classPrefixList = [
    '200',
    '300',
    '400',
    '500',
    '600',
  ]
}
