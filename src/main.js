import { Icon } from '@iconify/vue'
import { createApp } from 'vue'

import App from './App.vue'

createApp(App)
  .component('Icon', Icon)
  .mount('#app')
