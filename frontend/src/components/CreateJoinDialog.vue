<template>
  <div class='popup-wrapper'>
    <Keypress key-event='keydown' :key-code='27' @success='hide' />
    <div class='popup-overlay' v-on:click='hide' />
    <div class='popup'>
      <p>Room code</p>
      <div class='code' v-if='!isJoin || !canEdit'>{{ code }}</div>
      <input v-on:keydown.enter='complete' v-else v-model='code' />
      <p>Name</p>
      <input v-on:keydown.enter='complete' v-model='name' />
      <div v-on:click='complete' id='complete' class='button'>
        {{ isJoin ? 'Join' : 'Create' }}
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  components: {
    Keypress: () => import('vue-keypress'),
  },
})
export default class CreateJoinDialog extends Vue {
  @Prop()
  isJoin = true;

  @Prop()
  canEdit = false;

  @Prop()
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  hide = () => {};

  code = 'ABCD';
  name = '';

  complete() {
    // Socket request to start or join game
    console.log(this.isJoin, this.code, this.name);
    this.$router.push({ name: 'Game', params: { id: this.code } });
  }
}
</script>

<style>
  body {
    overflow: hidden;
  }

  .popup-wrapper.hidden {
    opacity: 0;
    visibility: hidden;
  }

  .popup-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;

    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.2s;
    opacity: 1;
    z-index: 10;
  }

  .popup-overlay {
    background: #000;
    opacity: 0.3;

    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }

  .popup {
    text-align: left;
    display: flex;
    flex-direction: column;
    z-index: 15;

    border-radius: 5px;
    box-shadow: 5px 5px 7px #888;
    background: white;
    padding: 30px 50px;
  }

  .code {
    color: black;
    text-align: center;
    font-weight: bold;
    font-size: 20px;
  }

  .popup .button {
    margin: 30px auto 0 auto;
  }
</style>
