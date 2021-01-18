import { useRef } from 'react';
import { Container, Sprite, Text, useApp } from '@inlet/react-pixi/legacy';
import * as PIXI from 'pixi.js-legacy';

import { CardSuit, CardType } from 'common/lib/Cards';
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
import useLoader from '../common/useLoader';
import useStatefulRef from '../common/useStatefulRef';

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
  onDragStart?: (position: { x: number; y: number }) => void;
  onDrag?: (offset: { x: number; y: number }) => void;
  onDragEnd?: () => void;
  suit: CardSuit;
  type: CardType;
  number: number;
}

const Card = (props: ICardProps) => {
  const {
    draggable = false,
    onDragStart = () => {},
    onDrag = () => {},
    onDragEnd = () => {},
    suit,
    type,
    number,
  } = props;

  const app = useApp();
  const cardRef = useStatefulRef<PIXI.Container>(null);
  const maskRef = useStatefulRef<PIXI.Sprite>(null);
  const startPos = useRef<{ x: number, y: number} | null>(null);

  const { loader, resources } = useLoader(cardLoader) ?? {};

  if (!loader || !resources) return null;

  const rectangle = new PIXI.Graphics()
    .beginFill(0xffffff)
    .drawRect(25, 25, 974, 974)
    .endFill();
  rectangle.filters = [new PIXI.filters.BlurFilter(25)];
  const bounds = new PIXI.Rectangle(0, 0, 1024, 1024);
  const texture = app.renderer.generateTexture(rectangle, PIXI.SCALE_MODES.NEAREST, 1, bounds);

  const touchstart = (e: PIXI.InteractionEvent) => {
    const event = e.data.originalEvent as TouchEvent;
    if (event.touches?.length !== 1) return;
    const pos = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    }
    startPos.current = pos;
    onDragStart(pos);
  };

  const touchmove = (e: PIXI.InteractionEvent) => {
    const event = e.data.originalEvent as TouchEvent;
    if (event.touches?.length !== 1) return;
    if (cardRef.current === null) return;
    if (startPos.current === null) return;

    cardRef.current.x = event.touches[0].clientX - startPos.current.x;
    cardRef.current.y = event.touches[0].clientY - startPos.current.y;
    onDrag({ x: cardRef.current.x, y: cardRef.current.y });
  };

  const mousedown = (e: PIXI.InteractionEvent) => {
    const event = e.data.originalEvent as MouseEvent;
    if (event.buttons !== 1) return;
    const pos = {
      x: event.clientX,
      y: event.clientY,
    }
    startPos.current = pos;
    onDragStart(pos);
  };

  const mousemove = (e: PIXI.InteractionEvent) => {
    const event = e.data.originalEvent as MouseEvent;
    if (event.buttons !== 1) return;
    if (cardRef.current === null) return;
    if (startPos.current === null) return;

    cardRef.current.x += event.movementX;
    cardRef.current.y += event.movementY;
    onDrag({ x: cardRef.current.x, y: cardRef.current.y });
  };

  const dragend = () => {
    startPos.current = null; 
    onDragEnd();
  };

  return (
    <Container
      ref={cardRef}
      scale={0.5}
      interactive={draggable}
      touchstart={draggable ? touchstart : undefined}
      touchmove={draggable ? touchmove : undefined}
      touchend={draggable ? dragend : undefined}
      mousedown={draggable ? mousedown : undefined}
      mousemove={draggable ? mousemove : undefined}
      mouseup={draggable ? dragend : undefined}
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
      <Container x={-215} y={315}>
        <Sprite
          texture={resources[getSuitKey(suit)]!.texture}
          scale={0.6}
          anchor={[0, 0.5]}
        />
        <Text
          x={5}
          text={`${number}`}
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
