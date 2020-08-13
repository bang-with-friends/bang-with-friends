import * as Events from '../Events';

/* eslint-disable no-multi-spaces */
const eventsToTest: (Events.EventName | Events.GameEvent)[][] = [
  [Events.EventName.GAME_START,    new Events.GameStartEvent()],
  [Events.EventName.SHUFFLE_CARDS, new Events.ShuffleCardsEvent()],
  [Events.EventName.START_TURN,    new Events.StartTurnEvent({} as any)],
  [Events.EventName.END_TURN,      new Events.EndTurnEvent()],
  [Events.EventName.PLAY_CARD,     new Events.PlayCardEvent({} as any)],
  [Events.EventName.DISCARD_CARD,  new Events.DiscardCardEvent({} as any)],
  [Events.EventName.PICK_CARD,     new Events.PickCardEvent({} as any)],
  [Events.EventName.PLAYER_UPDATE, new Events.PlayerUpdateEvent({} as any)],
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
