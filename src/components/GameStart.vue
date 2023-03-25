<script setup>
  import PlayIcon from '~icons/fa6-solid/circle-play'

  const emit = defineEmits(['start'])
</script>

<template>
  <div class="game-start">
    <h1>Boas Vindas</h1>
    <p>Você terá um minuto para formar o maior número de palavras que conseguir</p>
    <button class="game-start__button" type="button" @click="$emit('start')">
      <PlayIcon/>
      Começar
    </button>
    <p class="game-start__credits">
      Site originalmente desenvolvido por Leonardo Piccioni de Almeida.
      <a href="https://github.com/leopiccionia/palavras-embaralhadas" target="_blank">Colabore</a>.
    </p>
  </div>
</template>

<style lang="scss">
  @use '../variables.scss';

  .game-start {
    margin: auto;
    max-width: 30rem;
    padding: 1rem;

    h1 {
      color: variables.$blue;
      font-size: 2.5rem;
    }

    p {
      font-size: 1rem;
    }

    &__button {
      background-color: variables.$red;
      color: white;
      font-size: 1.25rem;
      margin-top: 1.5rem;
      padding: 10px;
    }

    &__credits {
      color: variables.$gray;
      font-size: 0.875rem !important;
      margin-top: 2.5rem;

      a {
        color: variables.$blue;
      }
    }
  }
</style>
