<script setup>
  import Game from './components/Game.vue'
</script>

<template>
  <Game/>
</template>

<style lang="scss">
  @font-face {
    font-display: swap;
    font-family: 'Comfortaa';
    src: url('/fonts/Comfortaa-SemiBold.ttf');
  }

  :root {
    background-color: #F7F7F7;
    color: #222;
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
</style>
