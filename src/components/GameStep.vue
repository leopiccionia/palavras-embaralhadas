<script setup>
  import { useEventListener } from '@vueuse/core'

  import Speaker from './Speaker.vue'
  import { shuffle } from '../utils/shuffle'

  const { last, word } = defineProps({
    last: Boolean,
    word: String,
  })
  const emit = defineEmits(['result'])

  const letters = shuffle(word.split(''))

  const clicks = $ref([])
  let status = $ref('')
  let text = $ref('')

  function addLetter (letter, index) {
    text += letter
    clicks.push(index)
    if (text.length === word.length) {
      processEnd()
    }
  }

  function cleanLetter () {
    text = text.slice(0, -1)
    clicks.pop()
  }

  function processEnd () {
    if (text === word) {
      status = 'success'
    } else {
      status = 'failure'
    }
  }

  useEventListener('keydown', (event) => {
    const key = event.key.toLocaleLowerCase()
    if (key.length === 1 && key >= 'a' && key <= 'z') {
      const position = letters.findIndex((letter, index) => letter === key && !clicks.includes(index))
      if (position !== -1) {
        addLetter(key, position)
      }
    } else if (event.code === 'Backspace') {
      if (text.length > 0 && !status) {
        cleanLetter()
      }
    }
  })
</script>

<template>
  <div class="game-step">
    <div class="game-step__instructions">
      Desembaralhe as letras para formar palavras
    </div>
    <div class="game-step__image">
      <img :alt="word" :src="`/words/${word}.jpg`" />
      <Speaker :key="word" :word="word"/>
    </div>
    <div class="game-step__form">
      <div class="game-step__letters">
        <button v-for="(letter, index) of letters" class="game-step__letter" :disabled="clicks.includes(index)" :key="index" type="button" @click="addLetter(letter, index)">
          {{ letter }}
        </button>
      </div>
      <button class="game-step__erase" key="clear" type="button" @click="cleanLetter" v-if="text.length > 0 && !status">
        <Icon icon="iconoir:erase"/>
        Apagar
      </button>
    </div>
    <div class="game-step__text">
      <div class="game-step__word">{{ text }}</div>
      <div class="game-step__status" :class="status" v-if="status">
        <p v-if="status === 'success'">
          <Icon icon="ep:success-filled"/>
          Parabéns!
        </p>
        <p v-if="status === 'failure'">
          <Icon icon="ep:warning-filled"/>
          A palavra era <strong>{{ word }}</strong>
        </p>
        <button class="game-step__next-word" type="button" @click="$emit('result', status)">
          {{ last ? 'Terminar' : 'Próxima palavra' }}
          <Icon icon="ep:arrow-right-bold"/>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .game-step {
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: 300px 17rem;
    margin: auto;
    width: fit-content;

    @media screen and (max-width: 35rem) {
      grid-template-columns: 1fr;

      & > * {
        grid-column: 1;
      }
    }

    &__erase {
      background-color: darkorange;
      color: white;
      font-size: 1rem;
      margin-top: 1rem;
      width: 100%;
      padding: 10px;
    }

    &__image {
      max-width: calc(100vw - 2rem);
    }

    &__instructions {
      grid-column-end: span 2;
    }

    &__letter {
      background-color: gold;
      color: darkred;
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
      grid-gap: 0.5rem;
      grid-template-columns: repeat(5, 3rem);
      justify-content: center;
    }

    &__next-word {
      background-color: gold;
      display: block;
      font-size: 1rem;
      margin: 1.5rem auto;
      max-width: 15rem;
      padding: 10px;
      width: 100%;
    }

    &__status {
      display: block;
      margin-top: 0.5rem;

      p {
        user-select: none;
      }

      &.failure {
        color: darkorange;

        strong {
          color: green;
          font-size: 1.25rem;
          font-weight: inherit;
        }
      }

      &.success {
        color: green;
      }
    }

    &__text {
      grid-column-end: span 2;
    }

    &__word {
      color: mediumblue;
      font-size: 2.5rem;
      margin-top: 1rem;
      user-select: none;
    }
  }
</style>