<template>
  <div id='app' :class='styles.app'>
    <router-view />
  </div>
</template>

<script lang='ts'>
import { Vue } from 'vue-property-decorator';
import { css } from 'emotion';

export default class App extends Vue {
  styles = {
    app: css({
      fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
      webkitFontSmoothing: 'antialiased',
      mozOsxFontSmoothing: 'grayscale',
      textAlign: 'center',
      color: '#2c3e50',
      marginTop: 60,
    }),
  };
}
</script>
