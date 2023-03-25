<script setup>
  import { useSpeechSynthesis } from '@vueuse/core'
  import { computed } from 'vue'

  const { word } = defineProps({
    word: String,
  })

  const { isPlaying, isSupported, speak } = useSpeechSynthesis(word, {
    lang: 'pt-BR',
  })
  const voices = computed(() => isSupported.value ? window.speechSynthesis.getVoices() : [])
  const canSpeak = computed(() => isSupported.value && voices.value.length > 0)
</script>

<template>
  <button aria-label="Tocar som" class="speaker" :disabled="isPlaying" @click="speak(word)" v-if="canSpeak">
    <Icon icon="fa6-solid:volume-low"/>
  </button>
</template>

<style lang="scss">
  @use '../variables.scss';

  .speaker {
    align-items: center;
    background-color: variables.$red;
    border-radius: 50%;
    bottom: 0.5rem;
    color: white;
    display: flex;
    font-size: 1.5rem;
    left: 0.5rem;
    height: 2.5rem;
    justify-content: center;
    line-height: 1;
    margin: 0.5rem auto;
    position: absolute;
    width: 2.5rem;
  }
</style>
