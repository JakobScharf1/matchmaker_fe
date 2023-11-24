<template>
  <div>
    <button @click="login">Login mit Google</button>
    <div v-if="userDetails">
      <h2>Benutzerdaten</h2>
      <p>Name: {{ userDetails.name }}</p>
      <p>Email: {{ userDetails.email }}</p>
    </div>
  </div>
</template>

<script>
import { googleSdkLoaded } from "vue3-google-login";
import axios from "axios";

export default {
  name: "login-comp",
  data() {
    return {
      userDetails: null,
    };
  },
  methods: {
    login() {
      googleSdkLoaded(google => {
        google.accounts.oauth2
            .initCodeClient({
              client_id:
                  "58730156701-di0.apps.googleusercontent.com",
              scope: "email profile openid",
              redirect_uri: "http://localhost:4000/auth/callback",
              callback: response => {
                if (response.code) {
                  this.sendCodeToBackend(response.code);
                }
              }
            })
            .requestCode();
      });
    },
    async sendCodeToBackend(code) {
      try {
        const headers = {
          Authorization: code
        };
        const response = await axios.post("http://localhost:4000/auth", null, { headers });
        const userDetails = response.data;
        console.log("Benutzerdaten:", userDetails);
        this.userDetails = userDetails;

        // Redirect to the homepage ("/")
        //this.$router.push("/rex");
      } catch (error) {
        console.error("Failed to send authorization code:", error);
      }
    }
  }
};
</script>

<style scoped>

</style>