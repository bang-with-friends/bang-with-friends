<template>
  <div id='app' :class='styles.app'>
    <router-view />
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';
import { css } from 'emotion';

@Component
export default class App extends Vue {
  styles = {
    app: css({
      fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
      textAlign: 'center',
    }),
  };
}
</script>
