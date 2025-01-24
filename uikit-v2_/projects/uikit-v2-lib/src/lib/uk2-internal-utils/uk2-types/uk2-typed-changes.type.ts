import { Uk2TypedChange } from '../uk2-classes';

export type Uk2TypedChanges<T extends object> = T extends object
  ? {
      [P in keyof T]?: Uk2TypedChange<T[P]>;
    }
  : never;
