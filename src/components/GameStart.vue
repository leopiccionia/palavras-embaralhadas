<script setup>
  const emit = defineEmits(['start'])
</script>

<template>
  <div class="game-start">
    <h1>Boas Vindas</h1>
    <p>Você terá um minuto para formar o maior número de palavras que conseguir</p>
    <button class="game-start__button" type="button" @click="$emit('start')">
      <Icon icon="iconoir:play-outline"/>
      Começar
    </button>
  </div>
</template>

<style lang="scss">
  .game-start {
    margin: auto;
    max-width: 30rem;
    padding: 1rem;

    h1 {
      color: mediumblue;
      font-size: 2.5rem;
    }

    p {
      font-size: 1rem;
    }

    &__button {
      background-color: crimson;
      color: white;
      font-size: 1.25rem;
      margin-top: 1.5rem;
      padding: 10px;
    }
  }
</style>
