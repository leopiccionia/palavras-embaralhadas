<script setup>
  import GameOver from './GameOver.vue'
  import GameStep from './GameStep.vue'
  import { shuffle } from '../utils/shuffle'
  import { words } from '../words.json'

  function shuffleWords () {
    return shuffle(words).slice(0, 10)
  }

  let shuffledWords = shuffleWords()

  let points = $ref(0)
  let step = $ref(0)
  const word = $computed(() => shuffledWords[step])

  function handleResult (status) {
    step += 1
    if (status === 'success') {
      points += 100
    }
  }

  function restartGame () {
    shuffledWords = shuffleWords()
    points = 0
    step = 0
  }
</script>

<template>
  <div class="game">
    <template v-if="step < shuffledWords.length">
      <GameStep :key="word" :last="step === shuffledWords.length - 1" :word="word" @result="handleResult"/>
      <div class="game__points" v-if="points > 0">
        Você fez <strong>{{ points }}</strong> pontos
      </div>
    </template>
    <GameOver :points="points" @reset="restartGame" v-else/>
  </div>
</template>

<style lang="scss">
  .game {
    margin: auto;
    text-align: center;

    * {
      text-transform: uppercase;
    }

    &__points {
      user-select: none;

      strong {
        color: green;
        font-size: 1.25rem;
        font-weight: inherit;
      }
    }
  }
</style>
