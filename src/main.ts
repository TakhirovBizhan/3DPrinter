import { createApp } from 'vue'
import App from './App.vue'
import router from './config/routes'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/dark/css-vars.css'
import { createPinia } from 'pinia';



const app = createApp(App)

const pinia = createPinia();
app.use(pinia);

app.use(router)
app.use(ElementPlus, { size: 'small', zIndex: 500 })

app.mount('#app')
