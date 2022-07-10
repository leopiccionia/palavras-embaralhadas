<script setup>
  const { points, timer } = defineProps({
    points: Number,
    timer: Number,
  })
</script>

<template>
  <div class="game-score">
    <div class="game-score__container">
      <Icon icon="fa6-solid:clock"/>
      <span class="sr-only">Tempo:</span>
      <span>{{ 60 - timer }}</span>
    </div>
    <div class="game-score__container">
      <Icon icon="fa6-solid:star"/>
      <span class="sr-only">Pontos:</span>
      <span>{{ points }}</span>
    </div>
  </div>
</template>

<style lang="scss">
  @use '../variables.scss';

  .game-score {
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr 1fr;
    margin: auto;
    max-width: 35rem;
    padding: 0 1rem;
    user-select: none;

    &__container {
      background-color: variables.$red;
      border-radius: 5px;
      color: white;
      font-variant-numeric: tabular-nums;
      padding: 5px;

      span {
        display: inline-block;
        margin-left: 1ch;
      }
    }
  }
</style>
