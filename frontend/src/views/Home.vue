<template>
  <div class='home'>
    <h1>Bang! with Friends</h1>
    <div class='box'>
      <div class='buttons'>
        <div v-on:click='create' id='create' class='button'>Create new room</div>
        <div v-on:click='join' id='join' class='button'>Join a room</div>
      </div>
    </div>
    <CreateJoinDialog
      v-bind:class='{ hidden: show === ShowState.SELECT }'
      v-bind:is-join='show === ShowState.JOIN'
      v-bind:can-edit='false'
      v-bind:hide='hide'
    />
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import CreateJoinDialog from '@/components/CreateJoinDialog.vue';

enum ShowState {
  SELECT = 'SELECT',
  CREATE = 'CREATE',
  JOIN = 'JOIN',
}

@Component({
  components: {
    CreateJoinDialog,
  },
})
export default class Home extends Vue {
  show = ShowState.SELECT;
  ShowState = ShowState;

  code = 'ABCD';
  name = '';

  create() {
    this.show = ShowState.CREATE;
  }

  join() {
    this.show = ShowState.JOIN;
  }

  hide() {
    this.show = ShowState.SELECT;
  }
}
</script>

<style>
  .box {
    display: flex;
    justify-content: center;
  }

  .buttons {
    display: flex;
    flex-direction: column;
  }

  .button {
    padding: 15px;
    cursor: pointer;
    margin: 4px;

    border-radius: 5px;
    box-shadow: 1px 1px 2px #888;
    color: white;
    background: #151b3a;

    transition: background 0.1s;
  }

  .button:hover {
    background: #2b3044;
  }
</style>
