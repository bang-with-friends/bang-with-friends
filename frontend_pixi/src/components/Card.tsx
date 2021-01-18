import { useRef } from 'react';
import { Container, Sprite, Text } from '@inlet/react-pixi/legacy';
import * as PIXI from 'pixi.js-legacy';

import { CardSuit, CardType, GameCard } from 'common/lib/Cards';
import PngSource from '*.png';

import cardBackground from '../assets/card/background.png';
import {
  bang,
  beer,
  gatling,
  general_store,
  indians,
  jail,
  missed,
  remington,
  rev_carabine,
  schofield,
  volcanic,
  winchester,
} from '../assets/card/cards';
import { clubs, diamonds, hearts, spades } from '../assets/card/suits';
import Rectangle from '../common/Rectangle';
import useLoader from '../common/useLoader';
import useStatefulRef from '../common/useStatefulRef';
import useTexture from '../common/useTexture';

const cardLoader = new PIXI.Loader();

type Png = typeof PngSource;

// TODO: use a spritesheet for more efficient loading

const suitSources: { [suit in CardSuit]: Png } = {
  [CardSuit.CLUBS]: clubs,
  [CardSuit.DIAMONDS]: diamonds,
  [CardSuit.HEARTS]: hearts,
  [CardSuit.SPADES]: spades,
};

const typeSources: { [type in CardType]: Png | null } = {
  [CardType.BANG]: bang,
  [CardType.BEER]: beer,
  [CardType.GATLING]: gatling,
  [CardType.GENERAL_STORE]: general_store,
  [CardType.INDIANS]: indians,
  [CardType.JAIL]: jail,
  [CardType.MISSED]: missed,
  [CardType.REMINGTON]: remington,
  [CardType.REV_CARABINE]: rev_carabine,
  [CardType.SCHOFIELD]: schofield,
  [CardType.VOLCANIC]: volcanic,
  [CardType.WINCHESTER]: winchester,

  [CardType.CAT_BALOU]: null,
  [CardType.PANIC]: null,
  [CardType.DUEL]: null,
  [CardType.STAGECOACH]: null,
  [CardType.WELLS_FARGO]: null,
  [CardType.SALOON]: null,
  [CardType.MUSTANG]: null,
  [CardType.BARREL]: null,
  [CardType.SCOPE]: null,
  [CardType.DYNAMITE]: null,
};

const cardNumber: { [key: number]: string } = {
  1: 'A',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  7: '7',
  8: '8',
  9: '9',
  10: '10',
  11: 'J',
  12: 'Q',
  13: 'K',
};

const getSuitKey = (suit: CardSuit) => `cardsuit_${suit}`;
const getTypeKey = (type: CardType) => `cardtype_${type}`;

Object.values(CardSuit).forEach((suit: CardSuit) => {
  cardLoader.add(getSuitKey(suit), suitSources[suit]);
});

Object.values(CardType).forEach((type: CardType) => {
  if (typeSources[type] === null) return;
  cardLoader.add(getTypeKey(type), typeSources[type]);
});

cardLoader.add('cardBackground', cardBackground);

interface ICardProps {
  draggable?: boolean;
  clickable?: boolean;
  onDragStart?: () => void;
  onDrag?: (offset: { x: number; y: number }) => void;
  onDragEnd?: (cardContainer: PIXI.Container) => void;
  onClick?: () => void;
  scale?: number;
  card: GameCard;
}

const Card = (props: ICardProps) => {
  const {
    draggable = false,
    clickable = false,
    onDragStart = () => {},
    onDrag = () => {},
    onDragEnd = () => {},
    onClick = () => {},
    scale = 1,
    card,
  } = props;
  const { suit, type, number } = card;

  const cardRef = useStatefulRef<PIXI.Container>(null);
  const maskRef = useStatefulRef<PIXI.Sprite>(null);
  const startPos = useRef<{ x: number, y: number} | null>(null);
  const dragged = useRef<boolean>(false);

  const { loader, resources } = useLoader(cardLoader) ?? {};

  const texture = useTexture((renderer) => {
    const rectangle = new PIXI.Graphics()
      .beginFill(0xffffff)
      .drawRect(25, 25, 974, 974)
      .endFill();
    rectangle.filters = [new PIXI.filters.BlurFilter(25)];
    const bounds = new PIXI.Rectangle(0, 0, 1024, 1024);
    return renderer.generateTexture(rectangle, PIXI.SCALE_MODES.NEAREST, 1, bounds);
  });

  if (!loader || !resources || !texture) return (
    <Container scale={scale}>
      <Rectangle
        x={0}
        y={0}
        width={512}
        height={730.5}
        opacity={0}
        borderRadius={16}
      />
    </Container>
  );

  const touchstart = (e: PIXI.InteractionEvent) => {
    const event = e.data.originalEvent as TouchEvent;
    if (event.touches?.length !== 1) return;

    e.stopPropagation();

    const pos = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    }
    startPos.current = pos;
  };

  const touchmove = (e: PIXI.InteractionEvent) => {
    const event = e.data.originalEvent as TouchEvent;
    if (event.touches?.length !== 1) return;
    if (cardRef.current === null) return;
    if (startPos.current === null) return;

    e.stopPropagation();

    if (!dragged.current) {
      onDragStart();
      dragged.current = true;
    }

    cardRef.current.x = event.touches[0].clientX - startPos.current.x;
    cardRef.current.y = event.touches[0].clientY - startPos.current.y;
    onDrag({ x: cardRef.current.x, y: cardRef.current.y });
  };

  const mousedown = (e: PIXI.InteractionEvent) => {
    const event = e.data.originalEvent as MouseEvent;
    if (event.buttons !== 1) return;

    e.stopPropagation();

    const pos = {
      x: event.clientX,
      y: event.clientY,
    }
    startPos.current = pos;
  };

  const mousemove = (e: PIXI.InteractionEvent) => {
    const event = e.data.originalEvent as MouseEvent;
    if (event.buttons !== 1) return;
    if (cardRef.current === null) return;
    if (startPos.current === null) return;

    e.stopPropagation();

    if (!dragged.current) {
      onDragStart();
      dragged.current = true;
    }

    cardRef.current.x += event.movementX;
    cardRef.current.y += event.movementY;
    onDrag({ x: cardRef.current.x, y: cardRef.current.y });
  };

  const dragend = (e: PIXI.InteractionEvent) => {
    if (cardRef.current === null) return;

    e.stopPropagation();

    if (!dragged.current) {
      console.log('click');
      if (clickable) onClick();
    } else {
      if (draggable) onDragEnd(cardRef.current);
    }

    dragged.current = false;
    startPos.current = null; 
  };

  return (
    <Container
      ref={cardRef}
      scale={scale}
      cursor={(draggable || clickable) ? 'pointer' : undefined}
      interactive={draggable || clickable}
      touchstart={draggable ? touchstart : undefined}
      touchmove={draggable ? touchmove : undefined}
      touchend={(draggable || clickable) ? dragend : undefined}
      mousedown={draggable ? mousedown : undefined}
      mousemove={draggable ? mousemove : undefined}
      mouseup={(draggable || clickable) ? dragend : undefined}
    >
      <Sprite
        texture={resources.cardBackground!.texture}
        scale={0.5}
        anchor={0.5}
      />
      <Container y={100}>
        { resources[getTypeKey(type)] !== undefined ?
          <Sprite
            texture={resources[getTypeKey(type)]!.texture}
            scale={0.4}
            anchor={0.5}
            mask={maskRef.current}
          />
        : null }
        <Sprite
          ref={maskRef}
          scale={0.4}
          anchor={0.5}
          texture={texture}
        />
      </Container>
      <Text
        y={-210}
        text={`${type}`}
        anchor={0.5}
        style={{
          fontSize: 132,
          fontFamily: ['Perdido', 'Times'],
        }}
      />
      <Container x={-190} y={300}>
        <Sprite
          texture={resources[getSuitKey(suit)]!.texture}
          scale={0.6}
          anchor={[0, 0.5]}
        />
        <Text
          text={cardNumber[number]}
          anchor={[1, 0.5]}
          style={{
            fontSize: 52,
            fontFamily: 'Times',
          }}
        />
      </Container>
    </Container>
  );
};

export default Card;
