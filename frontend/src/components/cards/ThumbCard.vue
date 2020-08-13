<template>
  <div class='thumbcard'>
    <div class='card'>
      <Card
        :suit='suit'
        :number='number'
        :kind='kind'
        :type='type'
        :playable='playable'
        :width='50'
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
export default class ThumbCard extends Vue {
  @Prop()
  suit?: CardSuit;

  @Prop()
  number?: number;

  @Prop()
  kind?: CardKind;

  @Prop()
  type?: CardType;

  @Prop({ default: false })
  playable?: boolean;

  // @Prop() private msg: string;
}
</script>

<style scoped>
.card {
  width: 50px; height: 72px;
  background: rgb(200, 200, 200);
  margin: 0px 5px;
  display: flex; align-items: flex-start;
}
</style>
