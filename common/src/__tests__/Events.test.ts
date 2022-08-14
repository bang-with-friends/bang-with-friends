import * as Events from '../Events';

/* eslint-disable no-multi-spaces */
const eventsToTest: (Events.EventName | Events.GameEvent)[][] = [
  [Events.EventName.GAME_START_EVENT,    new Events.GameStartEvent()],
];
/* eslint-enable no-multi-spaces */

// Make sure we're testing all the events.
expect(eventsToTest.length).toBe(Object.keys(Events.EventName).length);

describe('GameEvent', () => {
  it('updates canceled when stopPropagation is called', () => {
    const event = new Events.GameStartEvent();

    expect(event.canceled).toBeFalsy();
    event.stopPropagation();
    expect(event.canceled).toBeTruthy();
    event.stopPropagation();
    expect(event.canceled).toBeTruthy();
  });

  it.each(eventsToTest)('initializes all events', (name: any, event: any) => {
    expect(event.name).toBe(name);
  });
});
