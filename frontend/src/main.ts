import './assets/main.css'

import { registerPlugins } from './plugins/vuetify'
import { createApp } from 'vue'
import App from './App.vue'
import "./plugins/vuetify";

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
