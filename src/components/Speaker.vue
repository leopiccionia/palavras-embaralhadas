<script setup>
  import { useSpeechSynthesis } from '@vueuse/core'

  const { word } = defineProps({
    word: String,
  })

  const { isPlaying, isSupported, speak } = $(useSpeechSynthesis(word, {
    lang: 'pt-BR',
  }))
</script>

<template>
  <button aria-label="Tocar som" class="speaker" :disabled="isPlaying" @click="speak(word)" v-if="isSupported">
    <Icon icon="fluent:speaker-2-28-filled"/>
  </button>
</template>

<style lang="scss">
  .speaker {
    align-items: center;
    background-color: darkred;
    border-radius: 50%;
    color: white;
    display: flex;
    font-size: 1.5rem;
    height: 2.5rem;
    justify-content: center;
    line-height: 1;
    margin: 0.5rem auto;
    width: 2.5rem;
  }
</style>
