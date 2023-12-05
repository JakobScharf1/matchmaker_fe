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
                  console.log(response.authuser)
                  localStorage.setItem("userInfo", JSON.stringify(response.code))
                  router.replace('/home')
                }
              }
            })
            .requestCode();
      });
    },

    mounted(){
      const userData = localStorage.getItem('userData');
      const accessToken = localStorage.getItem('accessToken');
      localStorage.setItem('userType', "G");
      this.$store.dispatch('setLoggedUser', userData);
      this.$store.dispatch('setAccessToken', accessToken);
    }

    /*
    async sendCodeToBackend(code) {
      try {
        const response = await axios.post("https://oauth.googleapis.com/token", {
          code,
          client_id:
              "171953949131-p1nuuduug3qtvu70rlarkaot7252264p.apps.googleusercontent.com",
          client_secret: "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",
          redirect_uri: "postmessage",
          grant_type: "authorization_code"
        });

        const accessToken = response.data.access_token;
        console.log(accessToken);

        // Fetch user details using the access token
        const userResponse = await axios.get(
            "https://www.googleapis.com/oauth2/v3/userinfo",
            {
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
            }
        );

        if (userResponse && userResponse.data) {
          // Set the userDetails data property to the userResponse object
          this.userDetails = userResponse.data;

        } else {
          // Handle the case where userResponse or userResponse.data is undefined
          console.error("Failed to fetch user details.");
        }
      } catch (error) {
        console.error("Failed to send authorization code:", error);
      }
    }
    */
  }
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