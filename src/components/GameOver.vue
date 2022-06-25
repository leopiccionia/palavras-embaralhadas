<script setup>
  const { points } = defineProps({
    points: Number,
  })
  const emit = defineEmits(['reset'])
</script>

<template>
  <div class="game-over">
    <h1>Fim</h1>
    <p>Você fez <strong>{{ points }}</strong> pontos!</p>
    <button class="game-over__reset" type="button" @click="$emit('reset')">
      <Icon icon="iconoir:restart"/>
      Reiniciar jogo
    </button>
  </div>
</template>

<style lang="scss">
  .game-over {
    margin: auto;
    max-width: 30rem;

    h1 {
      color: mediumblue;
      font-size: 2.5rem;
    }

    p {
      font-size: 1rem;

      strong {
        font-size: 1.25rem;
        color: green;
        font-weight: inherit;
      }
    }

    &__reset {
      background-color: darkorange;
      color: white;
      font-size: 1.25rem;
      margin-top: 1.5rem;
      padding: 10px;
    }
  }
</style>
