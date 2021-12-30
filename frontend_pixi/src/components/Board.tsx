import { Fragment } from 'react';
// import { Container, Text } from '@inlet/react-pixi/legacy';
import { Container, Text } from '@inlet/react-pixi';

import { GameCard } from 'common/lib/Cards';

import Rectangle from '../common/Rectangle';
import useStageSize from '../common/useStageSize';
import Card from './Card';
import Hand from './Hand';

interface IBoardProps {
  discard: GameCard[];
  handCards: GameCard[];
  scale: number;
}

const Board = (props: IBoardProps) => {
  const {
    discard,
    handCards,
    scale,
  } = props;

  const { width, height } = useStageSize();

  const tablePaddingY = 75 * scale;
  const tablePaddingX = 200 * scale;
  const handScale = 0.25 * scale;
  const handCardWidth = 512 * handScale;
  const handCardHeight = 730.5 * handScale;
  const handMidY = handCardHeight / 2 + tablePaddingY / 4;
  const handTopY = handMidY + handCardHeight / 2;
  let tableHeight = height - handTopY - (tablePaddingY);
  let tableWidth = width - (tablePaddingX * 2);

  if (tableWidth > 2 * tableHeight) tableWidth = 2 * tableHeight;
  if (tableHeight > tableWidth) tableHeight = tableWidth;

  const numDiscardPad = Math.floor(discard.length / 10);

  return (
    <Fragment>
      { discard === undefined ? null : (
        <Container
          x={tablePaddingY / 2 + handCardWidth * 0.75 * 0.5}
          y={tablePaddingY / 2 + handCardHeight * 0.75 * 0.5}
        >
          {Array.from({ length: numDiscardPad }, (_v, i) => (
            <Container x={2 * i * scale} y={2 * i * scale}>
              <Card scale={handScale * 0.75} />
            </Container>
          ))}
          <Container x={2 * numDiscardPad * scale} y={2 * numDiscardPad * scale}>
            <Card card={discard[discard.length - 1]} scale={handScale * 0.75} />
          </Container>
          <Text
            anchor={[0.5, 1]}
            text='Discard'
            y={-handCardHeight * 0.75 * 0.5 - 2 * scale}
            resolution={2 * scale}
            style={{
              fontSize: 20,
              fill: 0xffffff,
            }}
          />
        </Container>
      )}
      <Rectangle
        x={(width - tableWidth) / 2}
        y={(height - tableHeight - handTopY) / 2}
        width={tableWidth}
        height={tableHeight}
        fill={0x3f4046}
        borderRadius={tableHeight / 2}
      />
      <Container x={width / 2} y={height - handMidY}>
        <Hand
          rearrangeable
          playable
          cards={handCards}
          scale={handScale}
        />
      </Container>
    </Fragment>
  );
};

export default Board;
