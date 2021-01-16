<template>
  <div :class='styles.cardWrapper'>
    <div :class='styles.cardBackground'>
      <img src='@/assets/card/background.png' />
    </div>
    <div :class='styles.cardContent'>
      <div :class='styles.cardType'>
        {{ type }}
      </div>
      <div :class='styles.cardDrawing'>
        <img :src='cardDrawingFile' />
      </div>
      <div :class='styles.cardInfo'>
        <div :class='styles.cardNumber'>
          {{ number }}
        </div>
        <div :class='styles.cardSuit'>
          <img :src='cardSuitFile' />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { CardSuit, CardType } from 'common/lib/Cards';
import { css } from 'emotion';
import { cardLoader, suitLoader } from '@/utils/imageLoader';

@Component
export default class Card extends Vue {
  @Prop()
  suit?: CardSuit;

  @Prop()
  number?: number;

  @Prop()
  type?: CardType;

  @Prop({ default: false })
  playable = false;

  get cardDrawingFile() {
    if (!this.type) {
      return '';
    }

    return cardLoader(`./${this.type.toLowerCase()}.png`);
  }

  get cardSuitFile() {
    if (!this.suit) {
      return '';
    }

    return suitLoader(`./${this.suit.toLowerCase()}.png`);
  }

  styles = {
    cardWrapper: css({
      position: 'relative',
      transform: 'scale(0.3)',
    }),
    cardBackground: css({
      position: 'absolute',
      top: 0,
      left: 0,
    }),
    cardContent: css({
      display: 'flex',
      flexDirection: 'column',
      position: 'absolute',
      top: 0,
      left: 0,
      margin: '70px 67px 0 57px',
      width: 900,
      height: 1320,
    }),
    cardDrawing: css({
      flex: 1,
      '& img': {
        width: 'calc(100% - 20px)',
        border: '10px solid black',
      },
    }),
    cardType: css({
      marginTop: 20,
      fontSize: 150,
      color: 'black',
      width: 900,
    }),
    cardInfo: css({
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    }),
    cardSuit: css({

    }),
    cardNumber: css({
      fontSize: 90,
      marginRight: 10,
      marginTop: 15,

      color: 'black',
    }),
  };
}
</script>
