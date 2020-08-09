import * as Events from './types/Events';

/* eslint-disable no-multi-spaces, @typescript-eslint/indent */
export type Priority = 1 |  2 |  3 |  4 |  5 |  6 |  7 |  8 |  9
              |  10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19
              |  20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29
              |  30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39
              |  40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49
              |  50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59
              |  60 | 61 | 62 | 63 | 64 | 65 | 66 | 67 | 68 | 69
              |  70 | 71 | 72 | 73 | 74 | 75 | 76 | 77 | 78 | 79
              |  80 | 81 | 82 | 83 | 84 | 85 | 86 | 87 | 88 | 89
              |  90 | 91 | 92 | 93 | 94 | 95 | 96 | 97 | 98 | 99
              | 100;
/* eslint-enable no-multi-spaces, @typescript-eslint/indent */

export const MIN_PRIORITY = 1 as Priority;
export const MAX_PRIORITY = 100 as Priority;
export const DEFAULT_PRIORITY = 50 as Priority;

type ListenerCallback = (data: Events.GameEvent) => void;

// A map of event listener id to callback.
class ListenerCallbackMap extends Map<number, ListenerCallback> {}

export class ListenerMap {
  map: Map<Events.EventName, ListenerCallbackMap[]>;
  nextId: number;

  constructor() {
    this.map = new Map();
    this.nextId = 0;
  }

  // Encode both the id and priority into a single number. The last 7 bits hold the
  // priority, all the others hold the id.

  /* eslint-disable no-bitwise */
  static
  internalToId(id: number, priority: Priority) {
    return (id << 7) + priority;
  }

  static
  idToInternal(id: number): { id: number, priority: Priority } {
    const internalId = id >> 7;
    const priority = id % (1 << 7);
    return {
      id: internalId,
      priority: priority as Priority,
    };
  }
  /* eslint-enable no-bitwise */

  getAllCallbacks(key: Events.EventName): ListenerCallbackMap[] | undefined {
    return this.map.get(key);
  }

  getCallbacks(key: Events.EventName, priority: Priority): ListenerCallbackMap | undefined {
    const map = this.getAllCallbacks(key);
    if (!map) return undefined;

    return map[priority - 1];
  }

  get(key: Events.EventName, externalId: number): ListenerCallback | undefined {
    const { id, priority } = ListenerMap.idToInternal(externalId);

    const map = this.getCallbacks(key, priority);
    if (!map) return undefined;

    return map.get(id);
  }

  hasAllCallbacks(key: Events.EventName): boolean {
    return this.getAllCallbacks(key) !== undefined;
  }

  hasCallbacks(key: Events.EventName, priority: Priority): boolean {
    return this.getCallbacks(key, priority) !== undefined;
  }

  has(key: Events.EventName, externalId: number): boolean {
    return this.get(key, externalId) !== undefined;
  }

  setAllCallbacks(key: Events.EventName, value: ListenerCallbackMap[]): void {
    this.map.set(key, value);
  }

  setCallbacks(key: Events.EventName, priority: Priority, value: ListenerCallbackMap): void {
    if (!this.hasAllCallbacks(key)) {
      this.setAllCallbacks(key, new Array(MAX_PRIORITY));
    }

    this.getAllCallbacks(key)![priority - 1] = value;
  }

  set(key: Events.EventName, priority: Priority, value: ListenerCallback): number {
    if (!this.hasCallbacks(key, priority)) {
      this.setCallbacks(key, priority, new ListenerCallbackMap());
    }

    const map = this.getCallbacks(key, priority);

    const id = this.nextId;
    this.nextId += 1;

    map!.set(id, value);

    return ListenerMap.internalToId(id, priority);
  }

  delete(key: Events.EventName, externalId: number) {
    if (!this.has(key, externalId)) return false;
    const { id, priority } = ListenerMap.idToInternal(externalId);

    return this.getCallbacks(key, priority)!.delete(id);
  }
}

export default class EventManager {
  listeners: ListenerMap;

  constructor() {
    this.listeners = new ListenerMap();
  }

  // Set up a new event listener.
  addEventListener(
    event: Events.EventName,
    priority: Priority,
    listener: ListenerCallback,
  ): number {
    return this.listeners.set(event, priority, listener);
  }

  // Remove an event listener from the map.
  removeEventListener(event: Events.EventName, externalId: number): boolean {
    return this.listeners.delete(event, externalId);
  }

  // This method is fired whenever the GameEngine processes an event.
  onEvent(event: Events.GameEvent) {
    if (!this.listeners.hasAllCallbacks(event.name)) return;

    const allCallbacks = this.listeners.getAllCallbacks(event.name)!;

    // Iterate through the callback priorities. Lowest priorities get executed first.
    for (let i = 0; i < allCallbacks.length && !event.canceled; i += 1) {
      if (allCallbacks[i]) {
        const iter = allCallbacks[i].values();

        // Iterate through all the callbacks of this priority. There is no guarantee with
        // execution order.
        let callback = iter.next();
        while (!callback.done && !event.canceled) {
          callback.value(event);
          callback = iter.next();
        }
      }
    }
  }
}
