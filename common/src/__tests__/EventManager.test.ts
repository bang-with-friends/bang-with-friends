import * as Events from '../Events';
import EventManager, {
  DEFAULT_PRIORITY,
  ListenerMap,
  MIN_PRIORITY,
  MAX_PRIORITY,
  Priority,
} from '../EventManager';

describe('ListenerMap', () => {
  it('initializes', () => {
    const map = new ListenerMap();
    expect(map).toBeTruthy();
    expect(map.map).toBeTruthy();
    expect(map.nextId).toBe(0);
  });

  it('correctly converts ids back and forth', () => {
    const test = (id: number, priority: Priority) => {
      expect(priority).toBeLessThanOrEqual(MAX_PRIORITY);
      expect(priority).toBeGreaterThanOrEqual(MIN_PRIORITY);

      const externalId = ListenerMap.internalToId(id, priority);
      expect(externalId).toBeTruthy();
      expect(externalId).not.toEqual(id);
      expect(externalId).not.toEqual(priority);

      const { id: nid, priority: npriority } = ListenerMap.idToInternal(externalId);
      expect(nid).toEqual(id);
      expect(npriority).toEqual(priority);
    };

    for (let id = 1; id <= 4096; id *= 2) {
      for (let priority = MIN_PRIORITY; priority <= MAX_PRIORITY; priority += 1) {
        test(id, priority as Priority);
      }

      for (let priority = MIN_PRIORITY; priority <= MAX_PRIORITY; priority += 1) {
        test(id + 1, priority as Priority);
      }
    }
  });
});

/* eslint-disable no-multi-spaces */
const eventsToTest: (Events.EventName | Events.GameEvent)[][] = [
  [Events.EventName.GAME_START,    new Events.GameStartEvent()],
  [Events.EventName.SHUFFLE_CARDS, new Events.ShuffleCardsEvent()],
  [Events.EventName.START_TURN,    new Events.StartTurnEvent({} as any)],
  [Events.EventName.END_TURN,      new Events.EndTurnEvent()],
  [Events.EventName.PLAY_CARD,     new Events.PlayCardEvent({} as any)],
  [Events.EventName.PICK_CARD,     new Events.PickCardEvent({} as any)],
  [Events.EventName.PLAYER_UPDATE, new Events.PlayerUpdateEvent({} as any)],
];
/* eslint-enable no-multi-spaces */

// Make sure we're testing all the events.
expect(eventsToTest.length).toBe(Object.keys(Events.EventName).length);

describe('EventManager', () => {
  it('initializes', () => {
    const manager = new EventManager();
    expect(manager).toBeTruthy();
    expect(manager.listeners).toBeTruthy();
  });

  it('works without events', () => {
    const manager = new EventManager();

    const event = new Events.GameStartEvent();
    manager.onEvent(event);
  });

  it('does not remove an invalid event', () => {
    const manager = new EventManager();

    expect(manager.removeEventListener(Events.EventName.GAME_START, 12345)).toBeFalsy();
  });

  it('fires listener on event', () => {
    const manager = new EventManager();

    const mockCallback = jest.fn((event?: Events.GameEvent) => {
      if (event) event.stopPropagation();
    });

    const id = manager.addEventListener(
      Events.EventName.GAME_START,
      DEFAULT_PRIORITY,
      mockCallback,
    );

    expect(id).not.toBe(0);

    const { id: iId, priority: iPriority } = ListenerMap.idToInternal(id);
    expect(iId).toEqual(0);
    expect(iPriority).toEqual(DEFAULT_PRIORITY);

    const event = new Events.GameStartEvent();
    manager.onEvent(event);

    expect(mockCallback.mock.calls.length).toBe(1);
    expect(event.canceled).toBeTruthy();

    // Fire the same event. It should already be cancelled, so the callback should not be
    // called.
    manager.onEvent(event);

    expect(mockCallback.mock.calls.length).toBe(1);

    // Remove the event listener and try firing again. The callback should not be called.
    expect(manager.removeEventListener(Events.EventName.GAME_START, id)).toBeTruthy();
    const event2 = new Events.GameStartEvent();
    manager.onEvent(event2);

    expect(mockCallback.mock.calls.length).toBe(1);
    expect(event2.canceled).toBeFalsy();
  });

  it('adds and removes listeners', () => {
    const manager = new EventManager();

    const mockCallback = jest.fn((event?: Events.GameEvent) => {
      if (event) event.stopPropagation();
    });

    const id = manager.addEventListener(
      Events.EventName.GAME_START,
      DEFAULT_PRIORITY,
      mockCallback,
    );

    expect(id).not.toBe(0);

    const { id: iId, priority: iPriority } = ListenerMap.idToInternal(id);
    expect(iId).toEqual(0);
    expect(iPriority).toEqual(DEFAULT_PRIORITY);

    expect(manager.listeners.map.get(Events.EventName.GAME_START)).not.toBeUndefined();
    expect(manager.listeners.map.get(Events.EventName.GAME_START)![DEFAULT_PRIORITY - 1])
      .not.toBeUndefined();
    expect(manager.listeners.map.get(Events.EventName.GAME_START)![DEFAULT_PRIORITY - 1].get(iId))
      .not.toBeUndefined();
    expect(manager.listeners.map.get(Events.EventName.GAME_START)![DEFAULT_PRIORITY - 1].get(iId))
      .toBe(mockCallback);
  });

  it('fires listeners in priority order', () => {
    const manager = new EventManager();

    const mockCallback = jest.fn((_event: Events.GameEvent | null, _priority: number) => { });

    const cb = (priority: number) => (e?: Events.GameEvent) => mockCallback(e || null, priority);

    for (let i = MIN_PRIORITY; i <= MAX_PRIORITY; i += 1) {
      manager.addEventListener(Events.EventName.GAME_START, i as Priority, cb(i));
    }

    expect(manager.listeners.map.get(Events.EventName.GAME_START)).not.toBeUndefined();

    const num = MAX_PRIORITY - MIN_PRIORITY + 1;
    for (let i = 0; i < num; i += 1) {
      expect(manager.listeners.map.get(Events.EventName.GAME_START)![i])
        .not.toBeUndefined();
    }

    manager.onEvent(new Events.GameStartEvent());

    expect(mockCallback.mock.calls.length).toBe(num);

    for (let i = 0; i < num; i += 1) {
      expect(mockCallback.mock.calls[i][1]).toBe(i + 1);
    }
  });

  it('fires all listeners of a priority', () => {
    const manager = new EventManager();

    const mockCallback = jest.fn((_event?: Events.GameEvent) => { });

    const num = 3;
    for (let i = 0; i < num; i += 1) {
      manager.addEventListener(Events.EventName.GAME_START, DEFAULT_PRIORITY, mockCallback);
    }

    expect(manager.listeners.map.get(Events.EventName.GAME_START)).not.toBeUndefined();
    expect(manager.listeners.map.get(Events.EventName.GAME_START)![DEFAULT_PRIORITY - 1].size)
      .toBe(num);

    manager.onEvent(new Events.GameStartEvent());

    expect(mockCallback.mock.calls.length).toBe(num);
  });

  it.each(eventsToTest)('works with all event types', (name: any, event: any) => {
    const manager = new EventManager();

    const mockCallback = jest.fn((_event?: Events.GameEvent) => { });

    manager.addEventListener(name as Events.EventName, DEFAULT_PRIORITY, mockCallback);

    manager.onEvent(event as Events.GameEvent);

    expect(mockCallback.mock.calls.length).toBe(1);
  });
});
