import { createApp } from 'vue';
import App from './App.vue';
import router from "@/router";
import cors from 'cors';
import DotLoader from 'vue-spinner/src/PulseLoader.vue';

import firebase from "firebase/compat/app";

// Firebase Config
const firebaseConfig = {
    apiKey: process.env.VUE_APP_FB_API_KEY,
    authDomain: process.env.VUE_APP_FB_AUTH_DOMAIN,
    projectId: process.env.VUE_APP_FB_PROJECT_ID,
    storageBucket: process.env.VUE_APP_FB_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_FB_SENDER_ID,
    appId: process.env.VUE_APP_FB_APP_ID
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Launched die Spring Boot App inkl. Dot-loader für Ladesymbole
createApp(App)
    .use(router)
    .use(cors)
    .component('dot-loader', DotLoader)
    .mount('#app',)
