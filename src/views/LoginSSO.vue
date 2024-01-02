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
//import {googleSdkLoaded} from "vue3-google-login";
import {login} from "@/firebase-config";

export default {
  name: "LoginSSO",

  methods: {

    async login() {
      login();
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