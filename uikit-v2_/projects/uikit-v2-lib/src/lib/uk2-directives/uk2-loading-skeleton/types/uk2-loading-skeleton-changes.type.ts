import { Uk2LoadingSkeletonSimpleChange } from './uk2-loading-skeleton-simple-change.type';

export type Uk2LoadingSkeletonChanges<T extends object> = T extends object
  ? {
      [P in keyof T]?: Uk2LoadingSkeletonSimpleChange<T[P]>;
    }
  : never;
