<template>
  <div>
    <h1>Features</h1>
    <router-link to="/">Go home</router-link>
    <h2>Vuex</h2>
    <div>click the below box. total clicked count: {{ $store.getters.clickCountTotal }} <button @click="resetCount">Reset</button></div>
    <div id="click-box" @click.left="$store.commit(increaseLeft)" @click.right="$store.commit(increaseRight)">
      <div>Left: {{ $store.state.clickCount.left }}</div>
      <div>Right: {{ $store.state.clickCount.right }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  INCREASE_COUNT_LEFT,
  INCREASE_COUNT_RIGHT,
  RESET_COUNT_LEFT,
  RESET_COUNT_RIGHT,
} from '../store/mutation-types';

export default {
  data() {
    return {
      increaseLeft: INCREASE_COUNT_LEFT,
      increaseRight: INCREASE_COUNT_RIGHT,
    };
  },
  methods: {
    resetCount() {
      this.$store.commit(RESET_COUNT_LEFT);
      this.$store.commit(RESET_COUNT_RIGHT);
    },
  },
};
</script>

<style lang="scss" scoped>
#click-box {
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex: 1 0 auto;
  user-select: none;

  > div {
    background-color: #999;
    padding: 3rem;
    width: 100%;

    &:nth-child(1) { background-color: #999; }
    &:nth-child(2) { background-color: #bbb; }
  }
}
</style>
