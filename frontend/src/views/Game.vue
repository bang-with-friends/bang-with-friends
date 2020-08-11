<template>
  <div class='game'>
    <!--<img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>-->
    <div class='container'>
      <div class='table'>
        <div class='thumb-container'
          style='top: 2%; left: 49%; transform: translate(-100%, 0%);
            align-items: center; justify-content: center;'
        >
          <ThumbCard v-for='n in 4' :key='n' />
        </div>
        <div class='thumb-container'
          style='top: 2%; left: 51%; transform: translate(0%, 0%);
            align-items: center; justify-content: center;'
        >
          <ThumbCard />
        </div>
        <div class='thumb-container' style='top: 25%; left: 3%;'>
          <ThumbCard />
        </div>
        <div class='thumb-container' style='top: 48%; left: 3%;'>
          <ThumbCard />
        </div>
        <MediumCard style='position: absolute; top: 45%; left: 49%;
          transform: translate(-100%, -50%);'
          title='Stack'
        />
        <MediumCard style='position: absolute; top: 45%; left: 51%;
          transform: translate(0%, -50%);'
          title='Discard'
        />
        <div class='thumb-container' style='top: 25%; left: 97%;
          transform: translate(-100%, 0%); justify-content: flex-end;
        '>
          <ThumbCard v-for='n in 3' :key='n' />
        </div>
        <div class='thumb-container' style='top: 48%; left: 97%;
          transform: translate(-100%, 0%); justify-content: flex-end;
        '>
          <ThumbCard />
        </div>
        <div class='medium-container'
          style='top: 68%; align-items: center; justify-content: center'
        >
          <MediumCard v-for='n in 4' :key='n' title='Player Card' />
        </div>
      </div>
      <div class='player-hand-container'>
        <MediumCard v-for='n in 5' :key='n' title='Hand Card' />
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import ThumbCard from '@/components/cards/ThumbCard.vue';
import MediumCard from '@/components/cards/MediumCard.vue';
// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component({
  components: {
    ThumbCard, MediumCard,
  },
})

export default class Game extends Vue {}
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
.player-hand-container {
  position: absolute; width: 80%; height: 140px;
  background: rgb(100, 200, 200);
  top: 78%;
  display: flex; justify-content: center; align-items: center;
}
</style>
