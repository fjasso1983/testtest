export interface Uk2VisibilityStrategy<T> {
  processVisibility(directive: T): void;
}
