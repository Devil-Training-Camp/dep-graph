import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import Loading from './components/Loading.vue'

const app = createApp(App)

app.use(createPinia())
app.use(ElementPlus)
app.use(router)
app.component('Loading', Loading)
app.mount('#app')
