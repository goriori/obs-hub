import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import VClickOutside from '@/directives/vClickOutside'
import vRipple from '@/directives/vRipple'
import '@/assets/scss/main.scss'


const app = createApp(App)
  .directive('ripple', vRipple)
  .directive('outside', VClickOutside)
  .use(createPinia())
  .use(router)
  .mount('#app')
