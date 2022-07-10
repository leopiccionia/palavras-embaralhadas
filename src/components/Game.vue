<script setup>
  import { useInterval, useTimeoutFn } from '@vueuse/core'

  import GameOver from './GameOver.vue'
  import GameScore from './GameScore.vue'
  import GameStart from './GameStart.vue'
  import GameStep from './GameStep.vue'
  import { shuffle } from '../utils/shuffle'
  import { words } from '../words.json'

  function shuffleWords () {
    return shuffle(words)
  }

  let shuffledWords = shuffleWords()

  let status = $ref('start')
  let step = $ref(0)
  const points = $computed(() => step * 100)
  const word = $computed(() => shuffledWords[step])

  let { counter: timer, resume: startInterval } = $(useInterval(1_000, { controls: true, immediate: false }))
  const { start: startTimeout } = useTimeoutFn(gameOver, 60_000, { controls: true, immediate: false })

  function gameOver () {
    status = 'end'
  }

  function nextStep () {
    step += 1
    if (step === shuffledWords.length) {
      gameOver()
    }
  }

  function restartGame () {
    shuffledWords = shuffleWords()
    step = 0
    timer = 0
    status = 'playing'
    startTimeout()
  }

  function startGame () {
    status = 'playing'
    startTimeout()
    startInterval()
  }
</script>

<template>
  <div class="game">
    <GameStart @start="startGame" v-if="status === 'start'"/>
    <GameOver :points="points" @reset="restartGame" v-else-if="status === 'end'"/>
    <template v-else-if="word">
      <GameStep :key="word" :word="word" @success="nextStep"/>
      <GameScore :points="points" :timer="timer"/>
    </template>
  </div>
</template>

<style lang="scss">
  .game {
    margin: auto;
    text-align: center;

    * {
      text-transform: uppercase;
    }
  }
</style>
