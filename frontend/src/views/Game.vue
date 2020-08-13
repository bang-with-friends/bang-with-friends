<template>
  <div class='game'>
    <!--<img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>-->
    <div class='container'>
      <div class='table'>
        <template v-for='[index, { cards, playerId }] in this.cards.entries()'>
          <div
            v-if='index !== 0'
            :class='[styles.thumbContainer, styles.location[locations[index - 1]]]'
            :key='playerId'
          >
            <ThumbCard
              v-for='card in cards'
              :key='cardKey(card)'
              :suit='card.suit'
              :number='card.number'
              :kind='card.kind'
              :type='card.type'
              :playable='card.playable'
            />
          </div>
          <div
            v-else
            :class='styles.mediumContainer'
            :key='playerId'
            style='top: 68%; align-items: center; justify-content: center'
          >
            <MediumCard
              v-for='card in cards'
              :key='cardKey(card)'
              :suit='card.suit'
              :number='card.number'
              :kind='card.kind'
              :type='card.type'
              :playable='card.playable'
              title='Player Card'
            />
          </div>
        </template>
        <MediumCard style='position: absolute; top: 45%; left: 49%;
          transform: translate(-100%, -50%);'
          title='Stack'
        />
        <MediumCard
          style='position: absolute; top: 45%; left: 51%; transform: translate(0%, -50%);'
          title='Discard'
          :suit='suit'
          :number='number'
          :kind='kind'
          :type='type'
          :playable='false'
        />
      </div>
      <div class='player-hand-container'>
        <MediumCard v-for='n in 5' :key='n' title='Hand Card' />
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { css } from 'emotion';
import { CardKind, CardSuit, CardType } from 'common/lib/Cards';

import ThumbCard from '@/components/cards/ThumbCard.vue';
import MediumCard from '@/components/cards/MediumCard.vue';
// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

const LOCATIONS = [
  [1, 4, 7],
  [0, 2, 4, 7],
  [1, 3, 5, 6, 8],
  [0, 2, 3, 5, 6, 8],
];

// eslint-disable-next-line
const cardKey = (card: any) => {
  const {
    suit,
    number,
    kind,
    type,
    playable,
  } = card;

  return [suit, number, kind, type, playable].join('-');
};

@Component({
  components: {
    ThumbCard, MediumCard,
  },
})

export default class Game extends Vue {
  // @Prop() private num: number;
  numOfPlayers = 4;

  suit = CardSuit.SPADES;
  number = 9;
  kind = CardKind.STATUS;
  type = CardType.JAIL;
  playable = false;

  get locations() {
    return LOCATIONS[this.cards.length - 4];
  }

  cardKey = cardKey;

  cards = [
    {
      playerId: 'abcd1',
      cards: [
        {
          suit: CardSuit.SPADES,
          number: 9,
          kind: CardKind.STATUS,
          type: CardType.JAIL,
          playable: false,
        },
        {
          suit: CardSuit.SPADES,
          number: 9,
          kind: CardKind.STATUS,
          type: CardType.JAIL,
          playable: false,
        },
        {
          suit: CardSuit.SPADES,
          number: 9,
          kind: CardKind.STATUS,
          type: CardType.JAIL,
          playable: false,
        },
      ],
    },
    {
      playerId: 'abcd2',
      cards: [
        {
          suit: CardSuit.SPADES,
          number: 9,
          kind: CardKind.STATUS,
          type: CardType.JAIL,
          playable: false,
        },
        {
          suit: CardSuit.SPADES,
          number: 9,
          kind: CardKind.STATUS,
          type: CardType.JAIL,
          playable: false,
        },
        {
          suit: CardSuit.SPADES,
          number: 9,
          kind: CardKind.STATUS,
          type: CardType.JAIL,
          playable: false,
        },
      ],
    },
    {
      playerId: 'abcd3',
      cards: [
        {
          suit: CardSuit.SPADES,
          number: 9,
          kind: CardKind.STATUS,
          type: CardType.JAIL,
          playable: false,
        },
        {
          suit: CardSuit.SPADES,
          number: 9,
          kind: CardKind.STATUS,
          type: CardType.JAIL,
          playable: false,
        },
        {
          suit: CardSuit.SPADES,
          number: 9,
          kind: CardKind.STATUS,
          type: CardType.JAIL,
          playable: false,
        },
      ],
    },
    {
      playerId: 'abcd4',
      cards: [
        {
          suit: CardSuit.SPADES,
          number: 9,
          kind: CardKind.STATUS,
          type: CardType.JAIL,
          playable: false,
        },
        {
          suit: CardSuit.SPADES,
          number: 9,
          kind: CardKind.STATUS,
          type: CardType.JAIL,
          playable: false,
        },
        {
          suit: CardSuit.SPADES,
          number: 9,
          kind: CardKind.STATUS,
          type: CardType.JAIL,
          playable: false,
        },
      ],
    },
    {
      playerId: 'abcd5',
      cards: [
        {
          suit: CardSuit.SPADES,
          number: 9,
          kind: CardKind.STATUS,
          type: CardType.JAIL,
          playable: false,
        },
        {
          suit: CardSuit.SPADES,
          number: 9,
          kind: CardKind.STATUS,
          type: CardType.JAIL,
          playable: false,
        },
        {
          suit: CardSuit.SPADES,
          number: 9,
          kind: CardKind.STATUS,
          type: CardType.JAIL,
          playable: false,
        },
      ],
    },
    {
      playerId: 'abcd6',
      cards: [
        {
          suit: CardSuit.SPADES,
          number: 9,
          kind: CardKind.STATUS,
          type: CardType.JAIL,
          playable: false,
        },
        {
          suit: CardSuit.SPADES,
          number: 9,
          kind: CardKind.STATUS,
          type: CardType.JAIL,
          playable: false,
        },
        {
          suit: CardSuit.SPADES,
          number: 9,
          kind: CardKind.STATUS,
          type: CardType.JAIL,
          playable: false,
        },
      ],
    },
    {
      playerId: 'abcd7',
      cards: [
        {
          suit: CardSuit.SPADES,
          number: 9,
          kind: CardKind.STATUS,
          type: CardType.JAIL,
          playable: false,
        },
        {
          suit: CardSuit.SPADES,
          number: 9,
          kind: CardKind.STATUS,
          type: CardType.JAIL,
          playable: false,
        },
        {
          suit: CardSuit.SPADES,
          number: 9,
          kind: CardKind.STATUS,
          type: CardType.JAIL,
          playable: false,
        },
      ],
    },
  ];

  styles = {
    thumbContainer: css({
      position: 'absolute',
      width: '29%',
      height: '72px',
      background: 'rgb(100, 200, 200)',
      display: 'flex',
    }),
    mediumContainer: css({
      position: 'absolute',
      width: '60%',
      height: '144px',
      background: 'rgb(100, 200, 200)',
      display: 'flex',
    }),
    location: [
      css({ // 1
        top: '2%',
        left: '49%',
        transform: 'translate(-100%, 0%)',
        alignItems: 'center',
        justifyContent: 'center',
      }),
      css({ // 2
      }),
      css({ // 3
        top: '2%',
        left: '51%',
        transform: 'translate(0%, 0%)',
        alignItems: 'center',
        justifyContent: 'center',
      }),
      css({ // 4
        top: '25%',
        left: '3%',
      }),
      css({ // 5
      }),
      css({ // 6
        top: '48%',
        left: '3%',
      }),
      css({ // 7
        top: '25%',
        left: '97%',
        transform: 'translate(-100%, 0%)',
        justifyContent: 'flex-end',
      }),
      css({ // 8
      }),
      css({ // 9
        top: '48%',
        left: '97%',
        transform: 'translate(-100%, 0%)',
        justifyContent: 'flex-end',
      }),
      css({ // 10
      }),
    ],
  }
}
</script>

<style scoped>
.container {
  position: fixed; width: 100%; height: 100%;
  display: flex; justify-content: center; align-items: center;
}
.table {
  position: absolute; width: 80%; height: 65%;
  background: rgb(150, 150, 150);
  border-radius: 200px;
  top: 10%;
  display: flex; justify-content: center; align-items: center;
}
/*
.thumb-container {
  position: absolute; width: 29%; height: 70px;
  background: rgb(100, 200, 200);
  display: flex;
}
.medium-container {
  position: absolute; width: 60%; height: 140px;
  background: rgb(100, 200, 200);
  display: flex;
}
*/
.player-hand-container {
  position: absolute; width: 80%; height: 144px;
  background: rgb(100, 200, 200);
  top: 78%;
  display: flex; justify-content: center; align-items: center;
}
</style>
