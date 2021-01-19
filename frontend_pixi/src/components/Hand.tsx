import { useEffect, useState, useRef } from 'react';
import { Spring } from 'react-spring';
import { Container } from '@inlet/react-pixi/animated';
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
  const [wasDragging, setWasDragging] = useState<number>(-1);
  const dragPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

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
  }, [cards, rearrangeable]);

  const numCards = orderedCards.length;
  const cardWidth = 575 * scale;

  const springConfig = {
    mass: 1,
    tension: 1000,
    friction: 100,
  };

  const getPosition = (
    index: number,
    ghost: number = ghostCard,
    dragging: number = draggingCard,
  ) => {
    let adjusted = index;
    if (ghost === -1 && dragging !== -1) {
      if (index > dragging) {
        adjusted -= 0.5;
      } else if (index < dragging) {
        adjusted += 0.5;
      }
    } else if (index > dragging && index <= ghost) {
      adjusted -= 1;
    } else if (index >= ghost && index < dragging) {
      adjusted += 1;
    }

    let x = adjusted * cardWidth;
    let y = 0;

    if (index === wasDragging) {
      x += dragPos.current.x;
      y += dragPos.current.y;
    }

    return { x, y };
  };

  if (numCards === 0) return null;

  const saveNewOrder = () => {
    let newOrderedCards: GameCard[] = [];
    if (draggingCard === ghostCard || ghostCard === -1) { 
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
    setWasDragging(-1);
    setDraggingCard(-1);

    dragPos.current.x = 0;
    dragPos.current.y = 0;
  };

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
        {orderedCards.map((card, i) => {
          let immediate = false;
          const to = getPosition(i);
          if (i === wasDragging) {
            immediate = true;
          }

          return (
            <Spring
              key={cardToString(card)}
              to={to}
              config={springConfig}
              immediate={immediate}
              onRest={() => {
                if (immediate) {
                  saveNewOrder();
                }
              }}
            >
              {(props) => (
                <Container
                  zIndex={i === draggingCard ? 10 : 1}
                  {...props}
                >
                  <Card
                    draggable={rearrangeable}
                    clickable={playable}
                    onDragStart={() => {
                      setGhostCard(i);
                      setDraggingCard(i);
                      setHighlightCard(-1);
                    }}
                    onDrag={(container) => {
                      dragPos.current.x = container.x;
                      dragPos.current.y = container.y;

                      let newGhost = i + Math.round(container.x / cardWidth);
                      newGhost = Math.max(0, newGhost);
                      newGhost = Math.min(numCards - 1, newGhost);
                      if (container.y < -275) {
                        newGhost = -1;
                      }
                      
                      if (newGhost !== ghostCard) {
                        setGhostCard(newGhost);
                      }
                    }}
                    onDragEnd={(container) => {
                      dragPos.current.x = container.x;
                      dragPos.current.y = container.y;
                      setWasDragging(i);

                      requestAnimationFrame(() => {
                        container.x = 0;
                        container.y = 0;
                      });
                    }}
                    onClick={() => {
                      setHighlightCard((old) => i === old ? -1 : i);
                    }}
                    card={card}
                    scale={scale}
                  />
                </Container>
              )}
            </Spring>
          );
        })}
      </Container>
    </Container>
  );
};

export default Hand;
