import { createApp } from 'vue'
import App from './App.vue'
import vue3GoogleLogin from "vue3-google-login";
import router from "@/router";

createApp(App)
    .use(router)
    .use(vue3GoogleLogin, {
        clientId: '171953949131-p1nuuduug3qtvu70rlarkaot7252264p.apps.googleusercontent.com'
    })
    .mount('#app')
