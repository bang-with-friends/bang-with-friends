<template>
  <div class='mediumcard'>
    <div class='card'>
      {{ title }}
      <Card
        :suit='suit'
        :number='number'
        :kind='kind'
        :type='type'
        :playable='playable'
        :width='100'
      />
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { CardKind, CardSuit, CardType } from 'common/lib/Cards';
import Card from './Card.vue';

@Component({
  components: {
    Card,
  },
})
export default class MediumCard extends Vue {
  @Prop()
  title = '';

  @Prop()
  suit?: CardSuit;

  @Prop()
  kind?: CardKind;

  @Prop()
  number?: number;

  @Prop()
  type?: CardType;

  @Prop({ default: false })
  playable?: boolean;
}
</script>

<style scoped>
.card {
  width: 100px; height: 144px;
  background: rgb(200, 200, 200);
  margin: 0px 5px;
  display: flex; align-items: flex-start;
}
</style>
