<template>
  <div class='home'>
    <h1>Bang! with Friends</h1>
    <div class='box'>
      <div v-show='show === ShowState.SELECT' class='buttons'>
        <div v-on:click.once='create' id='create'>Create new room</div>
        <div v-on:click.once='join' id='join'>Join a room</div>
      </div>
      <div v-show='show !== ShowState.SELECT' class='settings'>
        <p>Room code</p>
        <div v-if='show === ShowState.CREATE'>{{ code }}</div>
        <input v-else v-model='code' />
        <p>Name</p>
        <input v-model='name' />
        <div v-on:click.once='complete' id='complete'>
          {{ show === ShowState.CREATE ? 'Create' : 'Join' }}
        </div>
      </div>
    </div>
    <Card :suit='suit' :number='number' :type='type' :playable='false' />
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { CardSuit, CardType } from 'common/lib/Cards';

import Card from '@/components/Card.vue';

enum ShowState {
  SELECT = 'SELECT',
  CREATE = 'CREATE',
  JOIN = 'JOIN',
}

@Component({
  components: {
    Card,
  },
})
export default class Home extends Vue {
  show = ShowState.SELECT;
  ShowState = ShowState;

  code = 'ABCD';
  name = '';

  suit = CardSuit.HEARTS;
  number = 3;
  type = CardType.JAIL;

  create() {
    this.show = ShowState.CREATE;
  }

  join() {
    this.show = ShowState.JOIN;
  }

  complete() {
    // Socket request to start or join game
    console.log(this.show, this.code, this.name);
  }
}
</script>
