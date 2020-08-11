<template>
  <div class='thumbcard'>
    <div class='card'>
      Thumb
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ThumbCard extends Vue {
  // @Prop() private msg: string;
}
</script>

<style scoped>
.card {
  width: 50px; height: 70px;
  background: rgb(200, 200, 200);
  margin: 0px 5px;
  display: flex; align-items: flex-start;
}
</style>
