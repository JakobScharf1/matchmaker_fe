<template>
  <div>
    <button class="btn btn-primary" @click="login()">Login mit Google</button>
    <!--<div v-if="userDetails">
      <h2>Benutzerdaten</h2>
      <p>Name: {{ userDetails.name }}</p>
      <p>Email: {{ userDetails.email }}</p>
      <p>Profilbild: <img
          :src="userDetails.picture"
          alt="Profilbild"></p>
    </div>-->
  </div>
</template>

<script>
import {googleSdkLoaded} from "vue3-google-login";
/* import axios from "axios"; */
import router from "@/router";

export default {
  name: "LoginSSO",

  methods: {

    async login() {
      googleSdkLoaded(google => {
        google.accounts.oauth2
            .initCodeClient({
              client_id:
                  "171953949131-p1nuuduug3qtvu70rlarkaot7252264p.apps.googleusercontent.com",
              scope: "email profile openid",
              redirect_uri: "http://localhost:8080/auth/callback",
              callback: response => {
                if (response.code) {
                  /*this.sendCodeToBackend(response.code)*/
                  localStorage.setItem("userInfo", JSON.stringify(response.code))
                  router.replace('/home')
                }
              }
            })
            .requestCode();
      });
    },
  },
}
</script>

<style scoped>
  .btn-primary {
    background-color: #007772;
    border-color: #007772;
  }

  .btn-primary:hover {
    background-color: transparent;
  }
</style>