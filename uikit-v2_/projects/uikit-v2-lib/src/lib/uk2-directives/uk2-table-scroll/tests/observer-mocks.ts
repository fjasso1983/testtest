export class MockResizeObserver {
  observe: () => void;
  disconnect: () => void;
  callback: ResizeObserverCallback;

  constructor(callback: ResizeObserverCallback) {
    this.observe = () => {};
    this.disconnect = () => {};
    this.callback = callback;
  }

  //Test method to trigger a resize
  trigger(entries: ResizeObserverEntry[]) {
    this.callback(entries, this as unknown as ResizeObserver);
  }
}

export class MockIntersectionObserver {
  observe: () => void;
  disconnect: () => void;
  callback: IntersectionObserverCallback;

  constructor(callback: IntersectionObserverCallback) {
    this.observe = () => {};
    this.disconnect = () => {};
    this.callback = callback;
  }

  //Test method to trigger an intersection
  trigger(entries: IntersectionObserverEntry[]) {
    this.callback(entries, this as unknown as IntersectionObserver);
  }
}
