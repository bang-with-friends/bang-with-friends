import { useEffect, useState } from 'react';
import { Container } from '@inlet/react-pixi/legacy';
import { GameCard } from 'common/lib/Cards';

import Rectangle from '../common/Rectangle';
import Card from './Card';

const cardToString = (card: GameCard) => [
  card.number, card.suit, card.type, card.playable ? 'P' : ''
].join('-');

interface IHandProps {
  rearrangeable?: boolean;
  playable?: boolean;
  cards: GameCard[];
  scale?: number;
}

const Hand = (props: IHandProps) => {
  const { rearrangeable = false, playable = false, cards, scale = 1 } = props;

  const [orderedCards, setOrderedCards] = useState<GameCard[]>([]);
  const [draggingCard, setDraggingCard] = useState<number>(-1);
  const [ghostCard, setGhostCard] = useState<number>(-1);
  const [highlightCard, setHighlightCard] = useState<number>(-1);

  useEffect(() => {
    if (!rearrangeable) {
      setOrderedCards(cards);
      return;
    }

    const newCards = new Set<GameCard>(cards);
    const sharedOrder: GameCard[] = [];

    orderedCards.forEach((card) => {
      if (newCards.has(card)) {
        sharedOrder.push(card);
        newCards.delete(card);
      }
    });

    setOrderedCards([ ...sharedOrder, ...newCards.values() ]);
  }, [cards, setOrderedCards, rearrangeable]);

  const numCards = orderedCards.length;
  if (numCards === 0) return null;

  const cardWidth = 575 * scale;

  return (
    <Container anchor={0.5} x={(1 - numCards) * cardWidth * 0.5}>
      <Container sortableChildren={true}>
        {orderedCards.map((_, i) => (
          <Container
            key={`ghost-${i}`}
            x={cardWidth * i}
          >
            <Rectangle
              x={-256 * scale}
              y={-365.25 * scale}
              width={512 * scale}
              height={730.5 * scale}
              opacity={i === ghostCard ? 0.7 : 0}
              borderRadius={16 * scale}
            />
            <Rectangle
              x={(-256 + 20) * scale}
              y={385 * scale}
              width={(512 - 40) * scale}
              height={10 * scale}
              fill={0xffffff}
              opacity={i === highlightCard ? 1 : (i === ghostCard ? 0.5 : 0)}
            />
          </Container>
        ))}
      </Container>
      <Container sortableChildren={true}>
        {orderedCards.map((card, i) => (
          <Container
            x={cardWidth * i
              + (i > draggingCard && i <= ghostCard ? -cardWidth : 0)
              + (i >= ghostCard && i < draggingCard ? cardWidth : 0)}
            zIndex={i === draggingCard ? 10 : 1}
          >
            <Card
              key={`${cardToString(card)}`}
              draggable={rearrangeable}
              clickable={playable}
              onDragStart={() => {
                setGhostCard(i);
                setDraggingCard(i);
                setHighlightCard(-1);
              }}
              onDrag={({ x }) => {
                let newGhost = i + Math.round(x / cardWidth);
                newGhost = Math.max(0, newGhost);
                newGhost = Math.min(numCards - 1, newGhost);
                
                if (newGhost !== ghostCard) {
                  setGhostCard(newGhost);
                }
                console.log(newGhost);
              }}
              onDragEnd={(container) => {
                container.x = 0;
                container.y = 0;

                let newOrderedCards: GameCard[] = [];
                if (draggingCard === ghostCard) { 
                  newOrderedCards = orderedCards;
                } else {
                  orderedCards.forEach((oCard, oI) => {
                    if (oI === draggingCard) return;
                    if (oI === ghostCard) {
                      if (ghostCard > draggingCard) newOrderedCards.push(oCard);
                      newOrderedCards.push(orderedCards[draggingCard]);
                      if (ghostCard < draggingCard) newOrderedCards.push(oCard);
                      return;
                    }

                    newOrderedCards.push(oCard);
                  });
                }

                setOrderedCards(newOrderedCards);
                setHighlightCard(ghostCard);
                setGhostCard(-1);
                setDraggingCard(-1);
              }}
              onClick={() => {
                setHighlightCard((old) => i === old ? -1 : i);
              }}
              card={card}
              scale={scale}
            />
          </Container>
        ))}
      </Container>
    </Container>
  );
};

export default Hand;
