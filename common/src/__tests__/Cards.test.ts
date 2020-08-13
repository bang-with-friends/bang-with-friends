import {
  CardSuit,
  CardType,
  GameCard,
  makeDeck,
  shuffleDeck,
} from '../Cards';

describe('GameCard', () => {
  it('initializes', () => {
    const card = new GameCard(CardSuit.HEARTS, 3, CardType.BANG);

    expect(card).toBeTruthy();
    expect(card.suit).toBe(CardSuit.HEARTS);
    expect(card.number).toBe(3);
    expect(card.type).toBe(CardType.BANG);
    expect(card.playable).toBeFalsy();
  });

  it('makes a new copy', () => {
    const origCard = new GameCard(CardSuit.HEARTS, 3, CardType.BANG);

    // Make a copy of the card.
    const card = origCard.copy();

    // All the fields should be the same.
    expect(card).toBeTruthy();
    expect(card.suit).toBe(CardSuit.HEARTS);
    expect(card.number).toBe(3);
    expect(card.type).toBe(CardType.BANG);
    expect(card.playable).toBeFalsy();

    // Modify the original.
    origCard.suit = CardSuit.SPADES;
    origCard.number = 12;
    origCard.type = CardType.MISSED;
    origCard.playable = true;

    // None of the copy's fields should have changed.
    expect(card.suit).toBe(CardSuit.HEARTS);
    expect(card.number).toBe(3);
    expect(card.type).toBe(CardType.BANG);
    expect(card.playable).toBeFalsy();
  });

  it('consistently creates card decks', () => {
    const cards1 = makeDeck();
    const cards2 = makeDeck();

    expect(cards1.length).toBe(80);
    expect(cards2.length).toBe(80);

    for (let i = 0; i < 80; i += 1) {
      const card1 = cards1[i];
      const card2 = cards2[i];

      expect(card1).toBeTruthy();
      expect(card2).toBeTruthy();
      expect(card2.suit).toBe(card1.suit);
      expect(card2.number).toBe(card1.number);
      expect(card2.type).toBe(card1.type);
      expect(card2.playable).toBe(card1.playable);
    }
  });

  it('does not mutate a deck on shuffle', () => {
    const cards1 = makeDeck();
    const cards2 = makeDeck();

    // Shuffle the deck
    shuffleDeck(cards1);

    // All the cards should still be the same.
    for (let i = 0; i < 80; i += 1) {
      const card1 = cards1[i];
      const card2 = cards2[i];

      expect(card1).toBeTruthy();
      expect(card2).toBeTruthy();
      expect(card2.suit).toBe(card1.suit);
      expect(card2.number).toBe(card1.number);
      expect(card2.type).toBe(card1.type);
      expect(card2.playable).toBe(card1.playable);
    }
  });

  it('sufficiently shuffles a deck', () => {
    const numCards = 80;
    const numTrials = 1000;
    let totalSame = 0;

    const dynamiteLocs: number[] = [];

    for (let n = 0; n < numTrials; n += 1) {
      let dynamiteLoc = -1;

      const cardsOrdered = makeDeck();
      const cardsShuffled = shuffleDeck(makeDeck());

      for (let i = 0; i < numCards; i += 1) {
        const card1 = cardsOrdered[i];
        const card2 = cardsShuffled[i];

        if (
          card1.suit === card2.suit
          && card1.number === card2.number
          && card1.type === card2.type
        ) {
          totalSame += 1;
        }

        if (card2.type === CardType.DYNAMITE) {
          dynamiteLoc = i;
        }
      }

      expect(dynamiteLoc).not.toEqual(-1);
      dynamiteLocs[dynamiteLoc] = (dynamiteLocs[dynamiteLoc] || 0) + 1;
    }

    const finalProbSame = totalSame / (numCards * numTrials);
    expect(finalProbSame).toBeCloseTo(1 / numCards);

    const exp = numTrials / numCards;
    let sqDiff = 0;
    for (let i = 0; i < numCards; i += 1) {
      expect(dynamiteLocs[i]).not.toBeUndefined();
      sqDiff += (dynamiteLocs[i] - exp) ** 2;
    }
    const stDev = Math.sqrt(sqDiff / (numCards - 1));

    expect(stDev).toBeLessThan(5);
  });
});
