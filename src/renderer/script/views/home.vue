<template>
  <div>
    <h1>Hello, World!</h1>
    <router-link to="/features">Go to Features</router-link>
    <version></version>
  </div>
</template>

<script lang="ts">
import Version from '../components/version.vue';

export default {
  components: { Version }
};
</script>

<style lang="scss">
@import '../../style/_variables.scss';

h1 { color: $main-color; }
</style>
