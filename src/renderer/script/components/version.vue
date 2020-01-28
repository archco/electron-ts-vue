<template>
  <div class="container">
    <div class="content">
      <span>Electron: {{ versions.electron }}</span>
      <span>Node: {{ versions.node }}</span>
      <span>Chromium: {{ versions.chrome }}</span>
      <span>V8: {{ versions.v8 }}</span>
    </div>
  </div>
</template>

<script lang="ts">
declare global {
  interface Window {
    process: any;
  }
}

export default {
  data() {
    return {
      versions: window.process.versions,
    };
  }
};
</script>

<style lang="scss">
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.content {
  display: flex;
  flex-direction: column;
  font-size: 1.2em;
  line-height: 1.5;
}
</style>
