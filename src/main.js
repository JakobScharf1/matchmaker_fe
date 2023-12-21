import { createApp } from 'vue';
import App from './App.vue';
import vue3GoogleLogin from "vue3-google-login";
import router from "@/router";
import cors from 'cors';

// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDTib2x4aE7llVddi_GDa72vGxYqHGHtQg",
    authDomain: "matchmaker-406610.firebaseapp.com",
    projectId: "matchmaker-406610",
    storageBucket: "matchmaker-406610.appspot.com",
    messagingSenderId: "171953949131",
    appId: "1:171953949131:web:a14665b8293c3a05d6ce4e"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

createApp(App)
    .use(router)
    .use(cors)
    .use(vue3GoogleLogin, {
        clientId: '171953949131-p1nuuduug3qtvu70rlarkaot7252264p.apps.googleusercontent.com'
    })
    .mount('#app',)
