<template>
  <div class='mediumcard'>
    <div class='card'>
      {{ title }}
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class MediumCard extends Vue {
  @Prop() title: string;
}
</script>

<style scoped>
.card {
  width: 100px; height: 140px;
  background: rgb(200, 200, 200);
  margin: 0px 5px;
  display: flex; align-items: flex-start;
}
</style>
