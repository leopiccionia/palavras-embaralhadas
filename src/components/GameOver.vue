<script setup>
  import { useEventListener } from '@vueuse/core'
  import { computed } from 'vue'

  const { points } = defineProps({
    points: Number,
  })
  const emit = defineEmits(['reset'])

  const words = computed(() => points / 100)

  useEventListener('keydown', (event) => {
    if (event.code === 'Enter') {
      emit('reset')
    }
  })
</script>

<template>
  <div class="game-over">
    <h1>Fim</h1>
    <p>Você acertou <strong>{{ words }}</strong> palavra{{ words === 1 ? '' : 's' }} e fez <strong>{{ points }}</strong> pontos!</p>
    <button class="game-over__reset" type="button" @click="$emit('reset')">
      <Icon icon="fa6-solid:arrow-rotate-right"/>
      Reiniciar jogo
    </button>
  </div>
</template>

<style lang="scss">
  @use '../variables.scss';

  .game-over {
    margin: auto;
    max-width: 30rem;
    padding: 1rem;

    h1 {
      color: variables.$blue;
      font-size: 2.5rem;
    }

    p {
      font-size: 1rem;

      strong {
        font-size: 1.25rem;
        color: variables.$green;
        font-weight: inherit;
      }
    }

    &__reset {
      background-color: variables.$orange;
      color: white;
      font-size: 1.25rem;
      margin-top: 1.5rem;
      padding: 10px;
    }
  }
</style>
