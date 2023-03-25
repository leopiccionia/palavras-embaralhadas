<script setup>
  import { useEventListener } from '@vueuse/core'
  import { computed, ref } from 'vue'

  import DeleteIcon from '~icons/fa6-solid/delete-left'

  import Speaker from './Speaker.vue'
  import { shuffle } from '../utils/shuffle'

  const { word } = defineProps({
    word: String,
  })
  const emit = defineEmits(['success'])

  const letters = shuffle(word.split(''))

  const clicks = ref([])
  const text = ref('')

  const canErase = computed(() => text.value.length > 0 && text.value !== word)

  function addLetter (letter, index) {
    text.value += letter
    clicks.value.push(index)
    if (text.value === word) {
      setTimeout(() => emit('success'), 250)
    }
  }

  function cleanLetter () {
    text.value = text.value.slice(0, -1)
    clicks.value.pop()
  }

  /* Handle printable characters -- including diacritics */
  useEventListener('keypress', (event) => {
    const key = event.key.toLocaleLowerCase()
    const position = letters.findIndex((letter, index) => letter === key && !clicks.value.includes(index))
    if (position !== -1) {
      addLetter(key, position)
    }
  })

  /* Handle non-printable characters */
  useEventListener('keydown', (event) => {
    if (event.code === 'Backspace' && canErase.value) {
      cleanLetter()
    }
  })
</script>

<template>
  <div class="game-step">
    <div class="game-step__instructions">
      Desembaralhe as letras para formar palavras
    </div>
    <div class="game-step__image">
      <img :alt="word" height="300" :src="`./words/${word}.jpg`" width="300"/>
      <Speaker :key="word" :word="word"/>
    </div>
    <div class="game-step__word mobile">{{ text }}</div>
    <div class="game-step__form">
      <div class="game-step__letters">
        <button v-for="(letter, index) of letters" class="game-step__letter" :disabled="clicks.includes(index)" :key="index" type="button" @click="addLetter(letter, index)">
          {{ letter }}
        </button>
      </div>
      <button class="game-step__erase" key="clear" type="button" @click="cleanLetter" v-if="canErase">
        <DeleteIcon/>
        Apagar
      </button>
    </div>
    <div class="game-step__text">
      <div class="game-step__word desktop">{{ text }}</div>
    </div>
  </div>
</template>

<style lang="scss">
  @use '../variables.scss';

  .game-step {
    display: grid;
    gap: 1rem;
    grid-template-columns: 300px 17rem;
    margin: auto;
    padding: 1rem;
    width: fit-content;

    @include variables.mobile {
      gap: 0.75rem 0;
      grid-template-columns: 1fr;

      & > * {
        grid-column: 1;
      }
    }

    &__erase {
      background-color: variables.$orange;
      color: white;
      font-size: 1rem;
      margin-top: 1rem;
      padding: 10px;
      width: 100%;
    }

    &__image {
      margin: auto;
      max-width: calc(100vw - 2rem);
      position: relative;
      width: 300px;

      img {
        border-radius: 5px;
      }
    }

    &__instructions {
      grid-column-end: span 2;
    }

    &__letter {
      background-color: variables.$yellow;
      color: variables.$red;
      font-size: 2rem;
      height: 3rem;
      width: 3rem;

      &:disabled {
        cursor: default;
        opacity: 0.1;
      }
    }

    &__letters {
      display: grid;
      gap: 0.5rem;
      grid-template-columns: repeat(5, 3rem);
      justify-content: center;
    }

    &__text {
      grid-column-end: span 2;

      @include variables.mobile {
        display: none;
      }
    }

    &__word {
      color: variables.$blue;
      font-size: 2.5rem;
      height: 1em;
      user-select: none;

      &.mobile {
        display: none;

        @include variables.mobile {
          display: block;
        }
      }
    }
  }
</style>
