export type Uk2MutationEventsWrapper<T = any> = {
  uk2EventType: T;
  mutations: MutationRecord[];
};
