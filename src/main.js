import { createApp } from 'vue';
import App from './App.vue';
import router from "@/router";
import cors from 'cors';
import DotLoader from 'vue-spinner/src/PulseLoader.vue';
import {createPinia} from "pinia";
//import VueCookies from 'vue-cookies'

import firebase from "firebase/compat/app";

// Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyBsRgoDuNpx8iP8g50Ix_8EP84007bioU4",
    authDomain: "signature-generator-e12e1.firebaseapp.com",
    projectId: "signature-generator-e12e1",
    storageBucket: "signature-generator-e12e1.firebasestorage.app",
    messagingSenderId: "779310023193",
    appId: "1:779310023193:web:3b1cf064b6df0ae529a088"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Pinia for global storage (isLogin variable)
const pinia = createPinia()

// Launcht die Spring Boot App
createApp(App)
    .use(router)
    .use(cors)
    .use(pinia)
    //.use(require('vue-cookies'))
    //.use(VueCookies, { expires: '15d' })
    .component('dot-loader', DotLoader)
    .mount('#app',)
