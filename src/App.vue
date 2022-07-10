<script setup>
  import Game from './components/Game.vue'
</script>

<template>
  <Game/>
</template>

<style lang="scss">
  @use './variables.scss';

  @font-face {
    font-display: swap;
    font-family: 'Comfortaa';
    src: url('/fonts/Comfortaa-SemiBold.ttf');
  }

  :root {
    background-color: variables.$white;
    color: variables.$black;
    font-family: 'Comfortaa', sans-serif;
  }

  html, body {
    margin: 0;
  }

  html {
    font-size: 125%;
  }

  button {
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-family: inherit;
  }

  svg.iconify {
    display: inline-block;
    vertical-align: text-top;
  }

  .sr-only {
    border-width: 0;
    clip: rect(0, 0, 0, 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }
</style>
