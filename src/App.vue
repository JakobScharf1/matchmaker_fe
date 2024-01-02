<template>
  <img alt="MatchMaker logo" src="./assets/logo.png">
  <RouterView/>
  <!--<LoginSSO></LoginSSO>-->
  <!--<MatchIDInput></MatchIDInput>-->
</template>

<script>
/*import MatchIDInput from "@/components/MatchIDInput.vue";*/
/*import LoginSSO from "@/views/LoginSSO.vue";*/
import router from "@/router";
/*import {googleLogout} from "vue3-google-login";*/

export default {
  name: 'App',
  components: {
    /*MatchIDInput,*/
    /*LoginSSO,*/
  },
  methods: {
    router() {
      return router
    }
  },
  mounted() {
    const userInfo = localStorage.getItem('userInfo');
    console.log("userInfo: " + userInfo);
    try {
      if (userInfo.length === 0) {
        router.push('/')
      }
    } catch (error) {
      console.error(error);
    }
      },
  data () {
    return {
      googleSignInParams: {
        client_id: '171953949131-p1nuuduug3qtvu70rlarkaot7252264p.apps.googleusercontent.com'
      }
    }
  }
}
</script>

<style>
body {
  background-color: #001f25;
  text-align: center;
  font-family: Jost, sans-serif;
}
#app {
  -webkit-font-smoothing: antialiased;

  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  padding-top: 60px;
  height: 100%;
  width: 50%;
  margin: 0 auto;
}

img {
  height: auto;
  max-width: 100%;
}

g-signin-button {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
}
</style>
